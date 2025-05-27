import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true , limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

import healthcheckRouter from './routes/healthcheck.route.js';
import userRouter from './routes/user.route.js';
import { errorHandler } from './middlewares/error.middlewar.js';

app.use('/api/v1/healthcheck', healthcheckRouter);
app.use('/api/v1/users', userRouter);



app.use(errorHandler);

export default app;
