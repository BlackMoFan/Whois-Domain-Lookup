// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Allow requests from your frontend's Vercel domain
const allowedOrigins = [
  'https://whois-domain-lookup-phi.vercel.app', // Frontend URL
  'http://localhost:3000', // Localhost for development
];

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the origin if it's in the allowedOrigins array
        } else {
            callback(new Error('Not allowed by CORS')); // Block the origin if it's not allowed
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
    credentials: true, // Allow cookies if needed
}));
app.options('*', cors()); // Handle preflight requests

app.use(express.json());

// Endpoint for WHOIS data retrieval
app.post('/api/whois', async (req, res) => {
    const { domain, type } = req.body;

    // Validate input
    if (!domain || !['domain', 'contact'].includes(type)) {
        return res.status(400).json({ error: 'Invalid domain or type' });
    }

    try {
        // Make a request to the WHOIS API
        const apiKey = process.env.WHOIS_API_KEY;
        const response = await axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService`, {
            params: {
                apiKey, // pass the apiKey for authentication
                domainName: domain, // pass the domain name to domainName input parameter
                outputFormat: 'JSON', // use the "outputFormat" input parameter and set to JSON
            },
        });

        const data = response.data;

        // Handle API error messages
        if (data.ErrorMessage) {
            // console.error("Error fetching from Whois API:", data.ErrorMessage);
            return res.status(400).json({ error: data.ErrorMessage.msg });
        }

        // Format response based on requested type
        let result;
        if (type === 'domain') {
            result = {
                domainName: data.WhoisRecord.domainName,
                registrar: data.WhoisRecord.registrarName,
                createdDate: data.WhoisRecord.createdDate,
                expiresDate: data.WhoisRecord.expiresDate,
                estimatedDomainAge: data.WhoisRecord.estimatedDomainAge,
                hostnames: data.WhoisRecord.nameServers.hostNames.map(hostname => {
                    return hostname.length > 25 ? hostname.slice(0, 25) + '...' : hostname; // the field ‘hostnames’ should be comma-separated and truncated with ... if longer than 25 characters.
                }).join(', ')
            };
        } else {
            result = {
                registrant: data.WhoisRecord.registrant.organization,
                technicalContact: data.WhoisRecord.technicalContact.organization,
                adminContact: data.WhoisRecord.administrativeContact.organization,
                contactEmail: data.WhoisRecord.contactEmail,
            };
        }

        res.json(result);
    } catch (error) {
        console.error('Error fetching from Whois API:', error.message);

        // Network error handling
        if (error.isAxiosError) {
            if (error.code === 'ECONNREFUSED') {
                return res.status(503).json({ error: 'Service unavailable. Please try again later.' });
            } else {
                return res.status(500).json({ error: 'Network error occurred while connecting to Whois API. Please try again later.' });
            }
        }
        
        // Log and handle other types of errors
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
        return res.status(500).json({ error: 'Failed to fetch data from Whois API' });
    }
});

// app.listen(5000);

// Export the app for Vercel serverless functions
module.exports = app;