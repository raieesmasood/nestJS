import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);
    const navigate = useNavigate();

    const fetchLogin = async () => {
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            console.log(response.data);

            if (response.data.message === 'Logged in successfully') {
                setMessage('Logged in successfully');
                setIsSuccess(true);

                Cookies.set('userToken', response.data.token, { expires: 7 });

                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                setMessage(response.data.message);
                setIsSuccess(false);
            }
        } catch (error) {
            setIsSuccess(false);
            if (error.response) {
                setMessage(error.response.data.message || 'An error occurred. Please try again.');
            } else if (error.request) {
                setMessage('No response from the server. Please try again.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        fetchLogin();
    };

    return (
        <div className='flex items-center justify-center h-screen bg-black p-4'>
            <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-sm'>
                <h1 className='text-2xl font-bold text-center mb-6 text-black'>Login</h1>
                <form className='space-y-4' onSubmit={handleClick}>
                    <input 
                        type="text" 
                        placeholder='Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                        className='block w-full p-3 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-500'
                    />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                        className='block w-full p-3 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-500'
                    />
                    <button type="submit" className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-900 transition duration-300">
                        Login
                    </button>
                </form>

                {message && (
                    <p className={`mt-3 p-4 font-bold text-white rounded-md ${isSuccess ? 'bg-black' : 'bg-gray-700'}`}>
                        {message}
                    </p>
                )}

                {/* Add the "Don't have an account? Sign up" link */}
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/auth/register" className="text-black font-bold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
