import Config from '../models/Config.model.js';
import Template from '../models/Template.model.js';
import User from '../models/User.model.js';

// Get all application settings
export const getSettings = async (req, res) => {
    try {
        const settings = await Config.find({});
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update or create setting (API Keys)
export const upsertSetting = async (req, res) => {
    const { key, value, category, description } = req.body;
    try {
        const setting = await Config.findOneAndUpdate(
            { key },
            { value, category, description, lastUpdatedBy: req.user._id },
            { new: true, upsert: true }
        );
        res.json(setting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all templates
export const getAdminTemplates = async (req, res) => {
    try {
        const templates = await Template.find({});
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create or update template
export const upsertTemplate = async (req, res) => {
    const { id, name, isActive, category, thumbnailColor } = req.body;
    try {
        const template = await Template.findOneAndUpdate(
            { id },
            { name, isActive, category, thumbnailColor },
            { new: true, upsert: true }
        );
        res.json(template);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Dashboard stats
export const getAdminStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const activeUsersCount = await User.countDocuments({ isVerified: true });
        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('email fullName createdAt');
        
        res.json({
            userCount,
            activeUsersCount,
            recentUsers
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
