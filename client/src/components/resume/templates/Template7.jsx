
import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Template7 = ({ data }) => {
    if (!data) return null;
    const { personalInfo, title, summaryInputs, experience = [], education = [], skills = [], projects = [] } = data;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr === 'Present') return 'Present';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="bg-white text-slate-900 w-full min-h-[1100px] shadow-lg font-sans">
            {/* Split Header */}
            <div className="grid grid-cols-12 h-40">
                <div className="col-span-5 bg-yellow-400 p-8 flex flex-col justify-center">
                    <h1 className="text-3xl font-black text-slate-900 leading-tight uppercase">{personalInfo?.fullName}</h1>
                </div>
                <div className="col-span-7 bg-slate-900 p-8 flex flex-col justify-center text-white text-right">
                    <div className="text-xl font-bold tracking-wider mb-2 text-yellow-400 uppercase">{title}</div>
                    <div className="text-sm space-y-1 text-slate-300">
                        {personalInfo?.email && <div>{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo?.address && <div>{personalInfo.address}</div>}
                    </div>
                </div>
            </div>

            <div className="p-10 space-y-8">
                {/* Skills Bar - Top */}
                {skills.length > 0 && (
                    <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center border-b-2 border-slate-900 pb-6">
                        {skills.map((s, i) => (
                            <span key={i} className="font-bold text-slate-700 uppercase text-xs tracking-wider">{s.name}</span>
                        ))}
                    </div>
                )}

                {/* Two Columns */}
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-8 space-y-8">
                        {/* Summary */}
                        {summaryInputs?.careerGoal && (
                            <section>
                                <h3 className="text-xl font-black text-slate-900 uppercase mb-3"><span className="bg-yellow-200 px-1">About Me</span></h3>
                                <p className="text-slate-700 leading-relaxed font-medium">{summaryInputs.careerGoal}</p>
                            </section>
                        )}

                        {/* Experience */}
                        {experience.length > 0 && (
                            <section>
                                <h3 className="text-xl font-black text-slate-900 uppercase mb-4"><span className="bg-yellow-200 px-1">Experience</span></h3>
                                <div className="space-y-6">
                                    {experience.map((job, i) => (
                                        <div key={i} className="pl-4 border-l-4 border-slate-200">
                                            <h4 className="font-bold text-lg text-slate-800">{job.jobTitle}</h4>
                                            <div className="flex justify-between text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                                                <span>{job.company}</span>
                                                <span>{formatDate(job.startDate)} - {formatDate(job.endDate)}</span>
                                            </div>
                                            <p className="text-slate-600">{job.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {projects.length > 0 && (
                            <section>
                                <h3 className="text-xl font-black text-slate-900 uppercase mb-4"><span className="bg-yellow-200 px-1">Projects</span></h3>
                                {projects.map((proj, i) => (
                                    <div key={i} className="mb-4">
                                        <div className="font-bold text-slate-800">{proj.title}</div>
                                        <p className="text-slate-500 text-sm mb-1 italic">{proj.technologies}</p>
                                        <p className="text-slate-600 text-sm">{proj.description}</p>
                                    </div>
                                ))}
                            </section>
                        )}
                    </div>

                    <div className="col-span-4 space-y-8">
                        {/* Education */}
                        {education.length > 0 && (
                            <section>
                                <h3 className="text-lg font-black text-slate-900 uppercase mb-4"><span className="bg-slate-200 px-1">Education</span></h3>
                                {education.map((edu, i) => (
                                    <div key={i} className="mb-4 bg-slate-50 p-4 rounded">
                                        <div className="font-bold text-slate-800">{edu.degree}</div>
                                        <div className="text-sm font-semibold text-slate-600">{edu.school}</div>
                                        <div className="text-xs text-slate-400 mt-1">{formatDate(edu.startYear)} - {formatDate(edu.endYear)}</div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* Contact Again / Socials */}
                        {(personalInfo?.linkedin || personalInfo?.website) && (
                            <section>
                                <h3 className="text-lg font-black text-slate-900 uppercase mb-4"><span className="bg-slate-200 px-1">Links</span></h3>
                                <div className="space-y-2 text-sm">
                                    {personalInfo?.linkedin && <div><a href={personalInfo.linkedin} className="text-blue-600 font-bold hover:underline">LinkedIn Profile</a></div>}
                                    {personalInfo?.website && <div><a href={personalInfo.website} className="text-blue-600 font-bold hover:underline">Online Portfolio</a></div>}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Template7;
