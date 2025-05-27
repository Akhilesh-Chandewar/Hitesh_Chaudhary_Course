import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary , deleteFromCloudinary } from '../utils/cloudinary.js';

import User from '../models/user.model.js';

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

export { registerUser }
