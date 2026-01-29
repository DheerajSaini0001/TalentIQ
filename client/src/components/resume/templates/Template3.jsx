
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from 'lucide-react';

const Template3 = ({ data }) => {
    if (!data) return null;
    const { personalInfo, title, summaryInputs, experience = [], education = [], skills = [], projects = [], internships = [], languages = [] } = data;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr === 'Present') return 'Present';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="bg-white text-slate-800 w-full min-h-[1100px] shadow-lg p-10 font-sans">
            {/* Header - Centered & Minimal */}
            <div className="text-center border-b border-gray-300 pb-6 mb-6">
                <h1 className="text-3xl font-light tracking-wide text-gray-900 uppercase">{personalInfo?.fullName}</h1>
                <p className="text-md text-gray-500 mt-2 tracking-widest uppercase">{title}</p>

                <div className="flex justify-center flex-wrap gap-4 mt-4 text-xs text-gray-400">
                    {personalInfo?.email && <span className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</span>}
                    {personalInfo?.phone && <span className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</span>}
                    {personalInfo?.address && <span className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.address}</span>}
                    {personalInfo?.linkedin && <span className="flex items-center gap-1"><Linkedin size={12} /> LinkedIn</span>}
                </div>
            </div>

            {/* Content - Single Column, clean */}
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Summary */}
                {summaryInputs?.careerGoal && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Profile</h3>
                        <p className="text-sm text-gray-600 leading-relaxed text-justify">{summaryInputs.careerGoal}</p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section>
                        <h3 className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 pt-2 border-t border-gray-100">Experience</h3>
                        <div className="space-y-6">
                            {experience.map((job, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-medium text-gray-900">{job.jobTitle}</h4>
                                        <span className="text-xs text-gray-400 font-light">{formatDate(job.startDate)} – {formatDate(job.endDate)}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 italic mb-2">{job.company}, {job.location}</div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section>
                        <h3 className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 pt-2 border-t border-gray-100">Projects</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="border border-gray-100 p-4 rounded hover:border-gray-200 transition-colors">
                                    <h4 className="font-medium text-gray-800">{proj.title}</h4>
                                    <p className="text-xs text-gray-400 mb-2">{proj.technologies}</p>
                                    <p className="text-xs text-gray-600 line-clamp-3">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Ed Grid */}
                <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Education</h3>
                            <div className="space-y-3">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <h4 className="text-sm font-medium text-gray-800">{edu.degree}</h4>
                                        <div className="text-xs text-gray-500">{edu.school}</div>
                                        <div className="text-xs text-gray-400">{formatDate(edu.startYear)} - {formatDate(edu.endYear)}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Skills</h3>
                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                                {skills.map((s, i) => (
                                    <span key={i} className="text-xs text-gray-600 border-b border-gray-100 pb-0.5">{s.name}</span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Template3;
