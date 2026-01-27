import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            default: 'Untitled Resume',
        },
        // 1️⃣ Basic Information
        personalInfo: {
            fullName: String,
            jobTitle: String,
            email: String,
            phone: String,
            address: String, // City, Country
            linkedin: String,
            website: String, // Portfolio / GitHub
        },
        // 2️⃣ Professional Summary
        summary: {
            type: String, // The 2-4 lines
        },
        // 3️⃣ Work Experience
        experience: [
            {
                jobTitle: String,
                company: String,
                location: String,
                startDate: String,
                endDate: String,
                current: Boolean,
                description: String, // Bullets
            },
        ],
        // 4️⃣ Education
        education: [
            {
                degree: String,
                school: String, // Institution
                field: String,
                startYear: String,
                endYear: String,
                grade: String,
            },
        ],
        // 5️⃣ Skills
        skills: [
            {
                name: String,
                category: String, // Technical, Tools, Soft
                level: String, // Beginner, Intermediate, Advanced
            },
        ],
        // 6️⃣ Projects
        projects: [
            {
                title: String,
                description: String,
                technologies: String,
                link: String,
                role: String,
            },
        ],
        // 7️⃣ Certifications
        certifications: [
            {
                name: String,
                issuer: String,
                year: String,
                url: String,
            },
        ],
        // 8️⃣ Achievements
        achievements: [
            {
                title: String,
                description: String,
                year: String
            }
        ],
        // 9️⃣ Additional Sections
        languages: [
            {
                language: String,
                proficiency: String,
            },
        ],
        interests: [String],
        // 🔟 Resume Preferences & Meta
        preferences: {
            targetRole: String,
            targetIndustry: String,
            experienceLevel: String, // Fresher / Mid / Senior
            resumeLength: String, // 1 page / 2 pages
            designStyle: String, // Minimal / Modern / Creative
            color: String,
            font: String,
        },
        atsScore: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
