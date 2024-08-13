import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();  // Use useNavigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v2/user/login', {
        email: formData.email,  // Corrected from `fromData.email` to `formData.email`
        password: formData.password
      });
      
      // Optionally store token in localStorage or handle response
      localStorage.setItem('token', response.data.token);

      // Redirect to home or another page
      navigate('/');  // Use navigate for redirection
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v2/user/forget-password', {
        email: formData.email  // Use the actual value from the state
      });
      // Handle successful request or inform the user
      alert('Password reset link sent to your email');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 2000);
      
      // Clean up the timeout if the component unmounts or error changes
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-900">Login</h2>
        {error && (
          <p className='text-red-400 mb-4 text-center'>{error}</p>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-900">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-blue-900 bg-white border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-blue-900 bg-white border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="w-4 h-4 text-blue-900 border-blue-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember_me" className="block ml-2 text-sm text-blue-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" onClick={handleForgetPassword} className="font-medium text-blue-900 hover:text-blue-600">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
          <div className="text-sm text-center text-blue-900">
            Don't have an account? <Link to="/signup" className="font-medium underline hover:text-blue-700">Sign up</Link>
          </div>
          <div className="text-sm text-center text-blue-900 mt-2">
            <Link to="/" className="font-medium underline hover:text-blue-700">Go to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
