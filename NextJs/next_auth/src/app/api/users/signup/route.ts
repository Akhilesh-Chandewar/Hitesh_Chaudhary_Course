import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json();
        if (!username || typeof username !== "string" || username.trim().length < 3) {
            return NextResponse.json({ message: "Username must be at least 3 characters" }, { status: 400 });
        }
        if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
        }
        if (!password || typeof password !== "string" || password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
        }
        const normalizedEmail = email.toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });
        await newUser.save();
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
