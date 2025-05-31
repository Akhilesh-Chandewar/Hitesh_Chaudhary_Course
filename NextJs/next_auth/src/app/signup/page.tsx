'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const SignupPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)

  useEffect(() => {
    if (user.username && user.email && user.password) {
      setButtonDisabled(false)
    }
    else {
      setButtonDisabled(true)
    }
  }, [user.username, user.email, user.password])

  const onSignup = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('/api/users/signup', {
        username: user.username,
        email: user.email,
        password: user.password
      })    
      if (response.status === 201) {
        router.push('/login')
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError('Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl text-blue-500 font-bold text-center mb-6">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>

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
          onClick={onSignup}
          disabled={buttonDisabled}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
