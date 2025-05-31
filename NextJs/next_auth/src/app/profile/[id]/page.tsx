'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserProfile = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${params.id}`)
        setUser(response.data)
      } catch (error) {
        console.error('Failed to load user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.id])

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>
  }

  if (!user) {
    return <p className="text-center mt-10 text-red-500">User not found</p>
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl text-blue-500 font-bold text-center mb-6">User Profile</h2>
        <p className="text-gray-700"><strong>ID:</strong> {user._id}</p>
        <p className="text-gray-700"><strong>Username:</strong> {user.username}</p>
        <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-700"><strong>Verified:</strong> {user.isVerified ? 'Yes' : 'No'}</p>
        <p className="text-gray-700"><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
      </div>
    </div>
  )
}

export default UserProfile
