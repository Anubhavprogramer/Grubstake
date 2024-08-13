import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Make the API call to the server to log out the user
    axios.post('/api/v2/user/logout')
      .then((response) => {
        // Optionally handle server response or errors here
        navigate('/login');  // Redirect to the login page after successful logout
      })
      .catch((error) => {
        console.error('Logout error:', error);
        navigate('/login');  // Redirect to the login page even if there's an error
      });
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
