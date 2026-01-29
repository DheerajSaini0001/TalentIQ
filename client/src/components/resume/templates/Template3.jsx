
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from 'lucide-react';

const Template3 = ({ data }) => {
    if (!data) return null;
    const { personalInfo, title, summaryInputs, experience = [], education = [], skills = [], projects = [], internships = [], languages = [], achievements = [], certifications = [] } = data;

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
                {(summaryInputs?.careerGoal || summaryInputs?.keyStrengths?.length > 0) && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Profile</h3>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2 text-[10px] text-gray-400 uppercase tracking-tight">
                            {summaryInputs.yearsOfExperience && <span>{summaryInputs.yearsOfExperience}y Experience</span>}
                            {summaryInputs.currentStatus && <span>• {summaryInputs.currentStatus}</span>}
                            {summaryInputs.industry && <span>• {summaryInputs.industry}</span>}
                        </div>
                        {summaryInputs.careerGoal && <p className="text-sm text-gray-600 leading-relaxed text-justify mb-3">{summaryInputs.careerGoal}</p>}
                        {summaryInputs.keyStrengths?.length > 0 && (
                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                                {summaryInputs.keyStrengths.map((str, i) => (
                                    <span key={i} className="text-[11px] text-gray-500 italic opacity-80">{str}</span>
                                ))}
                            </div>
                        )}
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
                                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
                                    {job.achievements && (
                                        <div className="mt-2 text-sm text-gray-600">
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
                        <h3 className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 pt-2 border-t border-gray-100">Projects</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="border border-gray-100 p-4 rounded hover:border-gray-200 transition-colors">
                                    <h4 className="font-medium text-gray-800">{proj.title}</h4>
                                    <p className="text-xs text-gray-400 mb-2">{proj.technologies}</p>
                                    <p className="text-xs text-gray-600 mb-2">{proj.description}</p>
                                    {proj.link && <a href={`https://${proj.link}`} className="text-[10px] text-blue-500 hover:underline">Link &rarr;</a>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Internships */}
                {internships.length > 0 && (
                    <section>
                        <h3 className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 pt-2 border-t border-gray-100">Internships</h3>
                        <div className="space-y-4">
                            {internships.map((intern, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline text-sm">
                                        <h4 className="font-medium text-gray-800">{intern.role}</h4>
                                        <span className="text-[10px] text-gray-400">{intern.duration}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-1">{intern.company}</div>
                                    <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{intern.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements & Certifications Row */}
                {(achievements.length > 0 || certifications.length > 0) && (
                    <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                        {achievements.length > 0 && (
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Honors</h3>
                                <div className="space-y-3">
                                    {achievements.map((ach, i) => (
                                        <div key={i}>
                                            <h4 className="text-[11px] font-bold text-gray-800">{ach.title} ({ach.year})</h4>
                                            <p className="text-[10px] text-gray-500 whitespace-pre-line">{ach.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {certifications.length > 0 && (
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Certifications</h3>
                                <div className="space-y-2">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="text-[11px]">
                                            <span className="font-bold text-gray-800">{cert.name}</span>
                                            <span className="text-gray-400 ml-1">| {cert.issuer}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
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
                                        {edu.grade && <div className="text-[10px] text-blue-600">Grade: {edu.grade}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    <div className="space-y-6">
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
                        {/* Languages */}
                        {languages.length > 0 && (
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Languages</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1">
                                    {languages.map((l, i) => (
                                        <div key={i} className="text-xs text-gray-600 flex items-center gap-1">
                                            <span className="font-medium">{l.language}</span>
                                            <span className="text-[10px] text-gray-400">({l.proficiency})</span>
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
export default Template3;
