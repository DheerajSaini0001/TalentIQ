
import React from 'react';
import { MapPin, Phone, Mail, Linkedin, Globe, ExternalLink, Calendar } from 'lucide-react';

const Template1 = ({ data }) => {
    const containerRef = React.useRef(null);
    const [density, setDensity] = React.useState(0);

    // Reset density when data changes
    React.useEffect(() => {
        setDensity(0);
    }, [data]);

    // Check height and compact if needed
    React.useLayoutEffect(() => {
        const checkHeight = () => {
            if (containerRef.current) {
                const height = containerRef.current.scrollHeight;
                // A4 height in pixels approx 1123px.
                if (height > 1130 && density < 4) {
                    setDensity(prev => prev + 1);
                }
            }
        };
        checkHeight();
        window.addEventListener('resize', checkHeight);
        return () => window.removeEventListener('resize', checkHeight);
    }, [density, data]);

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

    // Define density styles (Progressively compact)
    // Levels: 0 (Normal), 1 (Compact), 2 (Dense), 3 (Small), 4 (Minimal)
    const styles = {
        padding: ['p-10', 'p-8', 'p-6', 'p-6', 'p-5'],
        gap: ['gap-6', 'gap-6', 'gap-5', 'gap-4', 'gap-4'],
        spaceY: ['space-y-5', 'space-y-4', 'space-y-3', 'space-y-3', 'space-y-2'],
        text: ['text-sm', 'text-sm', 'text-sm', 'text-xs', 'text-xs'],
        leading: ['leading-normal', 'leading-snug', 'leading-snug', 'leading-tight', 'leading-tight'],
        headerMb: ['mb-5', 'mb-4', 'mb-3', 'mb-3', 'mb-2'],
        headerPb: ['pb-5', 'pb-4', 'pb-3', 'pb-3', 'pb-2'],
        titleSize: ['text-4xl', 'text-3xl', 'text-3xl', 'text-2xl', 'text-2xl']
    };

    const getStyle = (key) => styles[key][density];

    // Helper to format dates (simplified)
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr === 'Present') return 'Present';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div
            ref={containerRef}
            className={`bg-white text-slate-900 w-full min-h-[1100px] shadow-lg print:shadow-none font-sans relative transition-all duration-300 ${getStyle('padding')} ${getStyle('text')} ${getStyle('leading')}`}
        >

            {/* Header */}
            <header className={`border-b-2 border-slate-900 ${getStyle('headerPb')} ${getStyle('headerMb')}`}>
                <div className="flex justify-between items-start gap-6">
                    <div className="flex-1">
                        <h1 className={`${getStyle('titleSize')} font-bold uppercase tracking-tight text-slate-900 mb-2`}>{personalInfo?.fullName || 'Your Name'}</h1>
                        <p className="text-xl text-slate-600 font-medium mb-4">{title || 'Professional Title'}</p>

                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-500">
                            {personalInfo?.email && (
                                <div className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    <span>{personalInfo.email}</span>
                                </div>
                            )}
                            {personalInfo?.phone && (
                                <div className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}
                            {personalInfo?.address && (
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{personalInfo.address}</span>
                                </div>
                            )}
                            {personalInfo?.linkedin && (
                                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                                    <Linkedin className="w-3 h-3" />
                                    <span>LinkedIn</span>
                                </a>
                            )}
                            {personalInfo?.website && (
                                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                                    <Globe className="w-3 h-3" />
                                    <span>Portfolio</span>
                                </a>
                            )}
                        </div>
                    </div>
                    {personalInfo?.photo && (
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm shrink-0">
                            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
            </header>

            {/* Layout Grid */}
            <div className={`grid grid-cols-12 ${getStyle('gap')}`}>

                {/* Left Column (Main Content) */}
                <div className={`col-span-8 ${getStyle('spaceY')}`}>

                    {/* Professional Summary */}
                    {(summaryInputs?.careerGoal || summaryInputs?.keyStrengths?.length > 0) && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Professional Profile</h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs text-slate-600 font-medium">
                                {summaryInputs.yearsOfExperience && <span>Experience: {summaryInputs.yearsOfExperience} Years</span>}
                                {summaryInputs.currentStatus && <span>Status: {summaryInputs.currentStatus}</span>}
                                {summaryInputs.industry && <span>Industry: {summaryInputs.industry}</span>}
                            </div>
                            {summaryInputs.careerGoal && <p className="text-slate-700 mb-3">{summaryInputs.careerGoal}</p>}
                            {summaryInputs.keyStrengths?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {summaryInputs.keyStrengths.map((str, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium">{str}</span>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {/* Work Experience */}
                    {experience.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Work Experience</h3>
                            <div className="space-y-4">
                                {experience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-slate-800">{job.jobTitle}</h4>
                                            <span className="text-xs text-slate-500 whitespace-nowrap">
                                                {formatDate(job.startDate)} - {formatDate(job.endDate)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
                                            <span className="font-semibold">{job.company}</span>
                                            <span>{job.location}</span>
                                        </div>
                                        {job.description && (
                                            <p className="text-slate-700 text-xs whitespace-pre-line leading-relaxed">{job.description}</p>
                                        )}
                                        {job.achievements && (
                                            <div className="mt-1 text-xs text-slate-600 italic">
                                                <p className="whitespace-pre-line leading-relaxed"><span className="font-medium">Key Achievements:</span><br />{job.achievements}</p>
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
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Internships</h3>
                            <div className="space-y-4">
                                {internships.map((intern, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-slate-800">{intern.role}</h4>
                                            <span className="text-xs text-slate-500">{intern.duration}</span>
                                        </div>
                                        <div className="text-xs text-slate-600 font-semibold mb-1">{intern.company}</div>
                                        {intern.description && (
                                            <p className="text-slate-700 text-xs whitespace-pre-line leading-relaxed">{intern.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Key Projects</h3>
                            <div className="space-y-4">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                                {proj.title}
                                                {proj.link && (
                                                    <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                                        <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                )}
                                            </h4>
                                        </div>
                                        {proj.role && <p className="text-xs text-slate-500 mb-1 font-medium">{proj.role}</p>}
                                        {proj.technologies && <p className="text-xs text-slate-500 mb-1">Tech: {proj.technologies}</p>}
                                        {proj.description && <p className="text-slate-700 text-xs whitespace-pre-line leading-relaxed">{proj.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Sidebar Content) */}
                <div className={`col-span-4 ${getStyle('spaceY')}`}>

                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Education</h3>
                            <div className="space-y-4">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                                        <p className="text-xs text-slate-600 font-medium">{edu.school}</p>
                                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                                            <span>{formatDate(edu.startYear)} - {formatDate(edu.endYear)}</span>
                                        </div>
                                        {edu.grade && <p className="text-xs text-slate-500 mt-1">Grade: {edu.grade}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Skills</h3>

                            {/* Group by Category if possible, else list */}
                            <div className="space-y-3">
                                {['Technical', 'Tools', 'Frameworks', 'Soft Skills'].map(cat => {
                                    const catSkills = skills.filter(s => s.category === cat);
                                    if (catSkills.length === 0) return null;
                                    return (
                                        <div key={cat}>
                                            <h5 className="text-xs font-semibold text-slate-700 mb-1">{cat}</h5>
                                            <div className="flex flex-wrap gap-1">
                                                {catSkills.map((s, idx) => (
                                                    <span key={idx} className="text-xs text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{s.name}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Languages</h3>
                            <ul className="space-y-1">
                                {languages.map((lang, i) => (
                                    <li key={i} className="flex justify-between text-xs">
                                        <span className="text-slate-800 font-medium">{lang.language}</span>
                                        <span className="text-slate-500">{lang.proficiency}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Certifications</h3>
                            <ul className="space-y-2">
                                {certifications.map((cert, i) => (
                                    <li key={i} className="text-xs">
                                        <p className="font-bold text-slate-800">{cert.name}</p>
                                        <p className="text-slate-500">{cert.issuer} • {cert.year}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Achievements */}
                    {achievements.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Achievements</h3>
                            <ul className="space-y-2">
                                {achievements.map((ach, i) => (
                                    <li key={i} className="text-xs">
                                        <p className="font-bold text-slate-800">{ach.title}</p>
                                        <p className="text-slate-600 whitespace-pre-line leading-relaxed">{ach.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Publications */}
                    {publications.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Publications</h3>
                            <ul className="space-y-2">
                                {publications.map((pub, i) => (
                                    <li key={i} className="text-xs text-slate-700">
                                        <p className="font-medium">{pub.title}</p>
                                        {pub.link && <a href={pub.link} className="text-blue-500 hover:underline">Link</a>}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Volunteering */}
                    {volunteering.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Volunteering</h3>
                            <ul className="space-y-2">
                                {volunteering.map((vol, i) => (
                                    <li key={i} className="text-xs text-slate-700">
                                        <p className="font-medium">{vol.organization}</p>
                                        <p className="text-slate-500">{vol.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Interests */}
                    {interests.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Interests</h3>
                            <div className="flex flex-wrap gap-2">
                                {interests.map((int, i) => (
                                    <span key={i} className="text-xs text-slate-700">{int}{i < interests.length - 1 ? ' • ' : ''}</span>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Template1;