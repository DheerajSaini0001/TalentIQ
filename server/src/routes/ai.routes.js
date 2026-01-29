
import express from 'express';
import { generateContent } from '../controllers/ai.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// POST /api/ai/generate
// Protect this route so only logged in users can use AI (optional, but good practice)
router.post('/generate', protect, generateContent);

export default router;
