
import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Template6 = ({ data }) => {
    if (!data) return null;
    const { personalInfo, title, summaryInputs, experience = [], education = [], skills = [], projects = [] } = data;

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
                                <div key={i} className="mb-2">
                                    <div className="font-bold text-slate-800">{edu.degree}</div>
                                    <div className="text-slate-600">{edu.school}</div>
                                    <div className="text-slate-400 text-[10px]">{formatDate(edu.startYear)} - {formatDate(edu.endYear)}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <div>
                            <h3 className="font-bold text-blue-900 uppercase border-b-2 border-blue-900 mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-1">
                                {skills.map((s, i) => (
                                    <span key={i} className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap">{s.name}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column (Wide) */}
                <div className="col-span-8 space-y-5">
                    {/* Summary */}
                    {summaryInputs?.careerGoal && (
                        <div>
                            <h3 className="font-bold text-blue-900 uppercase border-b-2 border-blue-900 mb-2">Professional Summary</h3>
                            <p className="text-slate-700 leading-normal text-justify">{summaryInputs.careerGoal}</p>
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
                                <div key={i} className="mb-2">
                                    <span className="font-bold text-slate-800">{proj.title}</span>
                                    <span className="text-slate-500 mx-1">|</span>
                                    <span className="text-slate-600 text-[10px] italic">{proj.technologies}</span>
                                    <p className="text-slate-600 mt-0.5">{proj.description}</p>
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
