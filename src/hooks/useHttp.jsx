import { useState, useCallback } from 'react';

// const domain = 'http://localhost:5000/api/';
const domain = 'https://naac-api-data-backend.iemamerica.com/api/';
// const domain = 'http://192.168.90.24:8080/api/';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendGetRequest = useCallback(async (url, headers = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      };

      const response = await fetch(`${domain}${url}`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Something went wrong!');
      throw err;
    }
  }, []);

  const sendPostRequest = useCallback(async (url, body = null, headers = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(body)
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Something went wrong!');
      throw err;
    }
  }, []);

  return { isLoading, error, sendGetRequest, sendPostRequest };
};

export default useHttp;
