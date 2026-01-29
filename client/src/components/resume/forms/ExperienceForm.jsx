import { useState, useEffect } from 'react';
import { Plus, Trash2, Pencil, Sparkles } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import useResumeStore from '../../../store/resume.store';

const ExperienceForm = ({ resumeData }) => {
    const { updateResume, currentResume } = useResumeStore();
    const [experiences, setExperiences] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentExpIndex, setCurrentExpIndex] = useState(null);

    // Form state for a single experience
    const [formData, setFormData] = useState({
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: '',
    });

    useEffect(() => {
        if (resumeData && resumeData.experience) {
            setExperiences(resumeData.experience);
        }
    }, [resumeData]);

    const handleAddNew = () => {
        setFormData({
            jobTitle: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
            achievements: '',
        });
        setIsEditing(true);
        setCurrentExpIndex(null);
    };

    const handleEdit = (index) => {
        setFormData(experiences[index]);
        setCurrentExpIndex(index);
        setIsEditing(true);
    };

    const handleDelete = (index) => {
        const newExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(newExperiences);
        updateResume(currentResume._id, { experience: newExperiences });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSaveItem = () => {
        let newExperiences = [...experiences];
        if (currentExpIndex !== null) {
            // Update existing
            newExperiences[currentExpIndex] = formData;
        } else {
            // Add new
            newExperiences.push(formData);
        }

        setExperiences(newExperiences);
        updateResume(currentResume._id, { experience: newExperiences });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="text-lg font-medium">
                        {currentExpIndex !== null ? 'Edit Experience' : 'Add Experience'}
                    </h3>
                    <Button variant="ghost" size="sm" onClick={handleCancel}>Cancel</Button>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-slate-900">Job Title</label>
                        <Input name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Senior Developer" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900">Company</label>
                        <Input name="company" value={formData.company} onChange={handleChange} placeholder="Google" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900">Start Date</label>
                        <Input name="startDate" type="text" value={formData.startDate} onChange={handleChange} placeholder="Jan 2022" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900">End Date</label>
                        <div className="flex gap-2">
                            <Input
                                name="endDate"
                                type="text"
                                value={formData.endDate}
                                onChange={handleChange}
                                placeholder="Present"
                                disabled={formData.current}
                                className={formData.current ? 'bg-slate-100' : ''}
                            />
                        </div>
                        <div className="flex items-center mt-2">
                            <input
                                id="current"
                                name="current"
                                type="checkbox"
                                checked={formData.current}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                            />
                            <label htmlFor="current" className="ml-2 block text-sm text-slate-900">
                                I currently work here
                            </label>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-900">Location</label>
                        <Input name="location" value={formData.location} onChange={handleChange} placeholder="New York, NY / Remote" />
                    </div>

                    <div className="sm:col-span-2">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-slate-900">Description / Responsibilities</label>
                            <button type="button" className="text-xs text-blue-600 flex items-center gap-1 hover:underline">
                                <Sparkles className="w-3 h-3" /> Improve with AI
                            </button>
                        </div>
                        <textarea
                            name="description"
                            rows={4}
                            className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-3 mb-4"
                            placeholder="• Developed new features..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-slate-900">Key Achievements</label>
                            <button type="button" className="text-xs text-blue-600 flex items-center gap-1 hover:underline">
                                <Sparkles className="w-3 h-3" /> Improve with AI
                            </button>
                        </div>
                        <textarea
                            name="achievements"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-3"
                            placeholder="• Increased conversion by 20%..."
                            value={formData.achievements}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='flex justify-end gap-2'>
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSaveItem}>Save Experience</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {experiences.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-300 rounded-lg">
                    <p className="text-slate-500 mb-4">No experience added yet.</p>
                    <Button onClick={handleAddNew}>
                        <Plus className="w-4 h-4 mr-2" /> Add Experience
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {experiences.map((exp, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                            <div>
                                <h4 className="font-semibold text-slate-900">{exp.jobTitle}</h4>
                                <p className="text-sm text-slate-600">{exp.company} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(index)}
                                    className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={handleAddNew}>
                        <Plus className="w-4 h-4 mr-2" /> Add Another Position
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ExperienceForm;
