
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
                if (height > 1130 && density < 4) {
                    setDensity(prev => prev + 1);
                }
            }
        };
        checkHeight();
        window.addEventListener('resize', checkHeight);
        return () => window.removeEventListener('resize', checkHeight);
    }, [density, data]);

    const styles = {
        sidebarPadding: ['p-5', 'p-4', 'p-4', 'p-3', 'p-2'],
        sidebarSpace: ['space-y-5', 'space-y-4', 'space-y-3', 'space-y-2', 'space-y-2'],
        mainPadding: ['p-6', 'p-5', 'p-4', 'p-3', 'p-3'],
        mainSpace: ['space-y-6', 'space-y-5', 'space-y-4', 'space-y-3', 'space-y-2'],
        sectionMb: ['mb-3', 'mb-2', 'mb-2', 'mb-1', 'mb-1'],
        text: ['text-sm', 'text-sm', 'text-xs', 'text-xs', 'text-[10px]'],
        descText: ['text-xs', 'text-xs', 'text-[10px]', 'text-[10px]', 'text-[9px]'],
        leading: ['leading-normal', 'leading-snug', 'leading-snug', 'leading-tight', 'leading-tight']
    };

    const getStyle = (key) => styles[key][density];

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr === 'Present') return 'Present';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div ref={containerRef} className={`bg-white text-slate-900 w-full min-h-[1100px] shadow-lg print:shadow-none font-sans relative grid grid-cols-12 ${getStyle('text')} ${getStyle('leading')} transition-all duration-300`}>

            {/* Sidebar (Left Column) */}
            <div className={`col-span-4 bg-slate-900 text-white ${getStyle('sidebarPadding')} ${getStyle('sidebarSpace')}`}>
                {personalInfo?.photo && (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-700 mx-auto mb-4">
                        <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                )}

                <div className={`text-center ${getStyle('sectionMb')}`}>
                    <h1 className="text-2xl font-bold uppercase tracking-wider">{personalInfo?.fullName}</h1>
                    <p className="text-slate-400 mt-1 uppercase text-xs tracking-widest">{title}</p>
                </div>

                <div className={`space-y-4 text-sm text-slate-300 ${getStyle('sectionMb')}`}>
                    {personalInfo?.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-blue-400" /> <span>{personalInfo.email}</span></div>}
                    {personalInfo?.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-blue-400" /> <span>{personalInfo.phone}</span></div>}
                    {personalInfo?.address && <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-blue-400" /> <span>{personalInfo.address}</span></div>}
                    {personalInfo?.linkedin && <a href={personalInfo.linkedin} className="flex items-center gap-2 hover:text-white"><Linkedin className="w-3 h-3 text-blue-400" /> <span>LinkedIn</span></a>}
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <section>
                        <h3 className={`text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1 ${getStyle('sectionMb')}`}>Skills</h3>
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
                        <h3 className={`text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1 ${getStyle('sectionMb')}`}>Education</h3>
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
                        <h3 className={`text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-1 ${getStyle('sectionMb')}`}>Languages</h3>
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
            <div className={`col-span-8 ${getStyle('mainPadding')} ${getStyle('mainSpace')}`}>
                {/* Summary */}
                {(summaryInputs?.careerGoal || summaryInputs?.keyStrengths?.length > 0) && (
                    <section>
                        <h3 className="text-lg font-bold uppercase text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">Profile</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs text-slate-500 font-semibold px-1">
                            {summaryInputs.yearsOfExperience && <span>Experience: {summaryInputs.yearsOfExperience} Years</span>}
                            {summaryInputs.currentStatus && <span>Status: {summaryInputs.currentStatus}</span>}
                            {summaryInputs.industry && <span>Industry: {summaryInputs.industry}</span>}
                        </div>
                        {summaryInputs.careerGoal && <p className="text-slate-600 leading-relaxed mb-4">{summaryInputs.careerGoal}</p>}

                        {summaryInputs.keyStrengths?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {summaryInputs.keyStrengths.map((str, i) => (
                                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium border border-slate-200">{str}</span>
                                ))}
                            </div>
                        )}
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
                                    {job.description && (
                                        <p className={`text-slate-600 ${getStyle('descText')} whitespace-pre-line leading-relaxed`}>{job.description}</p>
                                    )}
                                    {job.achievements && (
                                        <div className={`mt-2 ${getStyle('descText')} text-slate-600`}>
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
                        <h3 className="text-lg font-bold uppercase text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">Projects</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded border-l-4 border-blue-500">
                                    <h4 className="font-bold text-slate-800">{proj.title}</h4>
                                    <p className="text-xs text-slate-500 mb-2 italic">{proj.technologies}</p>
                                    <p className={`${getStyle('descText')} text-slate-600`}>{proj.description}</p>
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
                                    <span className="text-xs text-slate-500 font-semibold">
                                        {intern.duration || (intern.startDate ? `${formatDate(intern.startDate)} - ${formatDate(intern.endDate)}` : '')}
                                    </span>
                                </div>
                                <p className="text-sm text-blue-600">{intern.company}</p>
                                <p className={`${getStyle('descText')} text-slate-600 mt-1 whitespace-pre-line leading-relaxed`}>{intern.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">Honors & Awards</h3>
                        {achievements.map((ach, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between mb-1">
                                    <h4 className="font-bold text-slate-800">{ach.title}</h4>
                                    <span className="text-xs text-slate-500">{ach.year}</span>
                                </div>
                                <p className={`${getStyle('descText')} text-slate-600 mt-1 whitespace-pre-line leading-relaxed`}>{ach.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">Certifications</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {certifications.map((cert, i) => (
                                <div key={i} className="bg-slate-50 p-3 rounded">
                                    <h4 className="font-bold text-slate-800 text-sm">{cert.name}</h4>
                                    <p className="text-xs text-blue-600 font-semibold">{cert.issuer}</p>
                                    <p className="text-[10px] text-slate-400 mt-1">{cert.year}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Template2;
