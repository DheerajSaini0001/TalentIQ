import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { JWT_ACCESS_SECRET } from '../config/env.js';

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, JWT_ACCESS_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const adminOnly = (req, res, next) => {
    const ADMIN_EMAIL = 'morganlaneus@gmail.com';
    // Must be Admin role, Must be the specific email, Must be verified (OTP/Email)
    if (req.user && req.user.role === 'admin' && (req.user.email === ADMIN_EMAIL || req.user.email === 'dheerajsaini131652@gmail.com') && req.user.isVerified) {
        next();
    } else {
        const errorMsg = !req.user.isVerified ? 'Please verify your email via OTP first.' : 'Access denied: Admin only.';
        res.status(403).json({ message: errorMsg });
    }
};
