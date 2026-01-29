
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Template1 from '../components/resume/templates/Template1';
import Template2 from '../components/resume/templates/Template2';
import Template3 from '../components/resume/templates/Template3';
import Template4 from '../components/resume/templates/Template4';
import Template5 from '../components/resume/templates/Template5';
import Template6 from '../components/resume/templates/Template6';
import Template7 from '../components/resume/templates/Template7';
import Button from '../components/ui/Button';
import useAuthStore from '../store/auth.store';
import useResumeStore from '../store/resume.store';
import { Download, Save, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const ResumePreview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuthStore();
    const { createResume, isLoading } = useResumeStore();

    // Read local data
    const [resumeData, setResumeData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('create_resume_form_data');
        if (storedData) {
            try {
                setResumeData(JSON.parse(storedData));
            } catch (e) {
                console.error("Failed to parse local resume data");
                navigate('/create-resume');
            }
        } else {
            // If no data, send back to create
            navigate('/create-resume');
        }
    }, [navigate]);

    const handleSaveAndDownload = async () => {
        // Enforce Login
        if (!user) {
            toast('Please login to save and download your resume.', {
                icon: '🔒',
            });
            // Redirect to login, passing current location to return to
            navigate('/login', { state: { from: location } });
            return;
        }

        // Validate data availability
        if (!resumeData) return;

        // Call API
        try {
            // Construct payload from local data (similar to CreateResume's logic)
            // Ideally CreateResume should have saved the *processed* payload, but it saved raw form state.
            // We need to re-process it or reuse logic.
            // For simplicity, let's assume valid structure OR create a shared helper.
            // Re-implementing simplified processing here for robustness:

            // NOTE: CreateResume saved the RAW formData state, which might need mapping (e.g. arrays vs strings).
            // Let's check CreateResume.jsx again. It creates 'payload' in handleCreate.
            // We should ideally move that processing logic to a utility or do it here.

            // Better approach: Let's assume CreateResume saves the *FINAL* payload to 'resume_payload' 
            // OR let's replicate the mapping logic here quickly:

            // ... Mapping logic (Simplified copy from CreateResume) ...
            const payload = processPayload(resumeData);

            const newResume = await createResume(payload);
            if (newResume) {
                toast.success('Resume saved successfully!');
                // Navigate to the editor for PDF download
                navigate(`/resume/${newResume._id}/edit`);
                // Clear local storag
                // localStorage.removeItem('create_resume_form_data');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to save resume.');
        }
    };

    const processPayload = (formData) => {
        // Re-construct payload expected by backend
        // This duplicates logic from CreateResume but ensures we don't break existing flow
        // In a real app, extract this to 'utils/resumeMapper.js'

        const finalPhone = `${formData.phoneCode || '+91'} ${formData.phoneNumber}`;
        const strengthsArray = formData.keyStrengths?.split(',').map(s => s.trim()).filter(s => s) || [];

        const experienceArray = [];
        if (formData.latestJob?.company) {
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

        const skillsArray = [];
        const processSkills = (str, category) => {
            if (!str) return;
            str.split(',').forEach(item => {
                if (item.trim()) skillsArray.push({ name: item.trim(), category: category, level: 'Intermediate' });
            });
        };
        processSkills(formData.skills?.technical, 'Technical');
        processSkills(formData.skills?.tools, 'Tools');
        processSkills(formData.skills?.frameworks, 'Frameworks');
        processSkills(formData.skills?.soft, 'Soft Skills');

        // Map new array structures
        const projectsArray = formData.projects?.filter(p => p.title).map(p => ({
            title: p.title, description: p.description, technologies: p.technologies, role: p.role, link: p.link
        })) || [];

        const internshipsArray = formData.internships?.filter(i => i.company).map(i => ({
            company: i.company, role: i.role, duration: i.duration, description: i.description
        })) || [];

        // Education
        const educationArray = [];
        if (formData.education?.degree || formData.education?.school) {
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

        return {
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
            internships: internshipsArray,
            // ... (Other fields can be mapped similarly if present)
            languages: formData.language?.name ? [{ language: formData.language.name, proficiency: formData.language.proficiency }] : [],
            interests: formData.extras?.hobbies ? formData.extras.hobbies.split(',') : [],
            volunteering: formData.extras?.volunteering ? [{ organization: 'Volunteering', description: formData.extras.volunteering }] : [],
            publications: formData.extras?.publications ? [{ title: formData.extras.publications }] : []
        };
    };

    const [selectedTemplate, setSelectedTemplate] = useState('modern');

    if (!resumeData) return <div className="min-h-screen flex items-center justify-center">Loading preview...</div>;

    const displayData = processPayload(resumeData);

    const renderTemplate = () => {
        switch (selectedTemplate) {
            case 'modern': return <Template1 data={displayData} />;
            case 'professional': return <Template2 data={displayData} />;
            case 'creative': return <Template3 data={displayData} />;
            case 'executive': return <Template4 data={displayData} />;
            case 'tech': return <Template5 data={displayData} />;
            case 'compact': return <Template6 data={displayData} />;
            case 'bold': return <Template7 data={displayData} />;
            default: return <Template1 data={displayData} />;
        }
    };

    // Template metadata for sidebar
    const templates = [
        { id: 'modern', name: 'Modern Professional', color: 'bg-slate-300' },
        { id: 'professional', name: 'Dark Sidebar', color: 'bg-slate-800' },
        { id: 'creative', name: 'Minimal Creative', color: 'bg-gray-100' },
        { id: 'executive', name: 'Executive Serif', color: 'bg-white border' },
        { id: 'tech', name: 'Full Stack / Tech', color: 'bg-green-400' },
        { id: 'compact', name: 'Compact Blue', color: 'bg-blue-600' },
        { id: 'bold', name: 'Bold & Yellow', color: 'bg-yellow-400' },
    ];

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            <header className="bg-white shadow sticky top-0 z-10 px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate('/create-resume')}>&larr; Edit Details</Button>
                    <h1 className="text-lg font-semibold text-slate-800 hidden sm:block">Resume Preview</h1>
                </div>
                <div className="flex items-center gap-3">
                    {!user && <span className="text-xs text-orange-600 font-medium hidden sm:inline">Log in to save & download</span>}
                    <Button onClick={handleSaveAndDownload} isLoading={isLoading} className="flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save & Download
                    </Button>
                </div>
            </header>

            <main className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                {/* Left: Preview Area */}
                <div className="flex-1 bg-slate-200 overflow-y-auto p-4 md:p-8 flex justify-center custom-scrollbar">
                    <div className="bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] origin-top transform scale-90 md:scale-100 transition-transform duration-300">
                        {renderTemplate()}
                    </div>
                </div>

                {/* Right: Template Selector Panel */}
                <div className="w-full lg:w-96 bg-white border-l border-slate-200 p-6 overflow-y-auto">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Choose Template</h2>

                    <div className="space-y-6">
                        {templates.map(t => (
                            <div
                                key={t.id}
                                className={`cursor-pointer rounded-lg border-2 overflow-hidden transition-all ${selectedTemplate === t.id ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300'}`}
                                onClick={() => setSelectedTemplate(t.id)}
                            >
                                <div className="bg-slate-50 p-3 border-b border-slate-100">
                                    <span className="font-medium text-slate-700">{t.name}</span>
                                </div>
                                <div className="h-24 bg-slate-50 relative group flex items-center justify-center">
                                    {/* Simple Color Code / Icon Representation */}
                                    <div className={`w-12 h-16 shadow-sm ${t.color}`}></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity">
                                        <span className="bg-white text-slate-900 text-xs px-2 py-1 rounded shadow">Select</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h3 className="text-sm font-bold text-blue-900 mb-1">More templates coming soon!</h3>
                        <p className="text-xs text-blue-700">We are working on adding more creative and ATS-friendly designs.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResumePreview;
