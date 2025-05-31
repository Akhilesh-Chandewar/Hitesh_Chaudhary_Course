import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { connect } from '@/dbConfig/dbConfig'

connect()

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await User.findById(params.id).select('-password')
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 })
        }
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error('Error fetching user by ID:', error)
        return NextResponse.json({ message: 'Server Error' }, { status: 500 })
    }
}
