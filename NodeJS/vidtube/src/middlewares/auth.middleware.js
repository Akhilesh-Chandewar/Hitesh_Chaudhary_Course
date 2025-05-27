import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const verifyJwt = asyncHandler(async (req, _res, next) => {
    try {
        const token = req.cookies.accessToken || req.header.authorization?.split(' ')[1];
        if (!token) {
            return next(new ApiError(401, 'Access token is required'));
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded?.userId).select('-password -refreshToken');
        if (!user) {
            return next(new ApiError(401, 'Invalid access token'));
        }
        req.user = user;
        next();
    } catch (error) {
        return next(new ApiError(401, error?.message || 'Invalid access token'));
    }

});

export default verifyJwt;