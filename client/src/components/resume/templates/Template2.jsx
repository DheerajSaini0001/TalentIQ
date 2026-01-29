
import React from 'react';
import { MapPin, Phone, Mail, Linkedin, Globe, ExternalLink, Calendar } from 'lucide-react';

const Template2 = ({ data }) => {
    if (!data) return null;

    const {
        personalInfo,
        title,
        summaryInputs,
        experience = [],
        education = [],
        skills = [],
        projects = [],
        internships = [],
        certifications = [],
        achievements = [],
        languages = [],
        interests = [],
        volunteering = [],
        publications = []
    } = data;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr === 'Present') return 'Present';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="bg-white text-slate-900 w-full min-h-[1100px] shadow-lg print:shadow-none font-sans text-sm relative grid grid-cols-12">

            {/* Sidebar (Left Column) */}
            <div className="col-span-4 bg-slate-900 text-white p-6 space-y-6">
                {personalInfo?.photo && (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-700 mx-auto mb-4">
                        <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold uppercase tracking-wider">{personalInfo?.fullName}</h1>
                    <p className="text-slate-400 mt-1 uppercase text-xs tracking-widest">{title}</p>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                    {personalInfo?.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-blue-400" /> <span>{personalInfo.email}</span></div>}
                    {personalInfo?.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-blue-400" /> <span>{personalInfo.phone}</span></div>}
                    {personalInfo?.address && <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-blue-400" /> <span>{personalInfo.address}</span></div>}
                    {personalInfo?.linkedin && <a href={personalInfo.linkedin} className="flex items-center gap-2 hover:text-white"><Linkedin className="w-3 h-3 text-blue-400" /> <span>LinkedIn</span></a>}
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-slate-800 rounded text-xs">{s.name}</span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1">Education</h3>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h4 className="font-bold text-white">{edu.degree}</h4>
                                    <p className="text-xs text-slate-400">{edu.school}</p>
                                    <p className="text-xs text-slate-500 mt-1">{formatDate(edu.startYear)} - {formatDate(edu.endYear)}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {/* Languages */}
                {languages.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1">Languages</h3>
                        <ul className="space-y-1">
                            {languages.map((lang, i) => (
                                <li key={i} className="flex justify-between text-xs text-slate-300">
                                    <span>{lang.language}</span>
                                    <span className="text-slate-500">{lang.proficiency}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            {/* Main Content (Right Column) */}
            <div className="col-span-8 p-8 space-y-8">
                {/* Summary */}
                {(summaryInputs?.careerGoal) && (
                    <section>
                        <h3 className="text-lg font-bold uppercase text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">Profile</h3>
                        <p className="text-slate-600 leading-relaxed">{summaryInputs.careerGoal}</p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">Work History</h3>
                        <div className="space-y-6">
                            {experience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-slate-800 text-base">{job.jobTitle}</h4>
                                        <span className="text-xs text-slate-500 font-semibold">{formatDate(job.startDate)} - {formatDate(job.endDate)}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-blue-600 mb-2">{job.company}, {job.location}</p>
                                    <p className="text-slate-600 text-sm">{job.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">Projects</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded border-l-4 border-blue-500">
                                    <h4 className="font-bold text-slate-800">{proj.title}</h4>
                                    <p className="text-xs text-slate-500 mb-2 italic">{proj.technologies}</p>
                                    <p className="text-sm text-slate-600">{proj.description}</p>
                                    {proj.link && <a href={`https://${proj.link}`} className="text-xs text-blue-600 hover:underline mt-1 block">View Project &rarr;</a>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Internships */}
                {internships.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">Internships</h3>
                        {internships.map((intern, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between mb-1">
                                    <h4 className="font-bold text-slate-800">{intern.role}</h4>
                                    <span className="text-xs text-slate-500">{intern.duration}</span>
                                </div>
                                <p className="text-sm text-blue-600">{intern.company}</p>
                                <p className="text-sm text-slate-600 mt-1">{intern.description}</p>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
};

export default Template2;
