
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Terminal } from 'lucide-react';

const Template5 = ({ data }) => {
    if (!data) return null;
    const { personalInfo, title, summaryInputs, experience = [], education = [], skills = [], projects = [], achievements = [], certifications = [], internships = [], languages = [] } = data;

    // Tech-focused date helper
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr === 'Present') return 'Present';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="bg-white text-slate-900 w-full min-h-[1100px] shadow-lg font-mono text-sm">
            {/* Header - Terminal Style */}
            <div className="bg-slate-900 text-green-400 p-8">
                <div className="font-bold text-lg mb-2 flex items-center gap-2"><Terminal size={18} /> ~/profile/candidate</div>
                <h1 className="text-4xl font-bold text-white mb-2 ml-4">&gt; {personalInfo?.fullName}</h1>
                <p className="text-xl text-green-500 ml-4 mb-4">  {title || 'Developer'}</p>

                <div className="ml-4 flex flex-wrap gap-4 text-xs text-slate-300">
                    {personalInfo?.email && <span className="hover:text-white">email: "{personalInfo.email}"</span>}
                    {personalInfo?.phone && <span className="hover:text-white">phone: "{personalInfo.phone}"</span>}
                    {personalInfo?.linkedin && <span className="hover:text-white">linkedin: "{personalInfo.linkedin}"</span>}
                </div>
            </div>

            <div className="p-8 grid grid-cols-12 gap-6">
                {/* Main Column */}
                <div className="col-span-8 space-y-6">
                    {/* Summary */}
                    {(summaryInputs?.careerGoal || summaryInputs?.keyStrengths?.length > 0) && (
                        <div className="bg-slate-50 p-4 border-l-4 border-green-500 rounded-r space-y-3">
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500 font-mono">
                                {summaryInputs.yearsOfExperience && <span>exp: {summaryInputs.yearsOfExperience}y</span>}
                                {summaryInputs.currentStatus && <span>status: "{summaryInputs.currentStatus}"</span>}
                                {summaryInputs.industry && <span>industry: "{summaryInputs.industry}"</span>}
                            </div>
                            {summaryInputs.careerGoal && <p className="text-slate-700 font-sans">{summaryInputs.careerGoal}</p>}
                            {summaryInputs.keyStrengths?.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {summaryInputs.keyStrengths.map((str, i) => (
                                        <span key={i} className="text-[10px] text-blue-600 bg-blue-50 px-1 border border-blue-100 italic">#{str.replace(/\s+/g, '_').toLowerCase()}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Projects (Highlighted for Tech) */}
                    {projects.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3">// Projects</h3>
                            <div className="space-y-4">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-blue-600 text-base">{proj.title}</span>
                                            {proj.link && <span className="text-xs text-slate-500">[{proj.link}]</span>}
                                        </div>
                                        <div className="text-xs text-slate-500 font-bold font-sans mb-1">{proj.technologies}</div>
                                        <p className="text-slate-600 font-sans">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3">// Experience</h3>
                            <div className="space-y-6">
                                {experience.map((job, i) => (
                                    <div key={i} className="pl-4 border-l border-slate-200">
                                        <div className="flex justify-between font-bold">
                                            <span>{job.jobTitle}</span>
                                            <span className="text-slate-500 text-xs">{formatDate(job.startDate)} - {formatDate(job.endDate)}</span>
                                        </div>
                                        <div className="text-blue-600 text-xs mb-1">@ {job.company}</div>
                                        <p className="text-slate-600 font-sans whitespace-pre-line leading-relaxed">{job.description}</p>
                                        {job.achievements && (
                                            <div className="mt-2 text-slate-600">
                                                <p className="whitespace-pre-line leading-relaxed text-xs"><span className="text-green-600 font-bold">$ achievements:</span> {job.achievements}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Internships */}
                    {internships.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3">// Internships</h3>
                            <div className="space-y-4">
                                {internships.map((intern, i) => (
                                    <div key={i} className="pl-4 border-l border-slate-200">
                                        <div className="flex justify-between font-bold">
                                            <span>{intern.role}</span>
                                            <span className="text-slate-500 text-xs">{intern.duration}</span>
                                        </div>
                                        <div className="text-blue-600 text-xs mb-1"># {intern.company}</div>
                                        <p className="text-slate-600 font-sans text-xs whitespace-pre-line leading-relaxed">{intern.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Side Column */}
                <div className="col-span-4 space-y-6">
                    {/* Skills */}
                    {skills.length > 0 && (
                        <section className="bg-slate-50 p-4 rounded">
                            <h3 className="text-sm font-bold text-slate-800 mb-3 block border-b border-slate-200 pb-1">const skills = [</h3>
                            <div className="flex flex-col gap-1 pl-2">
                                {skills.map((s, i) => (
                                    <span key={i} className="text-xs text-green-700">'{s.name}'{i < skills.length - 1 ? ',' : ''}</span>
                                ))}
                            </div>
                            <div className="text-sm font-bold text-slate-800 mt-1">];</div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-1">Education</h3>
                            {education.map((edu, i) => (
                                <div key={i} className="mb-3">
                                    <div className="font-bold text-xs">{edu.school}</div>
                                    <div className="text-xs text-slate-600">{edu.degree}</div>
                                    <div className="text-[10px] text-slate-400 font-mono">{formatDate(edu.startYear)} - {formatDate(edu.endYear)}</div>
                                    {edu.grade && <div className="text-[10px] text-green-600 font-bold">score: {edu.grade}</div>}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Achievements */}
                    {achievements.length > 0 && (
                        <section>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-1">Awards</h3>
                            {achievements.map((ach, i) => (
                                <div key={i} className="mb-3">
                                    <div className="font-bold text-xs text-slate-700 underline decoration-green-300">{ach.title}</div>
                                    <p className="text-[10px] text-slate-500 mt-1">{ach.description}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Certs & Languages Row */}
                    <div className="space-y-6">
                        {certifications.length > 0 && (
                            <section>
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-1">Certs</h3>
                                {certifications.map((cert, i) => (
                                    <div key={i} className="text-[10px] mb-2 leading-tight">
                                        <span className="font-bold text-slate-700">{cert.name}</span>
                                        <div className="text-slate-400 text-[9px]">{cert.issuer}, {cert.year}</div>
                                    </div>
                                ))}
                            </section>
                        )}
                        {languages.length > 0 && (
                            <section>
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-1">Languages</h3>
                                <div className="text-[10px] font-mono">
                                    {languages.map((l, i) => (
                                        <div key={i} className="mb-1 text-slate-600">
                                            &gt; {l.language}: <span className="text-green-600 font-bold">"{l.proficiency}"</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Template5;
