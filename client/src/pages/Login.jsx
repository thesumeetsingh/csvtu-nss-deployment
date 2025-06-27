import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginBackground from '../assets/bg-image-01.jpg';
import API_BASE_URL from '../config';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify({ username: data.username, role: data.role }));
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="flex w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left: Image with overlay text */}
        <div className="w-1/2 relative hidden md:block">
          <img
            src={loginBackground}
            alt="Login Background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-white text-5xl font-bold tracking-wide text-center px-4">
              NSS CSVTU
            </h1>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 p-10 flex items-center justify-center">
          <div className="w-full">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin Login</h2>
            {error && <p className="text-red-500 text-center mb-4 text-lg">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Password"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 text-xl rounded-xl hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
