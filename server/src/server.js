import mongoose from 'mongoose';
import app from './app.js';
import { PORT } from './config/env.js';
import { connectDB } from './config/db.js';

// Connect to Database and start server
const startServer = async () => {
    try {
        await connectDB();
        
        const state = mongoose.connection.readyState;
        const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
        console.log(`Mongoose connection state: ${states[state] || state}`);
        
        if (state !== 1) {
            throw new Error('Database not connected. Server will not start.');
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
