import React from 'react'

const UserProfile = ({ params }: Readonly<{ params: { id: string }}>) => {
  return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-2xl text-blue-500 font-bold text-center mb-6">User Profile</h2>
          <p className="text-gray-700 text-center">User ID: {params.id}</p>
        </div>
      </div>
  )
}

export default UserProfile