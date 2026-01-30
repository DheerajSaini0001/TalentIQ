import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Button from '../../ui/Button';
import useResumeStore from '../../../store/resume.store';
import aiService from '../../../services/ai.service';
import toast from 'react-hot-toast';

const SummaryForm = ({ resumeData }) => {
    const { updateResume, currentResume } = useResumeStore();
    const [summary, setSummary] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (resumeData && resumeData.summaryInputs?.careerGoal) {
            setSummary(resumeData.summaryInputs.careerGoal);
        } else if (resumeData && resumeData.summary) {
            setSummary(resumeData.summary);
        }
    }, [resumeData]);

    const handleChange = (e) => {
        setSummary(e.target.value);
    };

    const handleSave = () => {
        // Update both summary and summaryInputs.careerGoal for consistency
        updateResume(currentResume._id, {
            summary,
            summaryInputs: {
                ...currentResume.summaryInputs,
                careerGoal: summary
            }
        });
        toast.success('Summary saved successfully!');
    };

    const handleGenerateAI = async () => {
        setIsGenerating(true);

        try {
            // Build context from resume data
            const jobTitle = resumeData?.personalInfo?.jobTitle || resumeData?.title || 'Professional';
            const yearsOfExperience = resumeData?.summaryInputs?.yearsOfExperience || '';
            const industry = resumeData?.summaryInputs?.industry || '';
            const currentStatus = resumeData?.summaryInputs?.currentStatus || '';

            // Get skills
            const skills = resumeData?.skills?.slice(0, 8).map(s => s.name).join(', ') || '';

            // Get education
            const education = resumeData?.education?.[0] ?
                `${resumeData.education[0].degree} in ${resumeData.education[0].field || resumeData.education[0].school}` : '';

            // Get recent experience
            const recentExperience = resumeData?.experience?.[0] ?
                `${resumeData.experience[0].jobTitle} at ${resumeData.experience[0].company}` : '';

            // Build comprehensive prompt
            const prompt = `Write a professional resume summary (2-3 sentences, maximum 80 words) for a ${jobTitle}${yearsOfExperience ? ` with ${yearsOfExperience} years of experience` : ''}${industry ? ` in ${industry}` : ''}. 
            
Context:
${currentStatus ? `- Current Status: ${currentStatus}` : ''}
${education ? `- Education: ${education}` : ''}
${recentExperience ? `- Recent Role: ${recentExperience}` : ''}
${skills ? `- Key Skills: ${skills}` : ''}

Requirements:
- Write in first person
- Be specific and achievement-focused
- Highlight unique value proposition
- Keep it concise and impactful
- No generic phrases
- Professional tone`;

            const response = await aiService.generateContent(prompt, 'summary');

            if (response && response.content) {
                setSummary(response.content);
                toast.success('AI summary generated successfully!');
            } else {
                throw new Error('No content received from AI');
            }
        } catch (error) {
            console.error('AI Generation Error:', error);
            toast.error(error.message || 'Failed to generate AI summary. Please try again.');

            // Fallback to basic template if AI fails
            const fallbackSummary = `Experienced ${resumeData?.personalInfo?.jobTitle || 'professional'} with a proven track record of success. Skilled in problem-solving and driving results. Passionate about leveraging technology to optimize processes and enhance user experiences.`;
            setSummary(fallbackSummary);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Summary Generator
                    </h3>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                        Generate a professional summary tailored to your experience, skills, and career goals.
                    </p>
                </div>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={handleGenerateAI}
                    isLoading={isGenerating}
                    className="whitespace-nowrap"
                >
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
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
                        placeholder="Write 2-4 sentences about your professional background, key achievements, and career objectives..."
                        value={summary}
                        onChange={handleChange}
                    />
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {summary.length > 0 && (
                        <span className={summary.length > 400 ? 'text-orange-600' : 'text-green-600'}>
                            {summary.length} characters {summary.length > 400 ? '(consider shortening)' : ''}
                        </span>
                    )}
                    {summary.length === 0 && 'Write a concise professional summary that highlights your key skills, experience, and value proposition.'}
                </p>
            </div>

            <div className='flex justify-end gap-3'>
                <Button variant="outline" onClick={() => setSummary('')}>Clear</Button>
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
};

export default SummaryForm;
