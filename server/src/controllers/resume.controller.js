import Resume from '../models/Resume.model.js';

// @desc    Create a new resume
// @route   POST /api/resume
// @access  Private
export const createResume = async (req, res) => {
    try {
        const {
            title, personalInfo, summaryInputs, experience, education, skills,
            projects, certifications, achievements,
            internships, languages, interests, volunteering, publications
        } = req.body;

        const resume = await Resume.create({
            userId: req.user._id,
            title: title || 'Untitled Resume',
            personalInfo: {
                fullName: personalInfo?.fullName || req.user.name,
                email: personalInfo?.email || req.user.email,
                phone: personalInfo?.phone || '',
                jobTitle: personalInfo?.jobTitle || '',
                address: personalInfo?.address || '',
                linkedin: personalInfo?.linkedin || '',
                website: personalInfo?.website || '',
                photo: personalInfo?.photo || '',
            },
            summaryInputs: summaryInputs || {},
            experience: experience || [],
            education: education || [],
            skills: skills || [],
            projects: projects || [],
            certifications: certifications || [],
            achievements: achievements || [],
            internships: internships || [],
            languages: languages || [],
            interests: interests || [],
            volunteering: volunteering || [],
            publications: publications || []
        });
        res.status(201).json(resume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all resumes for user
// @route   GET /api/resume
// @access  Private
export const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single resume
// @route   GET /api/resume/:id
// @access  Private
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update resume
// @route   PUT /api/resume/:id
// @access  Private
export const updateResume = async (req, res) => { // This will handle all form updates
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Deep merge or specific field update could happen here. 
        // For now, simpler is object assignment/spread if sending full object structure
        // but Mongoose 'set' is safer for partial updates

        // Example: if req.body has { personalInfo: { ... } }
        if (req.body.personalInfo) resume.personalInfo = { ...resume.personalInfo, ...req.body.personalInfo };
        if (req.body.summary !== undefined) resume.summary = req.body.summary;
        if (req.body.experience) resume.experience = req.body.experience;
        if (req.body.education) resume.education = req.body.education;
        if (req.body.skills) resume.skills = req.body.skills;
        if (req.body.projects) resume.projects = req.body.projects;
        if (req.body.certifications) resume.certifications = req.body.certifications;
        if (req.body.achievements) resume.achievements = req.body.achievements;
        if (req.body.languages) resume.languages = req.body.languages;
        if (req.body.interests) resume.interests = req.body.interests;
        if (req.body.preferences) resume.preferences = { ...resume.preferences, ...req.body.preferences };
        if (req.body.title) resume.title = req.body.title;

        const updatedResume = await resume.save();
        res.json(updatedResume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete resume
// @route   DELETE /api/resume/:id
// @access  Private
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.json({ message: 'Resume removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
