import { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import useResumeStore from '../../../store/resume.store';

const SkillsForm = ({ resumeData }) => {
    const { updateResume, currentResume } = useResumeStore();
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [category, setCategory] = useState('Technical'); // Default category

    const CATEGORIES = ['Technical', 'Tools', 'Frameworks', 'Soft Skills', 'Languages'];

    useEffect(() => {
        if (resumeData && resumeData.skills) {
            setSkills(resumeData.skills);
        }
    }, [resumeData]);

    const handleAddSkill = () => {
        if (!newSkill.trim()) return;

        const newSkillItem = {
            name: newSkill.trim(),
            category: category,
            level: 'Intermediate' // Default level
        };

        const updatedSkills = [...skills, newSkillItem];
        setSkills(updatedSkills);
        updateResume(currentResume._id, { skills: updatedSkills });
        setNewSkill('');
    };

    const handleDeleteSkill = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
        updateResume(currentResume._id, { skills: updatedSkills });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddSkill();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4 items-end">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Add Skill</label>
                    <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="e.g. React, Python, Leadership"
                    />
                </div>
                <div className="w-1/3">
                    <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2"
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <Button onClick={handleAddSkill}>
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            <div className="space-y-4">
                {CATEGORIES.map(cat => {
                    const catSkills = skills.filter(s => s.category === cat);
                    if (catSkills.length === 0) return null;
                    return (
                        <div key={cat}>
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{cat}</h4>
                            <div className="flex flex-wrap gap-2">
                                {catSkills.map((skill, index) => {
                                    // Find original index to delete correctly
                                    const originalIndex = skills.findIndex(s => s === skill);
                                    return (
                                        <div key={index} className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm">
                                            <span>{skill.name}</span>
                                            <button
                                                onClick={() => handleDeleteSkill(originalIndex)}
                                                className="text-slate-400 hover:text-red-500 ml-1"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillsForm;
