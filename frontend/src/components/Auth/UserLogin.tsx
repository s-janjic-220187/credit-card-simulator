import React, { useState } from 'react';
import { useUserActions } from '../../contexts/UserContext';
import api from '../../services/api';
import AnimatedCreditCard from './AnimatedCreditCard';

interface UserLoginProps {
  onShowCreateUser: () => void;
}

const UserLogin: React.FC<UserLoginProps> = ({ onShowCreateUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useUserActions();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // For demo purposes, we'll use a simple login that finds user by email
      const response = await api.post('/users/login', { email, password });

      // Axios automatically handles status checking, so if we get here, it was successful
      const data = response.data;

      if (!data || !data.data || !data.data.user) {
        throw new Error('Invalid response format');
      }

      // Use the login action from context
      await login(data.data.user.id);
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await login('demo-user');
    } catch (error) {
      console.error('Demo login failed:', error);
      setError(error instanceof Error ? error.message : 'Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Animated Credit Card */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <AnimatedCreditCard />
      </div>
      
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <div className="text-center">
          <span className="text-gray-500 text-sm">or</span>
        </div>

        <button
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
        >
          {isLoading ? 'Loading Demo...' : '🚀 Use Demo Account'}
        </button>

        <div className="text-center">
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <button
            onClick={onShowCreateUser}
            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            Create one
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserLogin;
