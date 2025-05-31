import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { connect } from '@/dbConfig/dbConfig'

connect()

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params

    try {
        const user = await User.findById(id).select('-password')
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 })
        }
        return NextResponse.json(user)
    } catch (error) {
        console.error('GET /api/users/[id] error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
