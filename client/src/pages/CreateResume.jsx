import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Autocomplete from '../components/ui/Autocomplete';
import Input from '../components/ui/Input';
import useResumeStore from '../store/resume.store';
import uploadService from '../services/upload.service';
import { Upload, X, Loader2, User, ChevronRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'create_resume_form_data';

const CreateResume = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [step, setStep] = useState(1);

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
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                [name]: value
            }
        }));
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
                                    <div className="md:col-span-2"><label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Key Responsibilities</label><textarea name="responsibilities" rows={4} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm" placeholder="• Led a team...&#10;• Designed..." value={formData.latestJob.responsibilities} onChange={handleJobChange} /></div>
                                    <div className="md:col-span-2"><label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Key Achievements</label><textarea name="achievements" rows={3} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm" placeholder="e.g. Increased conversion by 20%" value={formData.latestJob.achievements} onChange={handleJobChange} /></div>
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
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">Technical Skills</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2"><Input label="Programming Languages" name="technical" placeholder="e.g. JavaScript, Python" value={formData.skills.technical} onChange={handleSkillsChange} /></div>
                                        <div className="md:col-span-2"><Input label="Tools & Technologies" name="tools" placeholder="e.g. Git, Docker, AWS" value={formData.skills.tools} onChange={handleSkillsChange} /></div>
                                        <div className="md:col-span-2"><Input label="Frameworks / Platforms" name="frameworks" placeholder="e.g. React, Next.js" value={formData.skills.frameworks} onChange={handleSkillsChange} /></div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-3">Soft Skills</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2"><label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Soft Skills</label><textarea name="soft" rows={3} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm" placeholder="e.g. Communication, Leadership" value={formData.skills.soft} onChange={handleSkillsChange} /></div>
                                    </div>
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
                                            <div className="md:col-span-2"><label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Description</label><textarea name="description" rows={3} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm" placeholder="Brief description of what you built..." value={proj.description} onChange={(e) => handleArrayChange('projects', index, e)} /></div>
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
                                    <div className="md:col-span-2"><label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Description</label><textarea name="description" rows={2} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 sm:text-sm" placeholder="e.g. Ranked 1st among 500 participants..." value={formData.achievement.description} onChange={(e) => handleNestedChange('achievement', e)} /></div>
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
                                                <label className="block text-sm font-medium leading-6 text-slate-900 mb-2">Key Learnings / Description</label>
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
                        <Button type="button" onClick={step < 6 ? handleNextPhase : handleCreate} isLoading={isLoading} className="px-8 flex items-center gap-2">
                            {step < 6 ? (
                                <>Next Phase <ChevronRight className="w-4 h-4" /></>
                            ) : (
                                <>Create Resume <Check className="w-4 h-4" /></>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateResume;
