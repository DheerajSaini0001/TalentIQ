import { useState, useEffect } from 'react';
import Button from '../../ui/Button';
import useResumeStore from '../../../store/resume.store';

const PreferencesForm = ({ resumeData }) => {
    const { updateResume, currentResume } = useResumeStore();
    const [preferences, setPreferences] = useState({
        designStyle: 'modern',
        color: 'blue',
        font: 'inter'
    });

    useEffect(() => {
        if (resumeData && resumeData.preferences) {
            setPreferences(prev => ({ ...prev, ...resumeData.preferences }));
        }
    }, [resumeData]);

    const handleStyleChange = (style) => {
        const newPrefs = { ...preferences, designStyle: style };
        setPreferences(newPrefs);
        updateResume(currentResume._id, { preferences: newPrefs });
    };

    const styles = ['modern', 'professional', 'creative', 'executive', 'tech', 'compact', 'bold'];

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">Template Style</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {styles.map(style => (
                        <button
                            key={style}
                            onClick={() => handleStyleChange(style)}
                            className={`p-3 border rounded-lg text-sm capitalize transition-all ${preferences.designStyle === style
                                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-600'
                                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                                }`}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            </div>

            {/* Add color/font pickers later if needed */}
        </div>
    );
};

export default PreferencesForm;
