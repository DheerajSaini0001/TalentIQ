import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/auth.store';
import useResumeStore from '../store/resume.store';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { FileText, Plus, Edit, Eye, Download, Trash2, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user, logout } = useAuthStore();
    const { resumes, getResumes, isLoading, deleteResume } = useResumeStore();
    const { darkmode } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        getResumes();
    }, [getResumes]);

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    const handleDelete = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this resume?')) {
            // Assuming deleteResume exists in store, if not we might need to add it or skip
            // For now, let's assume it might not exist and just log or try
            try {
                // await deleteResume(id); // Uncomment if delete is implemented
                toast.error("Delete functionality not fully implemented yet.");
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${darkmode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
            {/* Navbar */}
            <nav className={`px-8 py-4 flex justify-between items-center shadow-sm ${darkmode ? "bg-slate-900 border-b border-slate-800" : "bg-white border-b border-slate-200"}`}>
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <FileText className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">TalentIQ Dashboard</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className={`hidden sm:block text-sm font-medium ${darkmode ? "text-slate-400" : "text-slate-500"}`}>Welcome, {user?.name}</span>
                    <Button onClick={onLogout} variant="ghost" className="text-red-500 hover:bg-red-50 hover:text-red-600">Logout</Button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className={`text-3xl font-bold mb-2 ${darkmode ? "text-white" : "text-slate-900"}`}>My Resumes</h1>
                        <p className={`${darkmode ? "text-slate-400" : "text-slate-500"}`}>Manage and organize your professional profiles.</p>
                    </div>
                    <Button onClick={() => navigate('/create-resume')} className="flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                        <Plus className="w-5 h-5" /> Create New Resume
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="w-10 h-10 animate-spin text-blue-600" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Create New Card Placeholder */}
                        <div
                            onClick={() => navigate('/create-resume')}
                            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all group ${darkmode ? "border-slate-700 hover:border-blue-500 hover:bg-slate-900" : "border-slate-300 hover:border-blue-500 hover:bg-blue-50"}`}
                        >
                            <div className={`p-4 rounded-full mb-4 transition-colors ${darkmode ? "bg-slate-800 group-hover:bg-blue-900" : "bg-slate-100 group-hover:bg-blue-100"}`}>
                                <Plus className={`w-8 h-8 ${darkmode ? "text-slate-400 group-hover:text-blue-400" : "text-slate-400 group-hover:text-blue-600"}`} />
                            </div>
                            <span className={`font-semibold ${darkmode ? "text-slate-400 group-hover:text-blue-400" : "text-slate-500 group-hover:text-blue-600"}`}>Create New Resume</span>
                        </div>

                        {/* Resume Cards */}
                        {resumes.map((resume) => (
                            <div key={resume._id} className={`rounded-xl border shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden ${darkmode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"}`}>
                                {/* Preview / Thumbnail Area */}
                                <div className={`h-40 relative flex items-center justify-center ${darkmode ? "bg-slate-800" : "bg-slate-100"}`}>
                                    <FileText className={`w-16 h-16 ${darkmode ? "text-slate-700" : "text-slate-300"}`} />

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <Link to={`/resume/${resume._id}/preview`} className="p-2 bg-white rounded-full hover:scale-110 transition-transform text-slate-900" title="Preview">
                                            <Eye className="w-5 h-5" />
                                        </Link>
                                        <Link to={`/resume/${resume._id}/edit`} className="p-2 bg-white rounded-full hover:scale-110 transition-transform text-blue-600" title="Edit">
                                            <Edit className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <h3 className={`font-bold text-lg mb-1 truncate ${darkmode ? "text-slate-100" : "text-slate-800"}`}>
                                            {resume.title || "Untitled Resume"}
                                        </h3>
                                        <p className={`text-xs ${darkmode ? "text-slate-500" : "text-slate-500"}`}>
                                            Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="mt-auto flex gap-2">
                                        <Link to={`/resume/${resume._id}/preview`} className="flex-1">
                                            <Button variant="outline" className="w-full text-xs py-2 h-auto">View & Download</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && resumes.length === 0 && (
                    <div className="text-center py-12">
                        <p className={darkmode ? "text-slate-400" : "text-slate-500"}>You haven't created any resumes yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
