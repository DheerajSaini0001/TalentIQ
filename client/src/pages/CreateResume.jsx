import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Autocomplete from '../components/ui/Autocomplete';
import useResumeStore from '../store/resume.store';

const CreateResume = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');

    const { createResume, isLoading, isError, message } = useResumeStore();

    const handleCreate = async (e) => {
        e.preventDefault();

        const newResume = await createResume(title);
        if (newResume) {
            navigate(`/resume/${newResume._id}/edit`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Create New Resume
                    </h2>
                </div>
            </div>

            <div className="mt-8 bg-white shadow rounded-lg p-6">
                <form onSubmit={handleCreate} className="space-y-6">
                    <div>
                        <Autocomplete
                            name="title"
                            label="Resume Title"
                            placeholder="e.g. Full Stack Developer"
                            value={title}
                            onChange={setTitle}
                            required
                        />
                        <p className="mt-2 text-sm text-slate-500">
                            Give your resume a name to help you identify it later.
                        </p>
                        {isError && (
                            <p className="mt-2 text-sm text-red-600">
                                {message || 'Something went wrong. Please try again.'}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isLoading}>
                            Start Building
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateResume;
