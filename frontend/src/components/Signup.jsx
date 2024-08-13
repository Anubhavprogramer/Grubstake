import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [TermsChecked, setTermsChecked] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '', 
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheck = () => {
    setTermsChecked(!TermsChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('role', formData.role); // Append role to formData
    
    // for (let [key, value] of formDataToSend.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    try {
      await axios.post('/api/v2/user/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,  
        role: formData.role
      });
      // Redirect to login or another page
      navigate('/')
    } catch (error) {
      setError(error.response ? error.response.data.message : '');
    }
  };

  useEffect(() => {
    if (error){
      const timer = setTimeout(()=>{
        setError('');
      },2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-900">Sign Up</h2>
        {error && <p className='text-red-400 mb-4 text-center'>{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-blue-900">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-blue-900 bg-white border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-blue-900">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-blue-900 bg-white border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a role</option>
              <option value="user">User</option>
              <option value="Bank">Bank</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="w-4 h-4 text-blue-900 border-blue-300 rounded focus:ring-blue-500"
                required
                onChange={handleCheck} // Moved onChange to input element
              />
              <label htmlFor="terms" className="block ml-2 text-sm text-blue-900">
                I agree to the <a href="#" className="underline">Terms and Conditions</a>
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              onClick={handleSubmit} // Removed the onClick from the button
              disabled={!TermsChecked} // Corrected the logic to disable when TermsChecked is false
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
          <div className="text-sm text-center text-blue-900">
            Already have an account? <Link to="/login" className="font-medium underline hover:text-blue-700">Sign in</Link>
          </div>
          <div className="text-sm text-center text-blue-900 mt-2">
            <Link to="/" className="font-medium underline hover:text-blue-700">Go to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
