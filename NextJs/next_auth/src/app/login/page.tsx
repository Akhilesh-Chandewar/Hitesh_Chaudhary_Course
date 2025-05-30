'use client'

import React from 'react';
const LoginPage = () => {
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const onLogin = async () => {
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl text-blue-500 font-bold text-center mb-6">Login</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                    onClick={onLogin}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </div>
    )
}

export default LoginPage