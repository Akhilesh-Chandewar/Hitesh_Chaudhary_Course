import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken';


import User from '../models/user.model.js';


const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validatebeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Token generation error:', error);
        throw new ApiError(500, 'Token generation failed');
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !username || !email || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    const userExists = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (userExists) {
        throw new ApiError(409, 'Username or email already exists');
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverLocalPath = req.files?.cover?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar image is required');
    }

    let avatar = '';
    let avatarPublicId = '';
    try {
        const avatarUpload = await uploadOnCloudinary(avatarLocalPath);
        avatar = avatarUpload.secure_url;
        avatarPublicId = avatarUpload.public_id;
        console.log('Avatar uploaded successfully:', avatar);
    } catch (error) {
        console.error('Avatar upload error:', error);
        throw new ApiError(500, 'Avatar upload failed');
    }

    let cover = '';
    let coverPublicId = '';
    if (coverLocalPath) {
        try {
            const coverUpload = await uploadOnCloudinary(coverLocalPath);
            cover = coverUpload.secure_url;
            coverPublicId = coverUpload.public_id;
            console.log('Cover uploaded successfully:', cover);
        } catch (error) {
            console.error('Cover upload error:', error);
            throw new ApiError(500, 'Cover upload failed');
        }
    }

    try {
        const newUser = await User.create({
            fullname,
            username,
            email,
            password,
            avatar: avatar,
            cover: cover
        });

        const createdUser = await User.findById(newUser._id,)
            .select('-password -__v -refreshToken');

        if (!createdUser) {
            throw new ApiError(500, 'User creation failed');
        }
        return res
            .status(201)
            .json(new ApiResponse(201, 'User registered successfully', createdUser));
    } catch (error) {
        console.error('User registration error:', error);
        if (avatar) {
            await deleteFromCloudinary(avatarPublicId);
        }
        if (cover) {
            await deleteFromCloudinary(coverPublicId);
        }
        throw new ApiError(500, 'User registration failed');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email && !username) {
            throw new ApiError(400, 'Email or username is required');
        }

        const user = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid password');
        }

        const { accessToken, refreshToken } = await generateTokens(user._id);

        const loggedInUser = await User.findById(user._id)
            .select('-password -__v -refreshToken');
        if (!loggedInUser) {
            throw new ApiError(500, 'User login failed');
        }

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }

        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(new ApiResponse(200,
                'Login successful',
                { loggedInUser, accessToken, refreshToken }));

    } catch (error) {
        console.error('Login error:', error);
        throw new ApiError(500, 'Login failed');
    }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, 'Refresh token is required');
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded?.userId);

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        if (user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(403, 'Refresh token mismatch');
        }

        const newAccessToken = user.generateAccessToken();
        const newRefreshToken = user.generateRefreshToken();

        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        };

        return res
            .status(200)
            .cookie('accessToken', newAccessToken, options)
            .cookie('refreshToken', newRefreshToken, options)
            .json(new ApiResponse(200, 'Access token refreshed successfully', {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            }));

    } catch (error) {
        console.error('Refresh token error:', error);
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Refresh token has expired');
        }
        if (error.name === 'JsonWebTokenError') {
            throw new ApiError(401, 'Invalid refresh token');
        }
        throw new ApiError(500, 'Failed to refresh access token');
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id,
            { $set: { refreshToken: '' }}, { new: true });
            
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        };
        return res
            .status(200)
            .clearCookie('accessToken', options)
            .clearCookie('refreshToken', options)
            .json(new ApiResponse(200, 'User logged out successfully'));

    } catch (error) {
        console.error('Logout error:', error);
        throw new ApiError(500, 'Logout failed');  
    }
});


export { registerUser, loginUser, refreshAccessToken, logoutUser };
