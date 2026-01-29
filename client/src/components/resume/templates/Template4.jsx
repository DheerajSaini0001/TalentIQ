
import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Template4 = ({ data }) => {
    if (!data) return null;
    const { personalInfo, title, summaryInputs, experience = [], education = [], skills = [], projects = [] } = data;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr === 'Present') return 'Present';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="bg-white text-slate-900 w-full min-h-[1100px] shadow-lg p-12 font-serif">
            {/* Header */}
            <div className="border-b-4 border-slate-800 pb-4 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 leading-none">{personalInfo?.fullName}</h1>
                    <p className="text-xl text-slate-600 mt-2 font-sans italic">{title}</p>
                </div>
                <div className="text-right text-xs font-sans text-slate-600 space-y-1">
                    {personalInfo?.email && <div>{personalInfo.email}</div>}
                    {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo?.linkedin && <div>{personalInfo.linkedin}</div>}
                    {personalInfo?.address && <div>{personalInfo.address}</div>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Summary */}
                {summaryInputs?.careerGoal && (
                    <section>
                        <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-2 pb-1 font-sans text-slate-700">Executive Summary</h3>
                        <p className="text-sm leading-relaxed">{summaryInputs.careerGoal}</p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-4 pb-1 font-sans text-slate-700">Professional Experience</h3>
                        <div className="space-y-5">
                            {experience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between font-bold text-md text-slate-800">
                                        <span>{job.company}</span>
                                        <span className="font-normal text-sm">{formatDate(job.startDate)} – {formatDate(job.endDate)}</span>
                                    </div>
                                    <div className="text-slate-700 italic text-sm mb-1">{job.jobTitle} | {job.location}</div>
                                    <p className="text-sm text-slate-600 leading-relaxed">{job.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-4 pb-1 font-sans text-slate-700">Key Projects</h3>
                        {projects.map((proj, i) => (
                            <div key={i} className="mb-3">
                                <div className="flex justify-between">
                                    <span className="font-bold text-slate-800 text-sm">{proj.title}</span>
                                    <span className="text-xs text-slate-500 font-sans">{proj.technologies}</span>
                                </div>
                                <p className="text-sm text-slate-600">{proj.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {/* Ed & Skills */}
                <div className="grid grid-cols-2 gap-8">
                    {education.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 pb-1 font-sans text-slate-700">Education</h3>
                            {education.map((edu, i) => (
                                <div key={i} className="mb-2">
                                    <div className="font-bold text-sm">{edu.school}</div>
                                    <div className="text-sm">{edu.degree}</div>
                                    <div className="text-xs italic text-slate-500">{formatDate(edu.startYear)} - {formatDate(edu.endYear)}</div>
                                </div>
                            ))}
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 pb-1 font-sans text-slate-700">Core Competencies</h3>
                            <div className="flex flex-wrap gap-2 text-sm">
                                {skills.map((s, i) => (
                                    <span key={i} className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-sans">{s.name}</span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Template4;
