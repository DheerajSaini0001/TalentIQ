import { useState, useEffect } from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import useResumeStore from '../../../store/resume.store';

const PersonalDetailsForm = ({ resumeData }) => {
    const { updateResume, currentResume } = useResumeStore();
    const [formData, setFormData] = useState({
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        website: '',
    });

    useEffect(() => {
        if (resumeData && resumeData.personalInfo) {
            setFormData((prev) => ({ ...prev, ...resumeData.personalInfo }));
        }
    }, [resumeData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateResume(currentResume._id, { personalInfo: formData });
        // You might want to show a success toast here
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-100">Full Name</label>
                    <div className="mt-2">
                        <Input
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-100">Professional Title</label>
                    <div className="mt-2">
                        <Input
                            type="text"
                            name="jobTitle"
                            id="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="Software Engineer"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-100">Email Address</label>
                    <div className="mt-2">
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-100">Phone Number</label>
                    <div className="mt-2">
                        <Input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 555 000-0000"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-100">City, Country</label>
                    <div className="mt-2">
                        <Input
                            type="text"
                            name="address"
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="New York, USA"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-100">LinkedIn URL</label>
                    <div className="mt-2">
                        <Input
                            type="url"
                            name="linkedin"
                            id="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="linkedin.com/in/johndoe"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="website" className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-100">Portfolio / Website</label>
                    <div className="mt-2">
                        <Input
                            type="url"
                            name="website"
                            id="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="johndoe.com"
                        />
                    </div>
                </div>
            </div>

            <div className='flex justify-end'>
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
};

export default PersonalDetailsForm;
