import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();

import TeaOrderRouter from './routes/teaOrder.routes.js';

// Connect to the database

const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });

// Create Express app
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/teaorder", TeaOrderRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});