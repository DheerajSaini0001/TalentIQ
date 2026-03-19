import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const MONGO_URI = process.env.MONGO_URI;

console.log('Testing connection to MongoDB...');
// Hide the actual URI for privacy in logs, but print if it's there
if (MONGO_URI) {
    console.log('MONGO_URI is set.');
} else {
    console.log('MONGO_URI is NOT set!');
    process.exit(1);
}

const testConnection = async () => {
    try {
        console.log('Connecting...');
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000 
        });
        console.log('MongoDB Connected successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Connection failed:');
        console.error(error.message);
        process.exit(1);
    }
};

testConnection();
