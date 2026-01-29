
import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Template4 = ({ data }) => {
    if (!data) return null;
    const { personalInfo, title, summaryInputs, experience = [], education = [], skills = [], projects = [], achievements = [], certifications = [], internships = [], languages = [] } = data;

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
                {(summaryInputs?.careerGoal || summaryInputs?.keyStrengths?.length > 0) && (
                    <section>
                        <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-2 pb-1 font-sans text-slate-700">Executive Summary</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2 text-xs font-sans text-slate-500 italic">
                            {summaryInputs.yearsOfExperience && <span>{summaryInputs.yearsOfExperience} Years Experience</span>}
                            {summaryInputs.currentStatus && <span>Status: {summaryInputs.currentStatus}</span>}
                            {summaryInputs.industry && <span>Industry: {summaryInputs.industry}</span>}
                        </div>
                        {summaryInputs.careerGoal && <p className="text-sm leading-relaxed mb-3">{summaryInputs.careerGoal}</p>}
                        {summaryInputs.keyStrengths?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {summaryInputs.keyStrengths.map((str, i) => (
                                    <span key={i} className="text-xs border border-slate-200 px-2 py-0.5 rounded-sm bg-slate-50 text-slate-600">{str}</span>
                                ))}
                            </div>
                        )}
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
                                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{job.description}</p>
                                    {job.achievements && (
                                        <div className="mt-2 text-sm text-slate-600">
                                            <p className="whitespace-pre-line leading-relaxed"><span className="font-medium">Key Achievements:</span><br />{job.achievements}</p>
                                        </div>
                                    )}
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
                                    {edu.grade && <div className="text-xs text-blue-800 font-sans mt-0.5">GPA: {edu.grade}</div>}
                                </div>
                            ))}
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 pb-1 font-sans text-slate-700">Core Competencies</h3>
                            <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                                {skills.map((s, i) => (
                                    <span key={i} className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-sans shadow-sm">{s.name}</span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Internships & Achievements Row */}
                {(internships.length > 0 || achievements.length > 0) && (
                    <div className="grid grid-cols-12 gap-8">
                        {internships.length > 0 && (
                            <div className="col-span-7">
                                <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 pb-1 font-sans text-slate-700">Internships</h3>
                                {internships.map((intern, i) => (
                                    <div key={i} className="mb-3">
                                        <div className="flex justify-between font-bold text-sm text-slate-800">
                                            <span>{intern.company}</span>
                                            <span className="font-normal text-xs">{intern.duration}</span>
                                        </div>
                                        <div className="text-slate-600 italic text-xs mb-1">{intern.role}</div>
                                        <p className="text-xs text-slate-600 whitespace-pre-line">{intern.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {achievements.length > 0 && (
                            <div className="col-span-5">
                                <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 pb-1 font-sans text-slate-700">Honors</h3>
                                <ul className="list-disc list-inside text-xs text-slate-600 space-y-2">
                                    {achievements.map((ach, i) => (
                                        <li key={i}>
                                            <span className="font-bold text-slate-800">{ach.title}</span>
                                            <p className="ml-4 mt-0.5 italic">{ach.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Certifications & Languages Bar */}
                {(certifications.length > 0 || languages.length > 0) && (
                    <div className="border-t border-slate-200 pt-4 flex flex-wrap gap-8">
                        {certifications.length > 0 && (
                            <div>
                                <h3 className="text-[10px] font-bold uppercase text-slate-400 mb-2 font-sans tracking-widest">Certifications</h3>
                                <div className="flex flex-wrap gap-3">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="text-xs">
                                            <span className="font-bold">{cert.issuer}:</span> {cert.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {languages.length > 0 && (
                            <div>
                                <h3 className="text-[10px] font-bold uppercase text-slate-400 mb-2 font-sans tracking-widest">Languages</h3>
                                <div className="flex flex-wrap gap-3">
                                    {languages.map((l, i) => (
                                        <div key={i} className="text-xs uppercase tracking-tight">
                                            <span className="font-bold">{l.language}</span> ({l.proficiency})
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Template4;
