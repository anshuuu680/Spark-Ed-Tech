import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData, setIsAuthenticated } from '../../Features/userDetails';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async ({ email, password }) => {
    try {
      const response = await axios.post(
        'https://spark-ed-tech.onrender.com/api/login',
        { email, password },

      );

      if (response.status === 200) {
        console.log(response.data.data);
        dispatch(setUserData(response.data.data.user));
        dispatch(setIsAuthenticated(true));
        if (response.data.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate(`/`);
        }
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    await loginUser({ email, password });
    setIsLoading(false);
  };

  const handleDemoLogin = () => {
    setEmail('ap214893@gmail.com');
    setPassword('1');
    loginUser({ email: 'ap214893@gmail.com', password: '1' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark-background">
      <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-300 dark:border-dark-border">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Sign In</h2>
        {error && <div className="text-red-500 dark:text-red-400 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <Link to="/password/reset" className="text-sm text-blue-500 dark:text-blue-400 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full mt-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-800"
          >
            Demo Login
          </button>
        </form>
       
        <div className='flex gap-2 justify-center items-center mt-2'>
          <p className='text-gray-500'>Don't have an account?</p>
          <Link to="/signup" className="text-md text-blue-500 dark:text-blue-400 hover:underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
