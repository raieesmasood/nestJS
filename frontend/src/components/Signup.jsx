import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const fetchSignup = async () => {
    try {
      const response = await axiosInstance.post('/auth/register', { name: username, email, password });
      console.log(response.data.message);

      if (response.data.message === 'User registered successfully') {
        setMessage('User registered successfully');
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/auth/login');
        }, 3000);
      } else if (response.data.message === 'All Data Fields Are Required!') {
        setMessage('All Data Fields Are Required!');
        setIsSuccess(false);
      } else if (response.data.message === 'Email already in use') {
        setMessage('User Already Registered!');
        setIsSuccess(false);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('An error occurred. Please try again.');
      if (error.response) {
        console.log('Error response data:', error.response.data);
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchSignup();
  };

  return (
    <div className='flex items-center justify-center h-screen bg-black p-4'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center mb-6 text-black'>Signup</h1>
        <form onSubmit={handleClick} className='space-y-4'>
          <input 
            type="text" 
            placeholder='Username' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className='block w-full p-3 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-500'
            required 
          />
          <input 
            type="email" 
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className='block w-full p-3 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-500'
            required 
          />
          <input 
            type="password" 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className='block w-full p-3 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-500'
            required 
          />
          <div className="mt-6">
            <button 
              type="submit" 
              className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-900 transition duration-300"
            >
              Signup
            </button>
          </div>
        </form>

        {message && (
          <p className={`mt-3 p-4 font-bold text-white rounded-md ${isSuccess ? 'bg-black' : 'bg-gray-700'}`}>
            {message}
          </p>
        )}

        {/* Add the "Already have an account? Sign in" link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-black font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
