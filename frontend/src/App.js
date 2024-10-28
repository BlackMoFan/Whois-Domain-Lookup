// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [domain, setDomain] = useState('');
    const [type, setType] = useState('domain');
    const [resultDomain, setResultDomain] = useState(null);
    const [resultContact, setResultContact] = useState(null);
    const [loading, setLoading] = useState(null);
    
    const [error, setError] = useState('');
    const [toastVisible, setToastVisible] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
        const response = await axios.post('http://localhost:5000/api/whois', { domain, type });
        type === 'domain' ? setResultDomain(response.data) : setResultContact(response.data);
      } catch (err) {
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
        setError(errorMessage);
        setToastVisible(true);
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    useEffect(() => {
      // Automatically hide the toast after 5 seconds
      if (toastVisible) {
        const timer = setTimeout(() => {
          setToastVisible(false);
        }, 5000); // 5000 milliseconds = 5 seconds

        // Cleanup the timer if the component unmounts or the toast is closed manually
        return () => clearTimeout(timer);
      }
    }, [toastVisible]);

    function formatDate(isoDate) { // format date properly
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(isoDate).toLocaleDateString(undefined, options); // default locale
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <h1 className="text-3xl font-bold mb-6">Whois Lookup</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <label for="domainname">Domain name:</label>
          <input
            name="domainname"
            type="text"
            placeholder="Enter domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
            className="input input-bordered w-full mb-4 bg-transparent focus:border-primary text-black"
          />
          <label for="typeofinfo">Information type:</label>
          <select value={type} name="typeofinfo" onChange={(e) => setType(e.target.value)} className="select select-bordered w-full mb-4 bg-transparent text-black">
            <option value="domain">Domain Info</option>
            <option value="contact">Contact Info</option>
          </select>
          <button type="submit" className="btn btn-primary w-content mx-auto w-full">{loading ? 'Loading...' : 'Search'}</button>
        </form>
        
        <div className="mt-6 w-full max-w-4xl bg-white/80 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">{type === 'domain' ? 'Domain Info' : 'Contact Info'}</h2>
            <div className="overflow-x-auto">
              {resultDomain && type === 'domain' && (
                // layout for domain info
                  <table className="table-auto text-center w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200 text-gray-700">
                          <th className="border border-gray-300 p-2">Domain Name</th>
                          <th className="border border-gray-300 p-2">Registrar</th>
                          <th className="border border-gray-300 p-2">Registration Date</th>
                          <th className="border border-gray-300 p-2">Expiration Date</th>
                          <th className="border border-gray-300 p-2">Estimated Domain Age</th>
                          <th className="border border-gray-300 p-2">Hostnames</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                          <td className="border border-gray-300 p-2">{resultDomain.domainName}</td>
                          <td className="border border-gray-300 p-2">{resultDomain.registrar}</td>
                          <td className="border border-gray-300 p-2">{resultDomain.createdDate ? formatDate(resultDomain.createdDate) : ''}</td>
                          <td className="border border-gray-300 p-2">{resultDomain.expiresDate ? formatDate(resultDomain.expiresDate) : ''}</td>
                          <td className="border border-gray-300 p-2">{resultDomain.estimatedDomainAge}</td>
                          <td className="border border-gray-300 p-2">{resultDomain.hostnames}</td>
                      </tr>
                    </tbody>
                  </table>
              )}
                        
              {resultContact && type === 'contact' && (
                // layout for contact info
                <table className="table-auto text-center w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="border border-gray-300 p-2">Registrant Name</th>
                        <th className="border border-gray-300 p-2">Technical Contact Name</th>
                        <th className="border border-gray-300 p-2">Administrative Contact Name</th>
                        <th className="border border-gray-300 p-2">Contact Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td className="border border-gray-300 p-2">{resultContact.registrant}</td>
                        <td className="border border-gray-300 p-2">{resultContact.technicalContact}</td>
                        <td className="border border-gray-300 p-2">{resultContact.adminContact}</td>
                        <td className="border border-gray-300 p-2">{resultContact.contactEmail}</td>
                    </tr>
                  </tbody>
                </table>
              )}
          </div>
        </div>

        {/* Toast Notification */}
        {toastVisible && (
          <div className="toast toast-bottom toast-right" role="alert" aria-live="assertive">
            <div className="alert alert-error flex items-center justify-between">
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
