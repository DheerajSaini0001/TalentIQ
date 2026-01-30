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
            photo: String,
        },
        // 2️⃣ Professional Summary
        summary: {
            type: String, // The 2-4 lines
        },
        // 3️⃣ Work Experience
        experience: [
            new mongoose.Schema({
                jobTitle: { type: String, default: '' },
                company: { type: String, default: '' },
                location: { type: String, default: '' },
                type: { type: String, default: '' },
                startDate: { type: String, default: '' },
                endDate: { type: String, default: '' },
                current: { type: Boolean, default: false },
                description: { type: String, default: '' },
                achievements: { type: String, default: '' },
            }, { _id: false })
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
                relevantCoursework: String, // Comma separated
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
        internships: [
            {
                company: String,
                role: String,
                duration: String,
                description: String, // Key Learnings
            }
        ],
        languages: [
            {
                language: String,
                proficiency: String,
            },
        ],
        interests: [String],

        // 1️⃣1️⃣ Extra Sections
        volunteering: [
            {
                organization: String,
                role: String,
                description: String,
                date: String,
            }
        ],
        publications: [
            {
                title: String,
                link: String,
                description: String,
                date: String,
            }
        ],
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
        // Inputs for AI Summary Generation
        summaryInputs: {
            yearsOfExperience: String,
            currentStatus: String, // Student / Fresher / Professional
            industry: String,
            keyStrengths: [String],
            careerGoal: String,
        }
    },
    {
        timestamps: true,
    }
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
