import { useState, useEffect } from 'react';
import { Plus, Trash2, Pencil, ExternalLink } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import useResumeStore from '../../../store/resume.store';

const CertificationsForm = ({ resumeData }) => {
    const { updateResume, currentResume } = useResumeStore();
    const [certifications, setCertifications] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        issuer: '',
        year: '',
        url: '',
    });

    useEffect(() => {
        if (resumeData && resumeData.certifications) {
            setCertifications(resumeData.certifications);
        }
    }, [resumeData]);

    const handleAddNew = () => {
        setFormData({ name: '', issuer: '', year: '', url: '' });
        setIsEditing(true);
        setCurrentIndex(null);
    };

    const handleEdit = (index) => {
        setFormData(certifications[index]);
        setCurrentIndex(index);
        setIsEditing(true);
    };

    const handleDelete = (index) => {
        const newCerts = certifications.filter((_, i) => i !== index);
        setCertifications(newCerts);
        updateResume(currentResume._id, { certifications: newCerts });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveItem = () => {
        let newCerts = [...certifications];
        if (currentIndex !== null) {
            newCerts[currentIndex] = formData;
        } else {
            newCerts.push(formData);
        }
        setCertifications(newCerts);
        updateResume(currentResume._id, { certifications: newCerts });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between border-b dark:border-slate-800 pb-4">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">{currentIndex !== null ? 'Edit Certification' : 'Add Certification'}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Certification Name</label>
                        <Input name="name" value={formData.name} onChange={handleChange} placeholder="AWS Certified Solutions Architect" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Issuing Organization</label>
                        <Input name="issuer" value={formData.issuer} onChange={handleChange} placeholder="Amazon Web Services" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Year</label>
                        <Input name="year" value={formData.year} onChange={handleChange} placeholder="2023" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Credential URL (Optional)</label>
                        <Input name="url" value={formData.url} onChange={handleChange} placeholder="https://..." />
                    </div>
                </div>
                <div className='flex justify-end gap-2'>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button onClick={handleSaveItem}>Save Cert</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {certifications.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-lg">
                    <p className="text-slate-500 dark:text-slate-400 mb-4">No certifications added yet.</p>
                    <Button onClick={handleAddNew}><Plus className="w-4 h-4 mr-2" /> Add Certification</Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {certifications.map((cert, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100">{cert.name}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{cert.issuer} • {cert.year}</p>
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

export default CertificationsForm;
