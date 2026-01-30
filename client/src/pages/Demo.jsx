import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';

const Demo = () => {
    const { darkmode } = useTheme();

    return (
        <div className={`min-h-screen pt-20 pb-16 transition-colors duration-500 ${darkmode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        See it in action
                    </div>
                    <h1 className={`text-4xl font-extrabold sm:text-5xl tracking-tight mb-6 ${darkmode ? "text-slate-100" : "text-slate-900"}`}>
                        Experience the future of <br />resume building
                    </h1>
                    <p className={`text-lg mb-8 ${darkmode ? "text-slate-400" : "text-slate-600"}`}>
                        Watch how easy it is to create a professional resume in minutes with TalentIQ's AI-powered platform.
                    </p>
                </div>

                {/* Video Placeholder */}
                <div className="max-w-5xl mx-auto bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative aspect-video group cursor-pointer mb-20">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center pl-1 shadow-lg">
                                <Play className="w-6 h-6 text-blue-600 fill-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Mock UI Background (Abstract representation of the app) */}
                    <div className="w-full h-full bg-slate-800 p-8 flex gap-8 opacity-50">
                        <div className="w-1/3 bg-slate-700 rounded-lg h-full animate-pulse"></div>
                        <div className="w-2/3 flex flex-col gap-4">
                            <div className="h-32 bg-slate-700 rounded-lg w-full animate-pulse delay-75"></div>
                            <div className="h-64 bg-slate-700 rounded-lg w-full animate-pulse delay-150"></div>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-8 text-white">
                        <p className="font-semibold text-lg">TalentIQ Walkthrough</p>
                        <p className="text-slate-300 text-sm">2:45 • High quality</p>
                    </div>
                </div>

                {/* Features highlight */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-4xl mx-auto">
                    <div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">2 min</div>
                        <h3 className={`font-semibold mb-2 ${darkmode ? "text-slate-100" : "text-slate-900"}`}>Average Build Time</h3>
                        <p className={`text-sm ${darkmode ? "text-slate-400" : "text-slate-500"}`}>Create your first resume faster than ever.</p>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">95+</div>
                        <h3 className={`font-semibold mb-2 ${darkmode ? "text-slate-100" : "text-slate-900"}`}>ATS Score</h3>
                        <p className={`text-sm ${darkmode ? "text-slate-400" : "text-slate-500"}`}>Optimized to get past the bots.</p>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">10k+</div>
                        <h3 className={`font-semibold mb-2 ${darkmode ? "text-slate-100" : "text-slate-900"}`}>Resumes Created</h3>
                        <p className={`text-sm ${darkmode ? "text-slate-400" : "text-slate-500"}`}>Trusted by job seekers worldwide.</p>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 text-center">
                    <h2 className={`text-2xl font-bold mb-6 ${darkmode ? "text-slate-100" : "text-slate-900"}`}>Convincing enough?</h2>
                    <Link to="/register">
                        <Button size="lg" className="shadow-lg shadow-blue-500/25">
                            Build My Resume
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Demo;
