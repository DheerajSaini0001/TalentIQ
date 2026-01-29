import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Button from '../../ui/Button';
import useResumeStore from '../../../store/resume.store';

const SummaryForm = ({ resumeData }) => {
    const { updateResume, currentResume } = useResumeStore();
    const [summary, setSummary] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (resumeData && resumeData.summary) {
            setSummary(resumeData.summary);
        }
    }, [resumeData]);

    const handleChange = (e) => {
        setSummary(e.target.value);
    };

    const handleSave = () => {
        updateResume(currentResume._id, { summary });
    };

    const handleGenerateAI = async () => {
        setIsGenerating(true);
        // Simulate AI call for now
        setTimeout(() => {
            const aiSummary = `Experienced ${resumeData.personalInfo.jobTitle || 'Professional'} with a proven track record of success. Skilled in problem-solving and driving results. Passionate about leveraging technology to optimize processes and enhance user experiences.`;
            setSummary(aiSummary);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                <div>
                    <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        AI Assistance
                    </h3>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                        Let AI write a professional summary based on your job title.
                    </p>
                </div>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={handleGenerateAI}
                    isLoading={isGenerating}
                >
                    Generate with AI
                </Button>
            </div>

            <div>
                <label htmlFor="summary" className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-100">
                    Professional Summary
                </label>
                <div className="mt-2">
                    <textarea
                        id="summary"
                        name="summary"
                        rows={6}
                        className="block w-full rounded-md border-0 py-1.5 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 sm:text-sm sm:leading-6 p-3 transition-colors duration-200"
                        placeholder="Write 2-4 sentences about your professional background..."
                        value={summary}
                        onChange={handleChange}
                    />
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Write a short professional summary that highlights your key skills and experience.
                </p>
            </div>

            <div className='flex justify-end'>
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
};

export default SummaryForm;
