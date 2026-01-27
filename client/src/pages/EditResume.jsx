import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useResumeStore from '../store/resume.store';
import Button from '../components/ui/Button';
import SectionSidebar from '../components/resume/SectionSidebar';
import PersonalDetailsForm from '../components/resume/forms/PersonalDetailsForm';
import SummaryForm from '../components/resume/forms/SummaryForm';
import ExperienceForm from '../components/resume/forms/ExperienceForm';

const ResumeEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getResume, currentResume, updateResume, isLoading } = useResumeStore();
    const [activeSection, setActiveSection] = useState('personal');

    useEffect(() => {
        if (id) {
            getResume(id);
        }
    }, [id]);

    if (isLoading && !currentResume) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const renderActiveForm = () => {
        if (!currentResume) return null;

        switch (activeSection) {
            case 'personal':
                return <PersonalDetailsForm resumeData={currentResume} />;
            case 'summary':
                return <SummaryForm resumeData={currentResume} />;
            case 'experience':
                return <ExperienceForm resumeData={currentResume} />;
            default:
                return <div>Select a section to edit</div>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow sm:p-4 p-2 flex justify-between items-center sticky top-0 z-10 border-b border-slate-200">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                        &larr; Back
                    </Button>
                    <div className='hidden sm:block'>
                        <h1 className="text-lg font-semibold text-slate-800">
                            {currentResume?.title || 'Untitled Resume'}
                        </h1>
                        <p className='text-xs text-slate-500'>Last saved just now</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Preview</Button>
                    <Button size="sm">Download PDF</Button>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Navigation (3 cols) */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sticky top-24">
                        <SectionSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
                    </div>
                </div>

                {/* Main Form Area (6 cols) */}
                <div className="lg:col-span-6 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-2">
                            {activeSection === 'personal' && 'Personal Details'}
                            {activeSection === 'summary' && 'Professional Summary'}
                            {/* Add other titles dynamically */}
                        </h2>
                        {renderActiveForm()}
                    </div>
                </div>

                {/* Live Preview (3 cols) - simplified for now, or expandable */}
                <div className="hidden lg:block lg:col-span-3">
                    <div className="bg-white shadow-sm border border-slate-200 rounded-lg p-4 sticky top-24 h-[600px] overflow-hidden">
                        <div className="text-center text-slate-400 mt-20">
                            <p>Mini Live Preview</p>
                            <p className='text-xs'>(Click 'Preview' for full size)</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResumeEditor;
