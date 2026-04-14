import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.model.js';

dotenv.config({ path: '../.env' });

const setupAdmin = async (email) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // Find if user exists, else wait for them to register?
        // Let's at least mark them if they exist.
        const user = await User.findOneAndUpdate({ email }, { role: 'admin' }, { new: true });
        if (user) {
            console.log(`User ${email} setup as ADMIN.`);
        } else {
            console.log(`User ${email} not yet registered. Please register with this email first.`);
        }
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

setupAdmin('morganlaneus@gmail.com');
