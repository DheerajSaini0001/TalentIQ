import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false, // Optional for OTP users who haven't completed registration
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String, // Optional if using Google Auth or OTP
        },
        googleId: {
            type: String, // Google OAuth ID
        },
        avatar: {
            type: String,
        },
        otp: {
            type: String,
        },
        otpExpiry: {
            type: Date,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Encrypt password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate OTP
userSchema.methods.generateOTP = function () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    this.otp = otp;
    this.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    return otp;
};

// Verify OTP
userSchema.methods.verifyOTP = function (enteredOTP) {
    if (!this.otp || !this.otpExpiry) return false;
    if (Date.now() > this.otpExpiry) return false;
    return this.otp === enteredOTP;
};

const User = mongoose.model('User', userSchema);

export default User;
