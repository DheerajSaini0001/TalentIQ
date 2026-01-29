
import express from 'express';
import { generateContent } from '../controllers/ai.controller.js';

const router = express.Router();

// POST /api/ai/generate
// Public route - no authentication required for AI assistance
router.post('/generate', generateContent);

export default router;
