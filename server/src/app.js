import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

import authRoutes from './routes/auth.routes.js';
import resumeRoutes from './routes/resume.routes.js';
import uploadRoutes from './routes/upload.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/upload', uploadRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default app;
