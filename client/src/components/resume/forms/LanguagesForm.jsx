import { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import useResumeStore from '../../../store/resume.store';

const LanguagesForm = ({ resumeData }) => {
    const { updateResume, currentResume } = useResumeStore();
    const [languages, setLanguages] = useState([]);
    const [newLang, setNewLang] = useState('');
    const [proficiency, setProficiency] = useState('Professional');

    const LEVELS = ['Native', 'Professional', 'Intermediate', 'Elementary'];

    useEffect(() => {
        if (resumeData && resumeData.languages) setLanguages(resumeData.languages);
    }, [resumeData]);

    const handleAdd = () => {
        if (!newLang.trim()) return;
        const newItems = [...languages, { language: newLang, proficiency }];
        setLanguages(newItems);
        updateResume(currentResume._id, { languages: newItems });
        setNewLang('');
    };

    const handleDelete = (index) => {
        const newItems = languages.filter((_, i) => i !== index);
        setLanguages(newItems);
        updateResume(currentResume._id, { languages: newItems });
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4 items-end">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Language</label>
                    <Input value={newLang} onChange={(e) => setNewLang(e.target.value)} placeholder="English" />
                </div>
                <div className="w-1/3">
                    <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Proficiency</label>
                    <select value={proficiency} onChange={(e) => setProficiency(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2">
                        {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>
                <Button onClick={handleAdd}><Plus className="w-4 h-4" /></Button>
            </div>

            <div className="flex flex-wrap gap-2">
                {languages.map((l, index) => (
                    <div key={index} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-sm text-slate-700 dark:text-slate-300">
                        <span>{l.language} ({l.proficiency})</span>
                        <button onClick={() => handleDelete(index)} className="text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguagesForm;
