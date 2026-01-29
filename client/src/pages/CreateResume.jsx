import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { predefinedSkills } from '../data/skills';
import Button from '../components/ui/Button';
import Autocomplete from '../components/ui/Autocomplete';
import Input from '../components/ui/Input';
import useResumeStore from '../store/resume.store';
import uploadService from '../services/upload.service';
import aiService from '../services/ai.service';
import { Upload, X, Loader2, User, ChevronRight, Check, Sparkles, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'create_resume_form_data';

const CreateResume = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [step, setStep] = useState(1);
    const [activeSkillCategory, setActiveSkillCategory] = useState('');
    const [skillSearchTerm, setSkillSearchTerm] = useState('');

    // AI Writer State
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiResults, setAiResults] = useState([]);
    const [aiLoading, setAiLoading] = useState(false);
    const [activeProjectIndex, setActiveProjectIndex] = useState(null);

    // Combined form data
    const [formData, setFormData] = useState({
        // Phase 1: Personal
        title: '',
        fullName: '',
        email: '',
        phoneCode: '+91',
        phoneNumber: '',
        jobTitle: '',
        location: '',
        linkedin: '',
        website: '',
        photo: '',

        // Phase 2: Summary Context
        yearsOfExperience: '',
        currentStatus: 'Professional',
        industry: '',
        keyStrengths: '',
        careerGoal: '',

        // Phase 3: Work Experience
        latestJob: {
            company: '',
            jobTitle: '',
            type: 'Full-time',
            startDate: '',
            endDate: '',
            isCurrent: false,
            location: '',
            responsibilities: '',
            achievements: ''
        },

        // Phase 4: Education
        education: {
            school: '',
            degree: '',
            field: '',
            startYear: '',
            endYear: '',
            grade: '',
            relevantCoursework: ''
        },

        // Phase 5: Skills
        skills: {
            technical: '',
            tools: '',
            frameworks: '',
            soft: ''
        },

        // Phase 5: Projects & Achievements
        projects: [{
            title: '',
            description: '',
            technologies: '',
            role: '',
            link: ''
        }],
        certification: {
            name: '',
            issuer: '',
            year: '',
            url: ''
        },
        achievement: {
            title: '',
            description: '',
            year: ''
        },

        // Phase 6: Internships & Extras
        internships: [{
            company: '', // Optional
            role: '',
            duration: '',
            description: ''
        }],
        language: {
            name: '', // e.g. "English"
            proficiency: 'Fluent' // Basic, Intermediate, Fluent, Native
        },
        extras: {
            hobbies: '', // string
            volunteering: '', // string or simple obj
            publications: '' // string
        }
    });

    const [extraSections, setExtraSections] = useState({
        hobbies: false,
        volunteering: false,
        publications: false
    });

    const { createResume, isLoading, isError, message } = useResumeStore();

    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Ensure nested structures
                if (!parsed.latestJob) parsed.latestJob = {};
                if (!parsed.education) parsed.education = {};
                if (!parsed.skills) parsed.skills = {};
                if (!parsed.projects) parsed.projects = [{ title: '', description: '', technologies: '', role: '', link: '' }];
                if (!parsed.internships) parsed.internships = [{ company: '', role: '', duration: '', description: '' }];

                // Migration from old single object to array if needed
                if (parsed.project && !parsed.projects) parsed.projects = [parsed.project];
                if (parsed.internship && !parsed.internships) parsed.internships = [parsed.internship];

                setFormData(prev => ({
                    ...prev,
                    ...parsed,
                    latestJob: { ...prev.latestJob, ...parsed.latestJob },
                    education: { ...prev.education, ...parsed.education },
                    skills: { ...prev.skills, ...parsed.skills },
                    projects: parsed.projects || prev.projects,
                    certification: { ...prev.certification, ...parsed.certification },
                    achievement: { ...prev.achievement, ...parsed.achievement },
                    internships: parsed.internships || prev.internships,
                    language: { ...prev.language, ...parsed.language },
                    extras: { ...prev.extras, ...parsed.extras }
                }));

                // Restore Extra Section checkboxes state if content exists, or check localstorage separate key
                // For simplicity, if content exists, reveal it
                if (parsed.extras?.hobbies) setExtraSections(prev => ({ ...prev, hobbies: true }));
                if (parsed.extras?.volunteering) setExtraSections(prev => ({ ...prev, volunteering: true }));
                if (parsed.extras?.publications) setExtraSections(prev => ({ ...prev, publications: true }));

            } catch (e) {
                console.error("Failed to parse saved resume form data", e);
            }
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        }, 500);
        return () => clearTimeout(timer);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (parent, e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [name]: value
            }
        }));
    };

    const handleArrayChange = (arrayName, index, e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newArray = [...prev[arrayName]];
            newArray[index] = { ...newArray[index], [name]: value };
            return { ...prev, [arrayName]: newArray };
        });
    };

    const addArrayItem = (arrayName, emptyItem) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], emptyItem]
        }));
    };

    const removeArrayItem = (arrayName, index) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index)
        }));
    };

    const handleJobChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            latestJob: {
                ...prev.latestJob,
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    };

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            education: {
                ...prev.education,
                [name]: value
            }
        }));
    };

    const handleSkillsChange = (e) => {
        handleNestedChange('skills', e);
    };

    const handleAIGenerate = async () => {
        if (!aiPrompt.trim()) return toast.error("Please describe your project first.");

        setAiLoading(true);
        try {
            const data = await aiService.generateContent(aiPrompt, 'project_description');
            if (data.result) {
                // If result is string (raw text), wrap in array. If array (JSON logic worked), use it.
                // Depending on the AI response type we requested.
                // The controller tries to parse JSON, so it might be an array of strings.
                let results = data.result;
                if (typeof results === 'string') {
                    // Try to split manually if it came back as a bulleted string
                    if (results.includes('\n-') || results.includes('\n•')) {
                        results = results.split(/\n[•-]/).map(s => s.trim()).filter(s => s);
                    } else {
                        results = [results];
                    }
                }
                setAiResults(Array.isArray(results) ? results : [results]);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate content. Please try again.");
        } finally {
            setAiLoading(false);
        }
    };

    const applyAIResult = (text) => {
        const cleanText = text.replace(/^[•-]\s*/, '');

        if (activeProjectIndex === -1) {
            // Apply to achievements field in work experience (Phase 3)
            const currentAchievements = formData.latestJob.achievements;
            const newAchievements = currentAchievements
                ? currentAchievements + "\n• " + cleanText
                : "• " + cleanText;

            setFormData({
                ...formData,
                latestJob: { ...formData.latestJob, achievements: newAchievements }
            });
        } else if (activeProjectIndex === -2) {
            // Apply to achievement description (Phase 5)
            const currentDesc = formData.achievement.description;
            const newDesc = currentDesc
                ? currentDesc + "\n• " + cleanText
                : "• " + cleanText;

            setFormData({
                ...formData,
                achievement: { ...formData.achievement, description: newDesc }
            });
        } else if (activeProjectIndex <= -3) {
            // Apply to internship description (Phase 6)
            const internIndex = Math.abs(activeProjectIndex + 3); // Convert -3 to 0, -4 to 1, etc.
            const updatedInternships = [...formData.internships];
            const currentDesc = updatedInternships[internIndex].description;
            updatedInternships[internIndex].description = currentDesc
                ? currentDesc + "\n• " + cleanText
                : "• " + cleanText;

            setFormData({ ...formData, internships: updatedInternships });
        } else {
            // Apply to project description
            const updatedProjects = [...formData.projects];
            const currentDesc = updatedProjects[activeProjectIndex].description;
            updatedProjects[activeProjectIndex].description = currentDesc
                ? currentDesc + "\n• " + cleanText
                : "• " + cleanText;

            setFormData({ ...formData, projects: updatedProjects });
        }

        setAiModalOpen(false);
        setAiPrompt('');
        setAiResults([]);
        toast.success("Description added!");
    };

    const handleTitleChange = (value) => {
        setFormData(prev => ({ ...prev, title: value }));
    };

    const handlePhotoSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { toast.error('Please upload an image file'); return; }
        if (file.size > 5 * 1024 * 1024) { toast.error('Image size should be less than 5MB'); return; }

        try {
            setIsUploading(true);
            const data = await uploadService.uploadImage(file);
            setFormData(prev => ({ ...prev, photo: data.url }));
            toast.success('Photo uploaded successfully');
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('Failed to upload photo. Please try again.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleRemovePhoto = () => {
        setFormData(prev => ({ ...prev, photo: '' }));
    };

    const handleNextPhase = () => {
        if (step === 1) {
            if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.title) {
                toast.error("Please fill in all required fields.");
                return;
            }
        }
        setStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        const finalPhone = `${formData.phoneCode} ${formData.phoneNumber}`;
        const strengthsArray = formData.keyStrengths.split(',').map(s => s.trim()).filter(s => s.length > 0);

        // Experience
        const experienceArray = [];
        if (formData.latestJob.company) {
            experienceArray.push({
                company: formData.latestJob.company,
                jobTitle: formData.latestJob.jobTitle,
                type: formData.latestJob.type,
                location: formData.latestJob.location,
                startDate: formData.latestJob.startDate,
                endDate: formData.latestJob.isCurrent ? 'Present' : formData.latestJob.endDate,
                current: formData.latestJob.isCurrent,
                description: formData.latestJob.responsibilities,
                achievements: formData.latestJob.achievements
            });
        }

        // Education
        const educationArray = [];
        if (formData.education.degree || formData.education.school) {
            educationArray.push({
                degree: formData.education.degree,
                school: formData.education.school,
                field: formData.education.field,
                startYear: formData.education.startYear,
                endYear: formData.education.endYear,
                grade: formData.education.grade,
                relevantCoursework: formData.education.relevantCoursework
            });
        }

        // Skills
        const skillsArray = [];
        const processSkills = (str, category) => {
            if (!str) return;
            str.split(',').forEach(item => {
                const trimmed = item.trim();
                if (trimmed) skillsArray.push({ name: trimmed, category: category, level: 'Intermediate' });
            });
        };
        processSkills(formData.skills.technical, 'Technical');
        processSkills(formData.skills.tools, 'Tools');
        processSkills(formData.skills.frameworks, 'Frameworks');
        processSkills(formData.skills.soft, 'Soft Skills');

        // Projects
        const projectsArray = formData.projects
            .filter(p => p.title) // Filter out empty entries
            .map(p => ({
                title: p.title,
                description: p.description,
                technologies: p.technologies,
                role: p.role,
                link: p.link
            }));

        // Certifications
        const certificationsArray = [];
        if (formData.certification.name) {
            certificationsArray.push({
                name: formData.certification.name,
                issuer: formData.certification.issuer,
                year: formData.certification.year,
                url: formData.certification.url
            });
        }

        // Achievements
        const achievementsArray = [];
        if (formData.achievement.title) {
            achievementsArray.push({
                title: formData.achievement.title,
                description: formData.achievement.description,
                year: formData.achievement.year
            });
        }

        // Internships
        const internshipsArray = formData.internships
            .filter(i => i.company)
            .map(i => ({
                company: i.company,
                role: i.role,
                duration: i.duration,
                description: i.description
            }));

        // Languages
        const languagesArray = [];
        if (formData.language.name) {
            // Split if comma separated or just single
            formData.language.name.split(',').forEach(lang => {
                if (lang.trim()) {
                    languagesArray.push({
                        language: lang.trim(),
                        proficiency: formData.language.proficiency
                    });
                }
            });
        }

        // Extras - Interests
        const interestsArray = formData.extras.hobbies ? formData.extras.hobbies.split(',').map(s => s.trim()) : [];

        // Extras - Volunteering (Simplified to object array from string description or create one generic entry)
        // Since input is free text or simple, let's just make one entry if user provided details
        const volunteeringArray = [];
        if (formData.extras.volunteering) {
            volunteeringArray.push({
                organization: 'Volunteering', // Generic if multiple
                description: formData.extras.volunteering
            });
        }

        const publicationsArray = [];
        if (formData.extras.publications) {
            publicationsArray.push({ title: formData.extras.publications });
        }

        const payload = {
            title: formData.title,
            personalInfo: {
                fullName: formData.fullName,
                email: formData.email,
                phone: finalPhone,
                jobTitle: formData.jobTitle,
                address: formData.location,
                linkedin: formData.linkedin,
                website: formData.website,
                photo: formData.photo
            },
            summaryInputs: {
                yearsOfExperience: formData.yearsOfExperience,
                currentStatus: formData.currentStatus,
                industry: formData.industry,
                keyStrengths: strengthsArray,
                careerGoal: formData.careerGoal
            },
            experience: experienceArray,
            education: educationArray,
            skills: skillsArray,
            projects: projectsArray,
            certifications: certificationsArray,
            achievements: achievementsArray,
            internships: internshipsArray,
            languages: languagesArray,
            interests: interestsArray,
            volunteering: volunteeringArray,
            publications: publicationsArray
        };

        const newResume = await createResume(payload);
        if (newResume) {
            localStorage.removeItem(STORAGE_KEY);
            navigate(`/resume/${newResume._id}/edit`);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/dashboard');
        }
    }

    const toggleExtra = (section) => {
        setExtraSections(prev => ({ ...prev, [section]: !prev[section] }));
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {step === 1 && 'Phase 1: Personal Details'}
                        {step === 2 && 'Phase 2: Professional Profile & Experience'}
                        {step === 3 && 'Phase 3: Education Details'}
                        {step === 4 && 'Phase 4: Skills & Expertise'}
                        {step === 5 && 'Phase 5: Projects & Achievements'}
                        {step === 6 && 'Phase 6: Final Polish'}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {step === 1 && 'Please provide your essential details to get started.'}
                        {step === 2 && 'Tell us about your professional background and experience.'}
                        {step === 3 && 'Add your highest or most recent qualification.'}
                        {step === 4 && 'Highlight your technical and soft skills to stand out.'}
                        {step === 5 && 'Add any projects, certifications, or awards.'}
                        {step === 6 && 'Add internships, languages, and any other extra sections.'}
                    </p>
                </div>
                {/* Stepper */}
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex items-center">
                                <span className={`flex h-6 w-6 items-center justify-center rounded-full ${step >= i ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
                                    {i}
                                </span>
                                {i < 6 && <div className={`h-0.5 w-4 mx-1 ${step > i ? 'bg-blue-600' : 'bg-slate-200'}`} />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <form onSubmit={handleCreate} className="p-6 space-y-8">

                    {/* PHASE 1: Personal */}
                    {step === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="border-b border-slate-200 pb-2 mb-4"><h3 className="text-lg font-medium leading-6 text-slate-900">Basic Information</h3></div>
                            <div className="flex items-center gap-6 mb-6">
                                <div className="relative group">
                                    <div className={`h-24 w-24 rounded-full flex items-center justify-center overflow-hidden border-2 ${formData.photo ? 'border-blue-200' : 'border-dashed border-slate-300 bg-slate-50'}`}>
                                        {isUploading ? <Loader2 className="h-8 w-8 text-blue-500 animate-spin" /> : formData.photo ? <img src={formData.photo} alt="Profile" className="h-full w-full object-cover" /> : <User className="h-10 w-10 text-slate-400" />}
                                    </div>
                                    {formData.photo && !isUploading && (<button type="button" onClick={handleRemovePhoto} className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md border border-slate-200 text-slate-500 hover:text-red-500 transition-colors"><X className="w-3 h-3" /></button>)}
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-900">Profile Photo</h4>
                                    <div className="flex gap-2 mt-2">
                                        <input type="file" ref={fileInputRef} onChange={handlePhotoSelect} className="hidden" accept="image/*" />
                                        <Button type="button" variant="outline" size="sm" className="text-xs" onClick={() => fileInputRef.current?.click()} isLoading={isUploading} disabled={isUploading}>{formData.photo ? 'Change Photo' : 'Upload Photo'}</Button>
                                    </div>
                                </div>
                            </div>
                            <Autocomplete name="title" label="Resume Title / Target Role" placeholder="e.g. Senior Frontend Engineer" value={formData.title} onChange={handleTitleChange} required />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Full Name" name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required />
                                <Input label="Job Title" name="jobTitle" placeholder="e.g. Software Developer" value={formData.jobTitle} onChange={handleChange} required />
                                <Input label="Email Address" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                                <div className="w-full">
                                    <label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Phone Number</label>
                                    <div className="relative flex rounded-md shadow-sm"><div className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 sm:text-sm"><span className="mr-2 text-lg">🇮🇳</span><span>+91</span></div><input type="tel" name="phoneNumber" className="flex-1 block w-full rounded-none rounded-r-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="98765 43210" value={formData.phoneNumber} onChange={handleChange} required /></div>
                                </div>
                            </div>
                            <div className="border-t border-slate-200 pt-6">
                                <h3 className="text-lg font-medium leading-6 text-slate-900 mb-4">Location & Links</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input label="City, State, Country" name="location" placeholder="e.g. Bangalore, Karnataka, India" value={formData.location} onChange={handleChange} required />
                                    <Input label="LinkedIn URL" name="linkedin" placeholder="linkedin.com/in/johndoe" value={formData.linkedin} onChange={handleChange} required />
                                    <div className="md:col-span-2"><Input label="Portfolio URL (Optional)" name="website" placeholder="github.com/johndoe" value={formData.website} onChange={handleChange} /></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PHASE 2: Professional Profile & Work Experience */}
                    {step === 2 && (
                        <div className="space-y-8 animate-fadeIn">
                            {/* Professional Summary Section */}
                            <div className="space-y-6">
                                <div className="border-b border-slate-200 pb-2 mb-4"><h3 className="text-lg font-medium leading-6 text-slate-900">Professional Summary</h3></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div><label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Current Status</label><select name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="block w-full rounded-md border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"><option value="Student">Student</option><option value="Fresher">Fresher / Entry Level</option><option value="Professional">Professional / Experienced</option></select></div>
                                    <Input label="Years of Experience" name="yearsOfExperience" placeholder="e.g. 5 Years" value={formData.yearsOfExperience} onChange={handleChange} type="number" />
                                    <div className="md:col-span-2"><Input label="Industry / Domain" name="industry" placeholder="e.g. Fintech, E-commerce" value={formData.industry} onChange={handleChange} /></div>
                                    <div className="md:col-span-2"><label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Key Strengths</label><textarea name="keyStrengths" rows={3} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm" placeholder="e.g. Project Management, React Specialist" value={formData.keyStrengths} onChange={handleChange} /></div>
                                    <div className="md:col-span-2"><label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Career Goal (Optional)</label><textarea name="careerGoal" rows={2} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm" placeholder="e.g. Seeking a challenging role..." value={formData.careerGoal} onChange={handleChange} /></div>
                                </div>
                            </div>

                            {/* Work Experience Section (Merged) */}
                            <div className="space-y-6 pt-6 border-t border-slate-200">
                                <div className="border-b border-slate-200 pb-2 mb-4">
                                    <h3 className="text-lg font-medium leading-6 text-slate-900">Latest Work Experience</h3>
                                    <p className="text-sm text-slate-500 mt-1">Add your most recent role here. You can add more later.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input label="Company Name" name="company" placeholder="e.g. Google" value={formData.latestJob.company} onChange={handleJobChange} />
                                    <Input label="Job Title" name="jobTitle" placeholder="e.g. Senior Product Designer" value={formData.latestJob.jobTitle} onChange={handleJobChange} />
                                    <div><label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Employment Type</label><select name="type" value={formData.latestJob.type} onChange={handleJobChange} className="block w-full rounded-md border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"><option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Internship">Internship</option><option value="Contract">Contract</option><option value="Freelance">Freelance</option></select></div>
                                    <div><label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Location Type</label><select name="location" value={formData.latestJob.location} onChange={handleJobChange} className="block w-full rounded-md border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"><option value="On-site">On-site</option><option value="Remote">Remote</option><option value="Hybrid">Hybrid</option></select></div>
                                    <Input label="Start Date" name="startDate" type="date" value={formData.latestJob.startDate} onChange={handleJobChange} />
                                    <div className="space-y-2"><Input label="End Date" name="endDate" type="date" value={formData.latestJob.endDate} onChange={handleJobChange} disabled={formData.latestJob.isCurrent} /><div className="flex items-center"><input id="isCurrent" name="isCurrent" type="checkbox" checked={formData.latestJob.isCurrent} onChange={handleJobChange} className="h-4 w-4 text-blue-600 focus:ring-blue-600 rounded border-slate-300" /><label htmlFor="isCurrent" className="ml-2 block text-sm text-slate-900">I currently work here</label></div></div>
                                    <div className="md:col-span-2">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-medium leading-6 text-slate-900">Key Achievements</label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveProjectIndex(-1);
                                                    setAiModalOpen(true);
                                                }}
                                                className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 transition-colors"
                                            >
                                                <Sparkles className="w-3 h-3" /> AI Write
                                            </button>
                                        </div>
                                        <textarea name="achievements" rows={3} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm" placeholder="e.g. Increased conversion by 20%" value={formData.latestJob.achievements} onChange={handleJobChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PHASE 3: Education */}
                    {step === 3 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="border-b border-slate-200 pb-2 mb-4"><h3 className="text-lg font-medium leading-6 text-slate-900">Education</h3></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Degree / Course Name" name="degree" placeholder="e.g. B.Tech" value={formData.education.degree} onChange={handleEducationChange} />
                                <Input label="Specialization" name="field" placeholder="e.g. Computer Science" value={formData.education.field} onChange={handleEducationChange} />
                                <div className="md:col-span-2"><Input label="Institute / University Name" name="school" placeholder="e.g. IIT Bombay" value={formData.education.school} onChange={handleEducationChange} /></div>
                                <Input label="Start Year" name="startYear" placeholder="2019" value={formData.education.startYear} onChange={handleEducationChange} type="number" />
                                <Input label="End Year" name="endYear" placeholder="2023" value={formData.education.endYear} onChange={handleEducationChange} type="number" />
                                <Input label="CGPA / Percentage" name="grade" placeholder="e.g. 8.5 CGPA" value={formData.education.grade} onChange={handleEducationChange} />
                                <div className="md:col-span-2"><label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Relevant Coursework</label><textarea name="relevantCoursework" rows={3} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm" placeholder="e.g. Data Structures, Algorithms" value={formData.education.relevantCoursework} onChange={handleEducationChange} /></div>
                            </div>
                        </div>
                    )}

                    {/* PHASE 4: Skills */}
                    {step === 4 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="border-b border-slate-200 pb-2 mb-4">
                                <h3 className="text-lg font-medium leading-6 text-slate-900">Skills & Expertise</h3>
                                <p className="text-sm text-slate-500 mt-1">Select a category to add skills, or type manually.</p>
                            </div>

                            {/* Dropdown & Skill Picker with Search */}
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 transition-all">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Explore Skills</label>

                                {/* Search Bar */}
                                <div className="relative mb-4">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full rounded-md border-0 py-2.5 pl-10 pr-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                                        placeholder="Search for any skill (e.g. Java, AWS, Leadership)..."
                                        value={skillSearchTerm}
                                        onChange={(e) => {
                                            setSkillSearchTerm(e.target.value);
                                            if (e.target.value) setActiveSkillCategory(''); // Clear category if searching
                                        }}
                                    />
                                </div>

                                {!skillSearchTerm && (
                                    <div className="mb-4">
                                        <select
                                            className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                                            value={activeSkillCategory}
                                            onChange={(e) => setActiveSkillCategory(e.target.value)}
                                        >
                                            <option value="">-- Or Browse by Category --</option>
                                            {Object.keys(predefinedSkills).map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Results Area */}
                                <div className="bg-white rounded border border-slate-100 max-h-60 overflow-y-auto custom-scrollbar p-1">

                                    {/* Search Mode */}
                                    {skillSearchTerm ? (
                                        <div className="p-2 space-y-4">
                                            {Object.entries(predefinedSkills).map(([cat, skills]) => {
                                                const matches = skills.filter(s => s.toLowerCase().includes(skillSearchTerm.toLowerCase()));
                                                if (matches.length === 0) return null;
                                                return (
                                                    <div key={cat}>
                                                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">{cat}</h5>
                                                        <div className="flex flex-wrap gap-2">
                                                            {matches.map(skill => (
                                                                <button
                                                                    key={skill}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        let target = 'technical';
                                                                        if (cat === 'Programming Languages') target = 'technical';
                                                                        else if (cat === 'Frameworks & Stack') target = 'frameworks';
                                                                        else if (cat === 'Tools & Infrastructure') target = 'tools';
                                                                        else if (cat === 'Soft Skills & Professional Skills') target = 'soft';

                                                                        const currentVal = formData.skills[target];
                                                                        if (!currentVal.includes(skill)) {
                                                                            const newVal = currentVal ? `${currentVal}, ${skill}` : skill;
                                                                            setFormData(prev => ({
                                                                                ...prev,
                                                                                skills: { ...prev.skills, [target]: newVal }
                                                                            }));
                                                                            toast.success(`Added ${skill}`);
                                                                        }
                                                                        setSkillSearchTerm(''); // Optional: clear search after adding? Maybe not.
                                                                    }}
                                                                    className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                                                                >
                                                                    + <span dangerouslySetInnerHTML={{ __html: skill.replace(new RegExp(`(${skillSearchTerm})`, 'gi'), '<b>$1</b>') }} />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {Object.values(predefinedSkills).flat().filter(s => s.toLowerCase().includes(skillSearchTerm.toLowerCase())).length === 0 && (
                                                <p className="text-sm text-slate-500 text-center py-4">No skills found matching "{skillSearchTerm}". You can type it manually below.</p>
                                            )}
                                        </div>
                                    ) : (
                                        // Category Browse Mode
                                        activeSkillCategory && predefinedSkills[activeSkillCategory] ? (
                                            <div className="p-3 flex flex-wrap gap-2">
                                                {predefinedSkills[activeSkillCategory].map(skill => (
                                                    <button
                                                        key={skill}
                                                        type="button"
                                                        onClick={() => {
                                                            let target = 'technical';
                                                            if (activeSkillCategory === 'Programming Languages') target = 'technical';
                                                            else if (activeSkillCategory === 'Frameworks & Stack') target = 'frameworks';
                                                            else if (activeSkillCategory === 'Tools & Infrastructure') target = 'tools';
                                                            else if (activeSkillCategory === 'Soft Skills & Professional Skills') target = 'soft';

                                                            const currentVal = formData.skills[target];
                                                            if (!currentVal.includes(skill)) {
                                                                const newVal = currentVal ? `${currentVal}, ${skill}` : skill;
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    skills: { ...prev.skills, [target]: newVal }
                                                                }));
                                                            }
                                                        }}
                                                        className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                                                    >
                                                        + {skill}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-8 text-center text-slate-400 text-sm">
                                                Start typing to search or select a category above.
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> Technical & Languages
                                    </h4>
                                    <Input
                                        label="Programming Languages"
                                        name="technical"
                                        placeholder="e.g. Java, Python, C++"
                                        value={formData.skills.technical}
                                        onChange={handleSkillsChange}
                                        helperText="Core languages and technical competencies"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-purple-500"></div> Frameworks & Stack
                                    </h4>
                                    <Input
                                        label="Frameworks / Platforms"
                                        name="frameworks"
                                        placeholder="e.g. React, Spring Boot, Django"
                                        value={formData.skills.frameworks}
                                        onChange={handleSkillsChange}
                                        helperText="Web technologies, frameworks and libraries"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-orange-500"></div> Tools & Infrastructure
                                    </h4>
                                    <Input
                                        label="Tools & Technologies"
                                        name="tools"
                                        placeholder="e.g. Git, Docker, Kubernetes, AWS"
                                        value={formData.skills.tools}
                                        onChange={handleSkillsChange}
                                        helperText="DevOps, Cloud, Databases, and other tools"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div> Soft Skills
                                    </h4>
                                    <label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Interpersonal Skills</label>
                                    <textarea
                                        name="soft"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                                        placeholder="e.g. Communication, Leadership, Teamwork"
                                        value={formData.skills.soft}
                                        onChange={handleSkillsChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PHASE 5: Projects & Achievements */}
                    {step === 5 && (
                        <div className="space-y-8 animate-fadeIn">
                            <div className="space-y-6">
                                <div className="border-b border-slate-200 pb-2 mb-4 flex justify-between items-center">
                                    <h3 className="text-lg font-medium leading-6 text-slate-900">Projects</h3>
                                    <Button type="button" size="sm" variant="outline" onClick={() => addArrayItem('projects', { title: '', description: '', technologies: '', role: '', link: '' })}>+ Add Project</Button>
                                </div>
                                {formData.projects.map((proj, index) => (
                                    <div key={index} className="relative p-4 rounded-lg bg-slate-50 border border-slate-200 mb-4">
                                        {formData.projects.length > 1 && (
                                            <button type="button" onClick={() => removeArrayItem('projects', index)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500">
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Project Title" name="title" placeholder="e.g. E-commerce Platform" value={proj.title} onChange={(e) => handleArrayChange('projects', index, e)} />
                                            <Input label="Technologies Used" name="technologies" placeholder="e.g. MERN Stack, Redux" value={proj.technologies} onChange={(e) => handleArrayChange('projects', index, e)} />
                                            <Input label="Your Role" name="role" placeholder="e.g. Frontend Developer" value={proj.role} onChange={(e) => handleArrayChange('projects', index, e)} />
                                            <Input label="Project Link" name="link" placeholder="github.com/myproject" value={proj.link} onChange={(e) => handleArrayChange('projects', index, e)} />
                                            <div className="md:col-span-2">
                                                <div className="flex justify-between items-center mb-2">
                                                    <label className="block text-sm font-medium leading-6 text-slate-900">Description</label>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setActiveProjectIndex(index);
                                                            setAiModalOpen(true);
                                                        }}
                                                        className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 transition-colors"
                                                    >
                                                        <Sparkles className="w-3 h-3" /> AI Write
                                                    </button>
                                                </div>
                                                <textarea name="description" rows={3} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm" placeholder="Brief description of what you built..." value={proj.description} onChange={(e) => handleArrayChange('projects', index, e)} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-6">
                                <div className="border-b border-slate-200 pb-2 mb-4"><h3 className="text-lg font-medium leading-6 text-slate-900">Certification</h3></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input label="Certification Name" name="name" placeholder="e.g. AWS Certified Solutions Architect" value={formData.certification.name} onChange={(e) => handleNestedChange('certification', e)} />
                                    <Input label="Issuing Organization" name="issuer" placeholder="e.g. Amazon Web Services" value={formData.certification.issuer} onChange={(e) => handleNestedChange('certification', e)} />
                                    <Input label="Year" name="year" placeholder="2023" value={formData.certification.year} onChange={(e) => handleNestedChange('certification', e)} />
                                    <Input label="Credential Link (Optional)" name="url" placeholder="URL to certificate" value={formData.certification.url} onChange={(e) => handleNestedChange('certification', e)} />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="border-b border-slate-200 pb-2 mb-4"><h3 className="text-lg font-medium leading-6 text-slate-900">Achievement</h3></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input label="Title of Achievement" name="title" placeholder="e.g. Hackathon Winner" value={formData.achievement.title} onChange={(e) => handleNestedChange('achievement', e)} />
                                    <Input label="Year" name="year" placeholder="2023" value={formData.achievement.year} onChange={(e) => handleNestedChange('achievement', e)} />
                                    <div className="md:col-span-2">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-medium leading-6 text-slate-900">Description</label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveProjectIndex(-2);
                                                    setAiModalOpen(true);
                                                }}
                                                className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 transition-colors"
                                            >
                                                <Sparkles className="w-3 h-3" /> AI Write
                                            </button>
                                        </div>
                                        <textarea name="description" rows={2} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm" placeholder="e.g. Ranked 1st among 500 participants..." value={formData.achievement.description} onChange={(e) => handleNestedChange('achievement', e)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PHASE 6: Final Polish */}
                    {step === 6 && (
                        <div className="space-y-8 animate-fadeIn">
                            {/* Internship */}
                            {/* Internship */}
                            <div className="space-y-6">
                                <div className="border-b border-slate-200 pb-2 mb-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-medium leading-6 text-slate-900">Internships / Training</h3>
                                        <p className="text-sm text-slate-500 mt-1">Optional but valuable.</p>
                                    </div>
                                    <Button type="button" size="sm" variant="outline" onClick={() => addArrayItem('internships', { company: '', role: '', duration: '', description: '' })}>+ Add Internship</Button>
                                </div>
                                {formData.internships.map((intern, index) => (
                                    <div key={index} className="relative p-4 rounded-lg bg-slate-50 border border-slate-200 mb-4">
                                        {formData.internships.length > 1 && (
                                            <button type="button" onClick={() => removeArrayItem('internships', index)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500">
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Company / Organization Name" name="company" placeholder="e.g. Microsoft" value={intern.company} onChange={(e) => handleArrayChange('internships', index, e)} />
                                            <Input label="Role" name="role" placeholder="e.g. SDE Intern" value={intern.role} onChange={(e) => handleArrayChange('internships', index, e)} />
                                            <Input label="Duration" name="duration" placeholder="e.g. 3 Months" value={intern.duration} onChange={(e) => handleArrayChange('internships', index, e)} />
                                            <div className="md:col-span-2">
                                                <div className="flex justify-between items-center mb-2">
                                                    <label className="block text-sm font-medium leading-6 text-slate-900">Key Learnings / Description</label>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setActiveProjectIndex(-3 - index); // Use -3, -4, -5... for internships
                                                            setAiModalOpen(true);
                                                        }}
                                                        className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 transition-colors"
                                                    >
                                                        <Sparkles className="w-3 h-3" /> AI Write
                                                    </button>
                                                </div>
                                                <textarea name="description" rows={3} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm" placeholder="Briefly describe what you learned..." value={intern.description} onChange={(e) => handleArrayChange('internships', index, e)} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Languages */}
                            <div className="space-y-6">
                                <div className="border-b border-slate-200 pb-2 mb-4">
                                    <h3 className="text-lg font-medium leading-6 text-slate-900">Languages Known</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input label="Language" name="name" placeholder="e.g. English, Spanish (Comma separated)" value={formData.language.name} onChange={(e) => handleNestedChange('language', e)} />
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Proficiency</label>
                                        <select name="proficiency" value={formData.language.proficiency} onChange={(e) => handleNestedChange('language', e)} className="block w-full rounded-md border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm">
                                            <option value="Basic">Basic</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Fluent">Fluent</option>
                                            <option value="Native">Native</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Extra Sections */}
                            <div className="space-y-6">
                                <div className="border-b border-slate-200 pb-2 mb-4">
                                    <h3 className="text-lg font-medium leading-6 text-slate-900">Extra Sections (Premium Feel)</h3>
                                    <p className="text-sm text-slate-500 mt-1">Select the sections you want to add.</p>
                                </div>

                                <div className="flex flex-wrap gap-4 mb-6">
                                    {['hobbies', 'volunteering', 'publications'].map((section) => (
                                        <button
                                            key={section}
                                            type="button"
                                            onClick={() => toggleExtra(section)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors capitalize ${extraSections[section]
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            {section === 'hobbies' ? 'Hobbies & Interests' : section}
                                        </button>
                                    ))}
                                </div>

                                {extraSections.hobbies && (
                                    <div className="animate-fadeIn">
                                        <Input label="Hobbies & Interests" name="hobbies" placeholder="e.g. Chess, Traveling, Photography (Comma separated)" value={formData.extras.hobbies} onChange={(e) => handleNestedChange('extras', e)} />
                                    </div>
                                )}

                                {extraSections.volunteering && (
                                    <div className="animate-fadeIn">
                                        <label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Volunteering Experience</label>
                                        <textarea name="volunteering" rows={3} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm" placeholder="Describe your volunteering roles..." value={formData.extras.volunteering} onChange={(e) => handleNestedChange('extras', e)} />
                                    </div>
                                )}

                                {extraSections.publications && (
                                    <div className="animate-fadeIn">
                                        <Input label="Publications / Papers" name="publications" placeholder="Title of your publication or link..." value={formData.extras.publications} onChange={(e) => handleNestedChange('extras', e)} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {isError && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="text-sm text-red-700">
                                {message || 'Something went wrong. Please try again.'}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-x-4 pt-4 border-t border-slate-100">
                        <Button type="button" variant="ghost" onClick={handleBack}>
                            {step === 1 ? 'Cancel' : 'Back'}
                        </Button>
                        <Button type="button" onClick={step < 6 ? handleNextPhase : () => navigate('/resume/preview')} isLoading={isLoading} className="px-8 flex items-center gap-2">
                            {step < 6 ? (
                                <>Next Phase <ChevronRight className="w-4 h-4" /></>
                            ) : (
                                <>Preview Resume <Check className="w-4 h-4" /></>
                            )}
                        </Button>
                    </div>
                </form>
            </div>

            {/* AI Writer Modal */}
            {aiModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-purple-50">
                            <h3 className="text-lg font-semibold text-purple-900 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-purple-600" />
                                {activeProjectIndex <= -3
                                    ? 'AI Internship Writer'
                                    : activeProjectIndex === -2
                                        ? 'AI Achievement Writer'
                                        : activeProjectIndex === -1
                                            ? 'AI Achievement Writer'
                                            : 'AI Project Describer'}
                            </h3>
                            <button onClick={() => setAiModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {!aiResults.length && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        {activeProjectIndex <= -3
                                            ? 'Describe your internship experience briefly (e.g. "Worked on backend APIs and learned microservices architecture")'
                                            : activeProjectIndex === -2
                                                ? 'Describe your achievement briefly (e.g. "Won first place in college hackathon with 200+ participants")'
                                                : activeProjectIndex === -1
                                                    ? 'Describe your achievement briefly (e.g. "Increased team productivity by implementing new workflow")'
                                                    : 'Describe your project briefly (e.g. "E-commerce app with React and Stripe")'}
                                    </label>
                                    <textarea
                                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 min-h-[100px] text-sm"
                                        placeholder={activeProjectIndex <= -3 ? "I learned..." : activeProjectIndex === -2 || activeProjectIndex === -1 ? "I achieved..." : "I built a..."}
                                        value={aiPrompt}
                                        onChange={(e) => setAiPrompt(e.target.value)}
                                        autoFocus
                                    />
                                    <p className="text-xs text-slate-500 mt-2">
                                        The AI will generate professional bullet points for your resume.
                                    </p>
                                </div>
                            )}

                            {aiLoading && (
                                <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                                    <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-2" />
                                    <span className="text-sm font-medium">Generating impactful descriptions...</span>
                                </div>
                            )}

                            {aiResults.length > 0 && !aiLoading && (
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-slate-700">Select the best option:</h4>
                                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                                        {aiResults.map((res, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => applyAIResult(res)}
                                                className="p-3 rounded border border-slate-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all group"
                                            >
                                                <div className="flex gap-3">
                                                    <div className="mt-0.5 min-w-[20px]">
                                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 text-xs font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                                            {idx + 1}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-700 leading-relaxed">{res.replace(/^[•-]\s*/, '')}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setAiResults([])}
                                        className="text-xs text-slate-500 hover:text-purple-600 underline mt-2"
                                    >
                                        Try a different prompt
                                    </button>
                                </div>
                            )}
                        </div>

                        {!aiResults.length && !aiLoading && (
                            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                                <Button variant="ghost" onClick={() => setAiModalOpen(false)}>Cancel</Button>
                                <button
                                    onClick={handleAIGenerate}
                                    className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm shadow-purple-200"
                                >
                                    <Wand2 className="w-4 h-4 mr-2" />
                                    Generate
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateResume;
