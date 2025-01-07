// LoginForm.jsx
import React, { useState } from 'react';
// import Topbar from '../../Components/Topbar';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-400 to-blue-600">
      {/* Topbar */}
      {/* <Topbar header="Login Page" notification="false" back="true" /> */}

      {/* Centered Login Form */}
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="absolute right-3 top-3 text-gray-500">
                <i className="fas fa-user"></i>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute right-3 top-3 text-gray-500">
                <i className="fas fa-lock"></i>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-blue-600" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
              Login
            </button>

            {/* Register Link */}
            <p className="text-center text-sm mt-4">
              {"Don't have an account?"}{' '}
              <a href="#" className="text-blue-500 hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
