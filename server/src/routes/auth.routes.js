import express from 'express';
import {
    registerUser,
    loginUser,
    getMe,
    sendOTP,
    verifyOTPLogin,
    registerWithOTP,
    refreshAccessToken
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Traditional auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// OTP-based auth routes
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTPLogin);
router.post('/register-otp', registerWithOTP);
router.post('/refresh-token', refreshAccessToken);

// Protected routes
router.get('/me', protect, getMe);

export default router;
