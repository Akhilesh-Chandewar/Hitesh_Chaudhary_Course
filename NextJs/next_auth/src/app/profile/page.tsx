'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const ProfilePage = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const onLogout = async () => {
        try {
            setLoading(true)
            await axios.get('/api/users/logout')
            router.push('/login')
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            setLoading(false)
        }
    }

    const viewProfile = async () => {
        try {
            const res = await axios.get('/api/users/me')
            const user = res.data
            if (user && user._id) {
                router.push(`/profile/${user._id}`)
            }
        } catch (error) {
            console.error('Failed to fetch user profile:', error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Profile Page</h1>
                <p className="text-gray-600 text-center mb-6">
                    This is the profile page. You can view your profile information here.
                </p>

                <div className="flex flex-col space-y-4">
                    <button
                        onClick={viewProfile}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        View Profile
                    </button>

                    <button
                        onClick={onLogout}
                        disabled={loading}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition disabled:bg-gray-400"
                    >
                        {loading ? 'Logging out...' : 'Logout'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
