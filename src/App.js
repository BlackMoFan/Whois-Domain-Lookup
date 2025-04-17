// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  // State hooks for form input, API results, loading, error, and toast visibility
  const [domain, setDomain] = useState('');
  const [type, setType] = useState('domain');  // Type of information: 'domain' or 'contact'
  const [resultDomain, setResultDomain] = useState(null);
  const [resultContact, setResultContact] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Handle form submission to request data from API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Reset error state
    setLoading(true); // Show loading indicator

    try {
      // API request to get Whois data based on selected type
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/whois`, { domain, type },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      type === 'domain' ? setResultDomain(response.data) : setResultContact(response.data);
    } catch (err) {
      // Error handling based on API response status
      let errorMessage = 'An unexpected error occurred';
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = err.response.data.error || 'Invalid request. Please check your input.';
        } else if (err.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = err.response.data.error || errorMessage; // Fallback to error from response
        }
      }
      setError(errorMessage); // Set error message
      setToastVisible(true); // Show toast notification
    } finally {
      setLoading(false); // Hide loading indicator after function run
    }
  };

  // Effect to automatically hide toast after 5 seconds
  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 5000); // 5000 milliseconds = 5 seconds

      // Cleanup the timer if the component unmounts or the toast is closed manually
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  // Utility function to format ISO date strings
  function formatDate(isoDate) { // format date properly
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoDate).toLocaleDateString(undefined, options); // default locale
  }

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="mb-6 text-3xl font-bold">Whois Lookup</h1>

      {/* Form for domain input and info type selection */}
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <label htmlFor="domainname">Domain name:</label>
        <input
          name="domainname"
          type="text"
          placeholder="Enter domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          required
          className="w-full mb-4 text-black bg-transparent input input-bordered focus:border-primary"
        />
        <label htmlFor="typeofinfo">Information type:</label>
        <select value={type} name="typeofinfo" onChange={(e) => setType(e.target.value)} className="w-full mb-4 text-black bg-transparent select select-bordered">
          <option value="domain">Domain Info</option>
          <option value="contact">Contact Info</option>
        </select>
        <button type="submit" className="w-full mx-auto btn btn-primary w-content">{loading ? 'Loading...' : 'Search'}</button>
      </form>
      
      {/* Results display for domain or contact info */}
      <div className="w-full max-w-4xl p-6 mt-6 rounded-lg shadow-md bg-white/80">
        <h2 className="mb-4 text-2xl font-semibold text-center">{type === 'domain' ? 'Domain Info' : 'Contact Info'}</h2>
          <div className="overflow-x-auto">

            {/* Table for displaying domain info results */}
            {resultDomain && type === 'domain' && (
              // layout for domain info
                <table className="w-full text-center border border-collapse border-gray-300 table-auto">
                  <thead>
                    <tr className="text-gray-700 bg-gray-200">
                        <th className="p-2 border border-gray-300">Domain Name</th>
                        <th className="p-2 border border-gray-300">Registrar</th>
                        <th className="p-2 border border-gray-300">Registration Date</th>
                        <th className="p-2 border border-gray-300">Expiration Date</th>
                        <th className="p-2 border border-gray-300">Estimated Domain Age</th>
                        <th className="p-2 border border-gray-300">Hostnames</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td className="p-2 border border-gray-300">{resultDomain.domainName}</td>
                        <td className="p-2 border border-gray-300">{resultDomain.registrar}</td>
                        <td className="p-2 border border-gray-300">{resultDomain.createdDate ? formatDate(resultDomain.createdDate) : ''}</td>
                        <td className="p-2 border border-gray-300">{resultDomain.expiresDate ? formatDate(resultDomain.expiresDate) : ''}</td>
                        <td className="p-2 border border-gray-300">{resultDomain.estimatedDomainAge}</td>
                        <td className="p-2 border border-gray-300">{resultDomain.hostnames}</td>
                    </tr>
                  </tbody>
                </table>
            )}
                      
            {/* Table for displaying contact info results */}
            {resultContact && type === 'contact' && (
              // layout for contact info
              <table className="w-full text-center border border-collapse border-gray-300 table-auto">
                <thead>
                  <tr className="text-gray-700 bg-gray-200">
                      <th className="p-2 border border-gray-300">Registrant Name</th>
                      <th className="p-2 border border-gray-300">Technical Contact Name</th>
                      <th className="p-2 border border-gray-300">Administrative Contact Name</th>
                      <th className="p-2 border border-gray-300">Contact Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td className="p-2 border border-gray-300">{resultContact.registrant}</td>
                      <td className="p-2 border border-gray-300">{resultContact.technicalContact}</td>
                      <td className="p-2 border border-gray-300">{resultContact.adminContact}</td>
                      <td className="p-2 border border-gray-300">{resultContact.contactEmail}</td>
                  </tr>
                </tbody>
              </table>
            )}
        </div>
      </div>

      {/* Toast Notification */}
      {toastVisible && (
        <div className="toast toast-bottom toast-right" role="alert" aria-live="assertive">
          <div className="flex items-center justify-between alert alert-error">
            <div>
              <span>{error}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
