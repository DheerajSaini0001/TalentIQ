
import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Template7 = ({ data }) => {
    if (!data) return null;
    const { personalInfo, title, summaryInputs, experience = [], education = [], skills = [], projects = [], achievements = [], certifications = [], internships = [], languages = [] } = data;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr === 'Present') return 'Present';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const containerRef = React.useRef(null);
    const [density, setDensity] = React.useState(0);

    React.useEffect(() => {
        setDensity(0);
    }, [data]);

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
        padding: ['p-8', 'p-6', 'p-5', 'p-4', 'p-3'],
        gap: ['gap-8', 'gap-6', 'gap-5', 'gap-4', 'gap-3'],
        spaceY: ['space-y-6', 'space-y-5', 'space-y-4', 'space-y-3', 'space-y-2'],
        headerH: ['h-32', 'h-28', 'h-24', 'h-20', 'h-20'],
        headerP: ['p-6', 'p-5', 'p-4', 'p-3', 'p-3'],
        titleSize: ['text-2xl', 'text-2xl', 'text-xl', 'text-xl', 'text-lg'],
        sectionMb: ['mb-3', 'mb-2', 'mb-2', 'mb-1', 'mb-1'],
        itemMb: ['mb-4', 'mb-3', 'mb-3', 'mb-2', 'mb-1'],
        leading: ['leading-normal', 'leading-snug', 'leading-snug', 'leading-tight', 'leading-tight']
    };

    const getStyle = (key) => styles[key][density];

    return (
        <div ref={containerRef} className={`bg-white text-slate-900 w-full min-h-[1100px] shadow-lg font-sans ${getStyle('leading')} transition-all duration-300`}>
            {/* Split Header */}
            <div className={`grid grid-cols-12 ${getStyle('headerH')}`}>
                <div className={`col-span-5 bg-yellow-400 ${getStyle('headerP')} flex flex-col justify-center`}>
                    <h1 className={`${getStyle('titleSize')} font-black text-slate-900 leading-tight uppercase`}>{personalInfo?.fullName}</h1>
                </div>
                <div className={`col-span-7 bg-slate-900 ${getStyle('headerP')} flex flex-col justify-center text-white text-right`}>
                    <div className="text-xl font-bold tracking-wider mb-2 text-yellow-400 uppercase">{title}</div>
                    <div className="text-sm space-y-1 text-slate-300">
                        {personalInfo?.email && <div>{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo?.address && <div>{personalInfo.address}</div>}
                    </div>
                </div>
            </div>

            <div className={`${getStyle('padding')} ${getStyle('spaceY')}`}>
                {/* Skills Bar - Top */}
                {skills.length > 0 && (
                    <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center border-b-2 border-slate-900 pb-6">
                        {skills.map((s, i) => (
                            <span key={i} className="font-bold text-slate-700 uppercase text-xs tracking-wider">{s.name}</span>
                        ))}
                    </div>
                )}

                {/* Two Columns */}
                <div className={`grid grid-cols-12 ${getStyle('gap')}`}>
                    <div className={`col-span-8 ${getStyle('spaceY')}`}>
                        {/* Summary */}
                        {(summaryInputs?.careerGoal || summaryInputs?.keyStrengths?.length > 0) && (
                            <section>
                                <h3 className={`text-xl font-black text-slate-900 uppercase ${getStyle('sectionMb')}`}><span className="bg-yellow-200 px-1">About Me</span></h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                                    {summaryInputs.yearsOfExperience && <span>{summaryInputs.yearsOfExperience}y Professional</span>}
                                    {summaryInputs.currentStatus && <span>/ {summaryInputs.currentStatus}</span>}
                                    {summaryInputs.industry && <span>/ {summaryInputs.industry}</span>}
                                </div>
                                {summaryInputs.careerGoal && <p className="text-slate-700 leading-relaxed font-medium mb-3">{summaryInputs.careerGoal}</p>}
                                {summaryInputs.keyStrengths?.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {summaryInputs.keyStrengths.map((str, i) => (
                                            <span key={i} className="text-[10px] font-black uppercase bg-slate-900 text-white px-2 py-1">{str}</span>
                                        ))}
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Experience */}
                        {experience.length > 0 && (
                            <section>
                                <h3 className={`text-xl font-black text-slate-900 uppercase ${getStyle('sectionMb')}`}><span className="bg-yellow-200 px-1">Experience</span></h3>
                                <div className="space-y-6">
                                    {experience.map((job, i) => (
                                        <div key={i} className="pl-4 border-l-4 border-slate-200">
                                            <h4 className="font-bold text-lg text-slate-800">{job.jobTitle}</h4>
                                            <div className="flex justify-between text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                                                <span>{job.company}</span>
                                                <span>{formatDate(job.startDate)} - {formatDate(job.endDate)}</span>
                                            </div>
                                            <p className="text-slate-600 whitespace-pre-line leading-relaxed">{job.description}</p>
                                            {job.achievements && (
                                                <div className="mt-2 text-slate-600">
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
                                <h3 className={`text-xl font-black text-slate-900 uppercase ${getStyle('sectionMb')}`}><span className="bg-yellow-200 px-1">Projects</span></h3>
                                {projects.map((proj, i) => (
                                    <div key={i} className={`${getStyle('itemMb')} group`}>
                                        <div className="flex justify-between items-baseline border-b-2 border-slate-900 pb-1 mb-2">
                                            <h4 className="font-bold text-lg text-slate-800 tracking-tight">{proj.title}</h4>
                                            <span className="text-[10px] font-black uppercase text-slate-400">{proj.technologies}</span>
                                        </div>
                                        <p className="text-slate-600 font-medium mb-2">{proj.description}</p>
                                        {proj.link && <a href={`https://${proj.link}`} className="inline-block bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 hover:bg-yellow-200 hover:text-slate-900 transition-colors">LIVE_URL &rarr;</a>}
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* Internships */}
                        {internships.length > 0 && (
                            <section>
                                <h3 className={`text-xl font-black text-slate-900 uppercase ${getStyle('sectionMb')}`}><span className="bg-yellow-200 px-1">Internships</span></h3>
                                {internships.map((intern, i) => (
                                    <div key={i} className={`${getStyle('itemMb')} pl-4 border-l-4 border-slate-900`}>
                                        <h4 className="font-bold text-lg text-slate-800">{intern.role}</h4>
                                        <div className="flex justify-between text-xs font-black text-slate-500 uppercase mb-2">
                                            <span>{intern.company}</span>
                                            <span>{intern.duration}</span>
                                        </div>
                                        <p className="text-slate-600 font-medium whitespace-pre-line leading-relaxed">{intern.description}</p>
                                    </div>
                                ))}
                            </section>
                        )}
                    </div>

                    <div className={`col-span-4 ${getStyle('spaceY')}`}>
                        {/* Skills */}
                        {skills.length > 0 && (
                            <section>
                                <h3 className={`text-lg font-black text-slate-900 uppercase ${getStyle('sectionMb')}`}><span className="bg-slate-200 px-1">Hard Skills</span></h3>
                                <div className="flex flex-col gap-2">
                                    {skills.map((s, i) => (
                                        <div key={i} className="flex flex-col">
                                            <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 mb-1">
                                                <span>{s.name}</span>
                                                <span>90%</span>
                                            </div>
                                            <div className="h-1.5 bg-slate-100">
                                                <div className="h-full bg-slate-900" style={{ width: `90%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {education.length > 0 && (
                            <section>
                                <h3 className="text-lg font-black text-slate-900 uppercase mb-4"><span className="bg-slate-200 px-1">Education</span></h3>
                                {education.map((edu, i) => (
                                    <div key={i} className="mb-4 bg-slate-50 p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="font-bold text-slate-800">{edu.degree}</div>
                                        <div className="text-sm font-semibold text-slate-600">{edu.school}</div>
                                        <div className="text-[10px] font-black text-slate-400 mt-2 uppercase">{formatDate(edu.startYear)} - {formatDate(edu.endYear)}</div>
                                        {edu.grade && <div className="mt-1 text-[10px] font-black text-blue-600 uppercase">GRAD: {edu.grade}</div>}
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* Certifications */}
                        {certifications.length > 0 && (
                            <section>
                                <h3 className="text-lg font-black text-slate-900 uppercase mb-4"><span className="bg-slate-200 px-1">Certified</span></h3>
                                <div className="space-y-4">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="leading-tight text-xs">
                                            <div className="font-bold text-slate-800 uppercase tracking-tight">{cert.name}</div>
                                            <div className="text-[10px] font-black text-slate-400 uppercase mt-1">{cert.issuer} / {cert.year}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Achievements */}
                        {achievements.length > 0 && (
                            <section>
                                <h3 className="text-lg font-black text-slate-900 uppercase mb-4"><span className="bg-slate-200 px-1">Honors</span></h3>
                                <div className="space-y-4 text-xs font-medium">
                                    {achievements.map((ach, i) => (
                                        <div key={i} className="leading-tight">
                                            <div className="font-bold text-slate-800 underline decoration-yellow-300 decoration-2">{ach.title}</div>
                                            <div className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">{ach.year}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {languages.length > 0 && (
                            <section>
                                <h3 className="text-lg font-black text-slate-900 uppercase mb-4"><span className="bg-slate-200 px-1">Languages</span></h3>
                                <div className="space-y-2">
                                    {languages.map((l, i) => (
                                        <div key={i} className="flex justify-between items-center text-xs font-black uppercase text-slate-700">
                                            <span>{l.language}</span>
                                            <span className="bg-slate-900 text-white px-1 leading-none py-0.5">{l.proficiency}</span>
                                        </div>
                                    ))}
                                </div>
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
