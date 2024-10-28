// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint
app.post('/api/whois', async (req, res) => {
    const { domain, type } = req.body;

    // Validate input
    if (!domain || !['domain', 'contact'].includes(type)) {
        return res.status(400).json({ error: 'Invalid domain or type' });
    }

    console.log("domain entered: ", domain);

    try {
        const apiKey = process.env.WHOIS_API_KEY;
        const response = await axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService`, {
            params: {
                apiKey,
                domainName: domain,
                outputFormat: 'JSON',
            },
        });

        const data = response.data;

        console.log("data:", data);

        // Parse the response based on type
        let result;
        if (type === 'domain') {
            result = {
                domainName: data.WhoisRecord.domainName,
                registrar: data.WhoisRecord.registrarName,
                createdDate: data.WhoisRecord.createdDate,
                expiresDate: data.WhoisRecord.expiresDate,
                estimatedDomainAge: data.WhoisRecord.estimatedDomainAge,
                hostnames: data.WhoisRecord.nameServers.hostNames.map(hostname => {
                    return hostname.length > 25 ? hostname.slice(0, 25) + '...' : hostname;
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
        // Check if the error is a network error
        if (error.isAxiosError) {
            // Network error
            console.error('Network error:', error.message);
            res.status(500).json({ error: 'Network error occurred while connecting to Whois API. Please try again later.' });
        } else {
            // Handle other types of errors
            console.error('Response data:', error.response?.data);
            console.error('Response status:', error.response?.status);
            res.status(500).json({ error: 'Failed to fetch data from Whois API' });
        }
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
