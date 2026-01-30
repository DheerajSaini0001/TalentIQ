import { useState, useEffect } from 'react';
import { Plus, Trash2, Pencil, ExternalLink } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import useResumeStore from '../../../store/resume.store';

const ProjectsForm = ({ resumeData }) => {
    const { updateResume, currentResume } = useResumeStore();
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        link: '',
        technologies: '',
        role: '',
        description: '',
    });

    useEffect(() => {
        if (resumeData && resumeData.projects) {
            setProjects(resumeData.projects);
        }
    }, [resumeData]);

    const handleAddNew = () => {
        setFormData({
            title: '',
            link: '',
            technologies: '',
            role: '',
            description: '',
        });
        setIsEditing(true);
        setCurrentIndex(null);
    };

    const handleEdit = (index) => {
        setFormData(projects[index]);
        setCurrentIndex(index);
        setIsEditing(true);
    };

    const handleDelete = (index) => {
        const newProjects = projects.filter((_, i) => i !== index);
        setProjects(newProjects);
        updateResume(currentResume._id, { projects: newProjects });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveItem = () => {
        let newProjects = [...projects];
        if (currentIndex !== null) {
            newProjects[currentIndex] = formData;
        } else {
            newProjects.push(formData);
        }

        setProjects(newProjects);
        updateResume(currentResume._id, { projects: newProjects });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between border-b dark:border-slate-800 pb-4">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                        {currentIndex !== null ? 'Edit Project' : 'Add Project'}
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Project Title</label>
                        <Input name="title" value={formData.title} onChange={handleChange} placeholder="Project Name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Project Link (Optional)</label>
                        <Input name="link" value={formData.link} onChange={handleChange} placeholder="github.com/username/project" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Technologies Used</label>
                        <Input name="technologies" value={formData.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Your Role</label>
                        <Input name="role" value={formData.role} onChange={handleChange} placeholder="Frontend Developer" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            className="block w-full rounded-md border-0 py-1.5 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-3 transition-colors duration-200"
                            placeholder="Describe the project and your contributions..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='flex justify-end gap-2'>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button onClick={handleSaveItem}>Save Project</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {projects.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-lg">
                    <p className="text-slate-500 dark:text-slate-400 mb-4">No projects added yet.</p>
                    <Button onClick={handleAddNew}>
                        <Plus className="w-4 h-4 mr-2" /> Add Project
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {projects.map((proj, index) => (
                        <div key={index} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors duration-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                        {proj.title}
                                        {proj.link && <ExternalLink className="w-3 h-3 text-slate-400" />}
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{proj.role} • {proj.technologies}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleEdit(index)} className="p-2 text-slate-400 hover:text-blue-600">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(index)} className="p-2 text-slate-400 hover:text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            {proj.description && (
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-500 line-clamp-2">{proj.description}</p>
                            )}
                        </div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={handleAddNew}>
                        <Plus className="w-4 h-4 mr-2" /> Add Another Project
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProjectsForm;
