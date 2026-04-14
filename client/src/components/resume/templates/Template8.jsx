
import React from 'react';
import { MapPin, Phone, Mail, Linkedin, Globe, ExternalLink } from 'lucide-react';

const Template8 = ({ data, fontSize = 10 }) => {
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

    // Helper to format dates
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr === 'Present') return 'Present';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const SectionHeader = ({ title }) => (
        <div className="mt-4 mb-2">
            <h3 className="font-bold uppercase tracking-wider text-black" style={{ fontSize: `${fontSize * 1.1}px` }}>{title}</h3>
            <div className="h-[1px] bg-black w-full mt-0.5"></div>
        </div>
    );

    return (
        <div 
            className="bg-white text-black w-full min-h-[1000px] font-serif leading-snug"
            style={{ fontSize: `${fontSize}px` }}
        >
            
            {/* Header - Centered */}
            <header className="text-center mb-6">
                <h1 className="font-bold uppercase mb-2" style={{ fontSize: `${fontSize * 2.5}px` }}>{personalInfo?.fullName || 'YOUR NAME'}</h1>
                
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-gray-800" style={{ fontSize: `${fontSize * 0.9}px` }}>
                    {personalInfo?.address && (
                        <span>{personalInfo.address}</span>
                    )}
                    {(personalInfo?.address && personalInfo?.phone) && <span>|</span>}
                    {personalInfo?.phone && (
                        <span>{personalInfo.phone}</span>
                    )}
                    {(personalInfo?.phone && personalInfo?.email) && <span>|</span>}
                    {personalInfo?.email && (
                        <span>{personalInfo.email}</span>
                    )}
                </div>

                <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-gray-800 mt-1" style={{ fontSize: `${fontSize * 0.9}px` }}>
                    {personalInfo?.linkedin && (
                        <span className="flex items-center gap-1">
                            {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                        </span>
                    )}
                    {(personalInfo?.linkedin && personalInfo?.website) && <span>|</span>}
                    {personalInfo?.website && (
                        <span className="flex items-center gap-1">
                            {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
                        </span>
                    )}
                </div>
            </header>

            {/* Summary */}
            {(summaryInputs?.careerGoal || summaryInputs?.keyStrengths?.length > 0) && (
                <section>
                    <SectionHeader title="SUMMARY" />
                    <p className="leading-relaxed text-gray-900" style={{ fontSize: `${fontSize * 0.9}px` }}>
                        {summaryInputs.careerGoal}
                    </p>
                </section>
            )}

            {/* Technical Skills */}
            {skills.length > 0 && (
                <section>
                    <SectionHeader title="TECHNICAL SKILLS" />
                    <div className="space-y-1" style={{ fontSize: `${fontSize * 0.9}px` }}>
                        {['Technical', 'Tools', 'Frameworks', 'Soft Skills'].map(cat => {
                            const catSkills = skills.filter(s => s.category === cat);
                            if (catSkills.length === 0) return null;
                            return (
                                <p key={cat} className="text-gray-900">
                                    <span className="font-bold">{cat}:</span> {catSkills.map(s => s.name).join(', ')}
                                </p>
                            )
                        })}
                        {/* If no categories match, just list all */}
                        {skills.filter(s => !['Technical', 'Tools', 'Frameworks', 'Soft Skills'].includes(s.category)).length > 0 && (
                             <p className="text-gray-900">
                                <span className="font-bold">Other Skills:</span> {skills.filter(s => !['Technical', 'Tools', 'Frameworks', 'Soft Skills'].includes(s.category)).map(s => s.name).join(', ')}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Experience */}
            {(experience.length > 0 || internships.length > 0) && (
                <section>
                    <SectionHeader title="EXPERIENCE" />
                    <div className="space-y-4" style={{ fontSize: `${fontSize * 0.9}px` }}>
                        {[...experience, ...internships].map((job, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline">
                                    <h4 className="font-bold text-gray-900">{job.jobTitle || job.role}</h4>
                                </div>
                                <div className="flex justify-between items-baseline font-bold italic">
                                    <span>{job.company} {job.location ? `| ${job.location}` : ''}</span>
                                    <span className="font-normal not-italic">{job.startDate ? `${formatDate(job.startDate)} – ${formatDate(job.endDate)}` : job.duration}</span>
                                </div>
                                <ul className="list-disc ml-5 mt-1 space-y-0.5 text-gray-900">
                                    {(job.description || '').split('\n').filter(line => line.trim()).map((line, idx) => (
                                        <li key={idx} className="leading-snug">{line.replace(/^•\s*/, '')}</li>
                                    ))}
                                    {job.achievements && (
                                         <li className="leading-snug italic font-medium">Key Achievements: {job.achievements}</li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section>
                    <SectionHeader title="PROJECTS" />
                    <div className="space-y-4" style={{ fontSize: `${fontSize * 0.9}px` }}>
                        {projects.map((proj, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline font-bold">
                                    <div className="flex items-center gap-1">
                                        <span>{proj.title}</span>
                                        {proj.technologies && <span className="font-normal italic ml-1">| {proj.technologies}</span>}
                                    </div>
                                    {proj.link && <span className="font-normal text-[10px] underline">{proj.link}</span>}
                                </div>
                                <ul className="list-disc ml-5 mt-1 space-y-0.5 text-gray-900">
                                    {(proj.description || '').split('\n').filter(line => line.trim()).map((line, idx) => (
                                        <li key={idx} className="leading-snug">{line.replace(/^•\s*/, '')}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section>
                    <SectionHeader title="EDUCATION" />
                    <div className="space-y-3" style={{ fontSize: `${fontSize * 0.9}px` }}>
                        {education.map((edu, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline">
                                    <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                                </div>
                                <div className="flex justify-between items-baseline font-bold italic">
                                    <span>{edu.school} {edu.location ? `| ${edu.location}` : ''}</span>
                                    <span className="font-normal not-italic">{formatDate(edu.startYear)} – {formatDate(edu.endYear)} {edu.grade ? `| CGPA: ${edu.grade}` : ''}</span>
                                </div>
                                {edu.relevantCoursework && (
                                    <p className="text-gray-900 mt-1 italic"><span className="font-bold not-italic">Relevant Coursework:</span> {edu.relevantCoursework}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications & Others */}
            {(certifications.length > 0 || achievements.length > 0) && (
                <section>
                    <SectionHeader title="CERTIFICATIONS & ACHIEVEMENTS" />
                    <ul className="list-disc ml-5 text-gray-900 space-y-1" style={{ fontSize: `${fontSize * 0.9}px` }}>
                        {certifications.map((cert, i) => (
                            <li key={i}><span className="font-bold">{cert.name}</span> - {cert.issuer} ({cert.year})</li>
                        ))}
                        {achievements.map((ach, i) => (
                            <li key={i}><span className="font-bold">{ach.title}</span> - {ach.description} ({ach.year})</li>
                        ))}
                    </ul>
                </section>
            )}

        </div>
    );
};

export default Template8;
