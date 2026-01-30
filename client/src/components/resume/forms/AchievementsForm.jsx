import { useState, useEffect } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import useResumeStore from '../../../store/resume.store';

const AchievementsForm = ({ resumeData }) => {
    const { updateResume, currentResume } = useResumeStore();
    const [achievements, setAchievements] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const [formData, setFormData] = useState({ title: '', description: '', year: '' });

    useEffect(() => {
        if (resumeData && resumeData.achievements) setAchievements(resumeData.achievements);
    }, [resumeData]);

    const handleAddNew = () => {
        setFormData({ title: '', description: '', year: '' });
        setIsEditing(true);
        setCurrentIndex(null);
    };

    const handleEdit = (index) => {
        setFormData(achievements[index]);
        setCurrentIndex(index);
        setIsEditing(true);
    };

    const handleDelete = (index) => {
        const newItems = achievements.filter((_, i) => i !== index);
        setAchievements(newItems);
        updateResume(currentResume._id, { achievements: newItems });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveItem = () => {
        let newItems = [...achievements];
        if (currentIndex !== null) newItems[currentIndex] = formData;
        else newItems.push(formData);
        setAchievements(newItems);
        updateResume(currentResume._id, { achievements: newItems });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between border-b dark:border-slate-800 pb-4">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">{currentIndex !== null ? 'Edit Achievement' : 'Add Achievement'}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Title</label>
                        <Input name="title" value={formData.title} onChange={handleChange} placeholder="Best Employee of the Year" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Year</label>
                        <Input name="year" value={formData.year} onChange={handleChange} placeholder="2023" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Description</label>
                        <textarea name="description" rows={3} className="block w-full rounded-md border-0 py-1.5 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-3" placeholder="Awarded for distinct performance..." value={formData.description} onChange={handleChange} />
                    </div>
                </div>
                <div className='flex justify-end gap-2'>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button onClick={handleSaveItem}>Save Achievement</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {achievements.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-lg">
                    <p className="text-slate-500 dark:text-slate-400 mb-4">No achievements added yet.</p>
                    <Button onClick={handleAddNew}><Plus className="w-4 h-4 mr-2" /> Add Achievement</Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {achievements.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{item.year}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(index)} className="p-2 text-slate-400 hover:text-blue-600"><Pencil className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(index)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={handleAddNew}><Plus className="w-4 h-4 mr-2" /> Add Another</Button>
                </div>
            )}
        </div>
    );
};

export default AchievementsForm;
