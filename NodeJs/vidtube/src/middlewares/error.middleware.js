import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(err instanceof ApiError)) {
        const statusCode = error.statusCode || err instanceof mongoose.Error ? 400 : 500;
        const message = error.message || 'Internal Server Error';
        err = new ApiError(statusCode, message , error?.errors || [] , error.stack);
    }

    const response = {
        ...err ,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})

    }

    return res.status(err.statusCode || 500).json(response);
}

export { errorHandler };