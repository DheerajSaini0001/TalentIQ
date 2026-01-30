import { useState, useEffect } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import useResumeStore from '../../../store/resume.store';

const EducationForm = ({ resumeData }) => {
    const { updateResume, currentResume } = useResumeStore();
    const [educations, setEducations] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const [formData, setFormData] = useState({
        degree: '',
        school: '',
        field: '',
        startYear: '',
        endYear: '',
        grade: '',
    });

    useEffect(() => {
        if (resumeData && resumeData.education) {
            setEducations(resumeData.education);
        }
    }, [resumeData]);

    const handleAddNew = () => {
        setFormData({
            degree: '',
            school: '',
            field: '',
            startYear: '',
            endYear: '',
            grade: '',
        });
        setIsEditing(true);
        setCurrentIndex(null);
    };

    const handleEdit = (index) => {
        setFormData(educations[index]);
        setCurrentIndex(index);
        setIsEditing(true);
    };

    const handleDelete = (index) => {
        const newEducations = educations.filter((_, i) => i !== index);
        setEducations(newEducations);
        updateResume(currentResume._id, { education: newEducations });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveItem = () => {
        let newEducations = [...educations];
        if (currentIndex !== null) {
            newEducations[currentIndex] = formData;
        } else {
            newEducations.push(formData);
        }

        setEducations(newEducations);
        updateResume(currentResume._id, { education: newEducations });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between border-b dark:border-slate-800 pb-4">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                        {currentIndex !== null ? 'Edit Education' : 'Add Education'}
                    </h3>
                    <Button variant="ghost" size="sm" onClick={handleCancel}>Cancel</Button>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">School / University</label>
                        <Input name="school" value={formData.school} onChange={handleChange} placeholder="Massachusetts Institute of Technology" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Degree</label>
                        <Input name="degree" value={formData.degree} onChange={handleChange} placeholder="Bachelor of Science" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Field of Study</label>
                        <Input name="field" value={formData.field} onChange={handleChange} placeholder="Computer Science" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Start Year</label>
                        <Input name="startYear" type="text" value={formData.startYear} onChange={handleChange} placeholder="2018" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">End Year</label>
                        <Input name="endYear" type="text" value={formData.endYear} onChange={handleChange} placeholder="2022" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Grade / GPA</label>
                        <Input name="grade" value={formData.grade} onChange={handleChange} placeholder="3.8 GPA" />
                    </div>
                </div>

                <div className='flex justify-end gap-2'>
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSaveItem}>Save Education</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {educations.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-lg">
                    <p className="text-slate-500 dark:text-slate-400 mb-4">No education added yet.</p>
                    <Button onClick={handleAddNew}>
                        <Plus className="w-4 h-4 mr-2" /> Add Education
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {educations.map((edu, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors duration-200">
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100">{edu.school}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{edu.degree} in {edu.field}</p>
                                <p className="text-xs text-slate-500">{edu.startYear} - {edu.endYear}</p>
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
                        <Plus className="w-4 h-4 mr-2" /> Add Another Education
                    </Button>
                </div>
            )}
        </div>
    );
};

export default EducationForm;
