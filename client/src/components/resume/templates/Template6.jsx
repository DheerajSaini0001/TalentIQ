
import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Template6 = ({ data }) => {
    if (!data) return null;
    const { personalInfo, title, summaryInputs, experience = [], education = [], skills = [], projects = [], achievements = [], certifications = [], internships = [], languages = [] } = data;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr === 'Present') return 'Present';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="bg-white text-slate-900 w-full min-h-[1100px] shadow-lg font-sans text-xs">
            {/* Header: Compact, Left-Aligned Name, Right-Aligned Info */}
            <div className="bg-blue-900 text-white p-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold uppercase">{personalInfo?.fullName}</h1>
                    <p className="text-blue-200 mt-1 uppercase tracking-wider font-semibold">{title}</p>
                </div>
                <div className="text-right text-blue-100 text-xs leading-5">
                    {personalInfo?.email && <div>{personalInfo.email}</div>}
                    {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo?.address && <div>{personalInfo.address}</div>}
                </div>
            </div>

            <div className="p-6 grid grid-cols-12 gap-4">
                {/* Left Column (Narrow) */}
                <div className="col-span-4 space-y-4">
                    {/* Links */}
                    {(personalInfo?.linkedin || personalInfo?.website) && (
                        <div className="bg-slate-100 p-3 rounded">
                            <div className="font-bold text-slate-800 mb-1 border-b border-slate-300 pb-1">Connect</div>
                            {personalInfo?.linkedin && <div className="truncate"><a href={personalInfo.linkedin} className="text-blue-700 hover:underline">LinkedIn</a></div>}
                            {personalInfo?.website && <div className="truncate"><a href={personalInfo.website} className="text-blue-700 hover:underline">Portfolio</a></div>}
                        </div>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <div>
                            <h3 className="font-bold text-blue-900 uppercase border-b-2 border-blue-900 mb-2">Education</h3>
                            {education.map((edu, i) => (
                                <div key={i} className="mb-3 text-[11px]">
                                    <div className="font-bold text-slate-800 leading-tight">{edu.degree}</div>
                                    <div className="text-slate-600 mt-0.5">{edu.school}</div>
                                    <div className="text-slate-400 font-bold">{formatDate(edu.startYear)} – {formatDate(edu.endYear)}</div>
                                    {edu.grade && <div className="text-blue-900 font-bold">GPA: {edu.grade}</div>}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <div>
                            <h3 className="font-bold text-blue-900 uppercase border-b-2 border-blue-900 mb-2">Skills</h3>
                            <div className="grid grid-cols-1 gap-1">
                                {skills.map((s, i) => (
                                    <div key={i} className="flex justify-between text-xs text-slate-700 border-b border-slate-100 pb-0.5 last:border-0">
                                        <span>{s.name}</span>
                                        <span className="text-[9px] text-slate-400 uppercase font-bold">Lvl 4+</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <div>
                            <h3 className="font-bold text-blue-900 uppercase border-b-2 border-blue-900 mb-2">Certifications</h3>
                            <div className="space-y-3">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="leading-tight">
                                        <div className="font-bold text-slate-800 text-[11px]">{cert.name}</div>
                                        <div className="text-slate-500 text-[10px]">{cert.issuer} ({cert.year})</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Achievements */}
                    {achievements.length > 0 && (
                        <div>
                            <h3 className="font-bold text-blue-900 uppercase border-b-2 border-blue-900 mb-2">Achievements</h3>
                            <div className="space-y-3">
                                {achievements.map((ach, i) => (
                                    <div key={i} className="leading-tight">
                                        <div className="font-bold text-slate-800 text-[11px]">{ach.title}</div>
                                        <div className="text-slate-500 text-[10px]">{ach.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && (
                        <div>
                            <h3 className="font-bold text-blue-900 uppercase border-b-2 border-blue-900 mb-2">Languages</h3>
                            <div className="space-y-1.5">
                                {languages.map((l, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-800">{l.language}</span>
                                        <span className="text-slate-500 text-[10px]">{l.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column (Wide) */}
                <div className="col-span-8 space-y-5">
                    {/* Summary */}
                    {(summaryInputs?.careerGoal || summaryInputs?.keyStrengths?.length > 0) && (
                        <div>
                            <h3 className="font-bold text-blue-900 uppercase border-b-2 border-blue-900 mb-2">Professional Summary</h3>
                            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-2 text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                                {summaryInputs.yearsOfExperience && <span>{summaryInputs.yearsOfExperience}y Exp</span>}
                                {summaryInputs.currentStatus && <span>• {summaryInputs.currentStatus}</span>}
                                {summaryInputs.industry && <span>• {summaryInputs.industry}</span>}
                            </div>
                            {summaryInputs.careerGoal && <p className="text-slate-700 leading-normal text-justify mb-2">{summaryInputs.careerGoal}</p>}
                            {summaryInputs.keyStrengths?.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {summaryInputs.keyStrengths.map((str, i) => (
                                        <span key={i} className="text-[10px] text-blue-800 font-medium px-1.5 py-0.5 bg-blue-50 rounded-full border border-blue-100">{str}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <div>
                            <h3 className="font-bold text-blue-900 uppercase border-b-2 border-blue-900 mb-3">Work Experience</h3>
                            <div className="space-y-4">
                                {experience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                                            <span>{job.jobTitle}</span>
                                            <span className="text-xs font-normal text-slate-500">{formatDate(job.startDate)} - {formatDate(job.endDate)}</span>
                                        </div>
                                        <div className="text-blue-700 font-medium text-xs mb-1">{job.company} - {job.location}</div>
                                        <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                                            {job.description?.split('.').filter(d => d.trim()).map((pt, idx) => (
                                                <li key={idx} className="pl-1 leading-snug">{pt.trim()}.</li>
                                            ))}
                                        </ul>
                                        {job.achievements && (
                                            <div className="mt-2 text-xs text-slate-600">
                                                <p className="whitespace-pre-line leading-relaxed"><span className="font-medium">Key Achievements:</span><br />{job.achievements}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <div>
                            <h3 className="font-bold text-blue-900 uppercase border-b-2 border-blue-900 mb-2">Projects</h3>
                            {projects.map((proj, i) => (
                                <div key={i} className="mb-3">
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold text-slate-800">{proj.title}</h4>
                                        <span className="text-[10px] text-slate-500 italic">{proj.technologies}</span>
                                    </div>
                                    <p className="text-xs text-slate-600 mt-1">{proj.description}</p>
                                    {proj.link && <a href={`https://${proj.link}`} className="text-[10px] text-blue-700 hover:underline">Link &rarr;</a>}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Internships */}
                    {internships.length > 0 && (
                        <div className="pt-2">
                            <h3 className="font-bold text-blue-900 uppercase border-b-2 border-blue-900 mb-2">Internships</h3>
                            {internships.map((intern, i) => (
                                <div key={i} className="mb-4">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <h4 className="font-bold text-slate-800 text-sm uppercase">{intern.role}</h4>
                                        <span className="text-[10px] font-bold text-slate-500">{intern.duration}</span>
                                    </div>
                                    <div className="text-blue-700 font-medium text-xs mb-1">{intern.company}</div>
                                    <p className="text-xs text-slate-600 whitespace-pre-line leading-normal">{intern.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Template6;
