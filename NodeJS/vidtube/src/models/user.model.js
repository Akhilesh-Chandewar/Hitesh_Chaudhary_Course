import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true
        },
        avatar: {
            type: String,
            default: '',
        },
        cover: {
            type: String,
            default: '',
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video',
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6
        },
        refreshToken: {
            type: String,
            default: null
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { userId: this._id, username: this.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { userId: this._id, username: this.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );
}
const User = mongoose.model('User', userSchema);
export default User;
