import mongoose from 'mongoose';
import { MONGO_URI } from './env.js';

export const connectDB = async () => {
    try {
        const maskedUri = MONGO_URI?.replace(/:(.*)@/, ':****@');
        console.log(`Connecting to MongoDB: ${maskedUri}`);
        
        // Add connection event listeners
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to DB');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error(`Mongoose connection error: ${err}`);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });

        const conn = await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
