import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type : String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index : true
        },
        email: {
            type : String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index : true
        },
        fullName: {
            type : String,
            required: true,
            trim: true
        },
        avatar: {
            type : String,
            default: 'https://example.com/default-avatar.png',
        },
        coverImage: {
            type : String,
            default: 'https://example.com/default-cover.png',
        },
        waychHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video',
            }
        ],
        password: {
            type : String,
            required: [true, 'Password is required'],
            minlength: 6
        },
        refreshToken: {
            type : String,
            default: null
        },
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

const User = mongoose.model('User', userSchema);
export default User;