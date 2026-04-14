import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Template from './src/models/Template.model.js';

dotenv.config({ path: '../.env' });

const templates = [
    { id: 'modern', name: 'Modern Professional', category: 'modern', isActive: true },
    { id: 'classic', name: 'Standard Classic', category: 'classic', isActive: true },
    { id: 'professional', name: 'Dark Sidebar', category: 'modern', isActive: true },
    { id: 'creative', name: 'Minimal Creative', category: 'creative', isActive: true },
    { id: 'executive', name: 'Executive Serif', category: 'classic', isActive: true },
    { id: 'tech', name: 'Full Stack / Tech', category: 'tech', isActive: true },
    { id: 'compact', name: 'Compact Blue', category: 'modern', isActive: true },
    { id: 'bold', name: 'Bold & Yellow', category: 'creative', isActive: true },
];

const seedTemplates = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
        
        await Template.deleteMany({});
        await Template.insertMany(templates);
        
        console.log('Templates seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding templates:', error);
        process.exit(1);
    }
};

seedTemplates();
