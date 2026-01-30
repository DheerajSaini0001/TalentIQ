import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { JWT_SECRET } from '../config/env.js';
import { sendOTPEmail, sendWelcomeEmail } from '../services/email.service.js';

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Send OTP for login/signup
// @route   POST /api/auth/send-otp
// @access  Public
export const sendOTP = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check if user exists
        let user = await User.findOne({ email });
        let isNewUser = false;

        if (!user) {
            // New user - will need to register
            isNewUser = true;
            user = new User({ email, name: '', isVerified: false });
        }

        // Generate OTP
        const otp = user.generateOTP();
        await user.save();

        // Send OTP via email
        await sendOTPEmail(email, otp);

        res.status(200).json({
            message: 'OTP sent successfully',
            isNewUser,
            email,
        });
    } catch (error) {
        console.error('Send OTP Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify OTP and login (for existing users)
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTPLogin = async (req, res) => {
    const { email, otp } = req.body;

    try {
        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify OTP
        if (!user.verifyOTP(otp)) {
            return res.status(401).json({ message: 'Invalid or expired OTP' });
        }

        // Mark as verified and clear OTP
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Verify OTP Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register with OTP verification
// @route   POST /api/auth/register-otp
// @access  Public
export const registerWithOTP = async (req, res) => {
    const { name, email, otp, password } = req.body;

    try {
        if (!name || !email || !otp) {
            return res.status(400).json({ message: 'Name, email, and OTP are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Please request OTP first' });
        }

        // Check if user is already fully registered
        if (user.name && user.isVerified) {
            return res.status(400).json({ message: 'User already registered. Please login.' });
        }

        // Verify OTP
        if (!user.verifyOTP(otp)) {
            return res.status(401).json({ message: 'Invalid or expired OTP' });
        }

        // Update user details
        user.name = name;
        if (password) {
            user.password = password;
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        // Send welcome email (non-blocking)
        sendWelcomeEmail(email, name).catch(err =>
            console.error('Failed to send welcome email:', err)
        );

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Register with OTP Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new user (traditional method - kept for backward compatibility)
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            isVerified: true, // Auto-verify for traditional registration
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth user & get token (traditional method - kept for backward compatibility)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    };
    res.status(200).json(user);
};
