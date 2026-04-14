
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings, Layout, Users, Key, Save, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('stats');
    const [stats, setStats] = useState(null);
    const [settings, setSettings] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5201/api';
    
    // Helper to get token from user object in localStorage
    const getAuthToken = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.accessToken || user?.token;
    };

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/admin/stats`, {
                headers: { Authorization: `Bearer ${getAuthToken()}` }
            });
            setStats(res.data);
        } catch (error) {
            toast.error('Failed to fetch stats');
        }
    };

    const fetchSettings = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/admin/settings`, {
                headers: { Authorization: `Bearer ${getAuthToken()}` }
            });
            setSettings(res.data);
        } catch (error) {
            toast.error('Failed to fetch settings');
        }
    };

    const fetchTemplates = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/admin/templates`, {
                headers: { Authorization: `Bearer ${getAuthToken()}` }
            });
            setTemplates(res.data);
        } catch (error) {
            toast.error('Failed to fetch templates');
        }
    };

    useEffect(() => {
        fetchStats();
        fetchSettings();
        fetchTemplates();
    }, []);

    const handleUpdateSetting = async (setting) => {
        setIsLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/admin/settings`, setting, {
                headers: { Authorization: `Bearer ${getAuthToken()}` }
            });
            toast.success('Setting updated');
            fetchSettings();
        } catch (error) {
            toast.error('Update failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleTemplate = async (template) => {
        try {
            await axios.post(`${API_BASE_URL}/admin/templates`, {
                ...template,
                isActive: !template.isActive
            }, {
                headers: { Authorization: `Bearer ${getAuthToken()}` }
            });
            toast.success('Template updated');
            fetchTemplates();
        } catch (error) {
            toast.error('Template update failed');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <Settings className="w-8 h-8 text-blue-600" /> Admin Control Panel
                </h1>

                <div className="flex gap-4 mb-8">
                    <Button variant={activeTab === 'stats' ? 'primary' : 'outline'} onClick={() => setActiveTab('stats')} className="flex items-center gap-2">
                        <Users className="w-4 h-4" /> Statistics
                    </Button>
                    <Button variant={activeTab === 'api' ? 'primary' : 'outline'} onClick={() => setActiveTab('api')} className="flex items-center gap-2">
                        <Key className="w-4 h-4" /> API Management
                    </Button>
                    <Button variant={activeTab === 'templates' ? 'primary' : 'outline'} onClick={() => setActiveTab('templates')} className="flex items-center gap-2">
                        <Layout className="w-4 h-4" /> Templates
                    </Button>
                </div>

                {activeTab === 'stats' && stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <p className="text-sm font-medium text-slate-500 mb-1">Total Users</p>
                            <h3 className="text-3xl font-bold text-slate-900">{stats.userCount}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <p className="text-sm font-medium text-slate-500 mb-1">Verified Users</p>
                            <h3 className="text-3xl font-bold text-green-600">{stats.activeUsersCount}</h3>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 col-span-1 md:col-span-3">
                            <h4 className="font-bold mb-4">Recent Users</h4>
                            <div className="space-y-3">
                                {stats.recentUsers.map(u => (
                                    <div key={u._id} className="flex justify-between items-center text-sm border-b pb-2">
                                        <span>{u.email}</span>
                                        <span className="text-slate-500 text-xs">{new Date(u.createdAt).toLocaleDateString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'api' && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b">
                            <h3 className="font-bold flex items-center gap-2 text-red-600"><Key className="w-5 h-5" /> Sensitive API Keys</h3>
                            <p className="text-sm text-slate-500 mt-1">Manage external service credentials like Gemini or OpenAI.</p>
                        </div>
                        <div className="p-6 space-y-6">
                            {['GEMINI_API_KEY', 'OPENAI_API_KEY', 'JWT_SECRET'].map(key => {
                                const s = settings.find(set => set.key === key) || { key, value: '', category: 'ai' };
                                return (
                                    <div key={key} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <div className="flex-1 mr-4">
                                                <label className="text-xs font-bold uppercase text-slate-500">{key}</label>
                                                <input 
                                                    type="password"
                                                    defaultValue={s.value}
                                                    onChange={(e) => s.value = e.target.value}
                                                    className="w-full mt-1 p-2 border rounded bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="Enter key value..."
                                                />
                                            </div>
                                            <Button size="sm" onClick={() => handleUpdateSetting(s)} isLoading={isLoading} className="mb-[2px]">
                                                <Save className="w-3 h-3 mr-1" /> Update
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'templates' && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b">
                            <h3 className="font-bold flex items-center gap-2"><Layout className="w-5 h-5" /> Managed Templates</h3>
                            <p className="text-sm text-slate-500 mt-1">Toggle visibility of resume templates for users.</p>
                        </div>
                        <div className="divide-y">
                            {templates.length === 0 && <p className="p-6 text-slate-500">No templates managed yet. Use 'Upsert Template' in future.</p>}
                            {templates.map(t => (
                                <div key={t.id} className="p-4 flex justify-between items-center hover:bg-slate-50">
                                    <div>
                                        <p className="font-medium text-slate-900">{t.name}</p>
                                        <p className="text-xs text-slate-500">{t.id} | {t.category}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {t.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                        <Button variant="ghost" size="sm" onClick={() => handleToggleTemplate(t)}>
                                            {t.isActive ? <XCircle className="w-4 h-4 text-red-500" /> : <CheckCircle className="w-4 h-4 text-green-500" />}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
