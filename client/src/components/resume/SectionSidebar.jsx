import { User, FileText, Briefcase, GraduationCap, Wrench, FolderGit2, Award, BookOpen, Globe, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

const SECTIONS = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'summary', label: 'Professional Summary', icon: FileText },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'languages', label: 'Languages & Interests', icon: Globe },
    { id: 'preferences', label: 'Preferences', icon: Settings },
];

const SectionSidebar = ({ activeSection, onSectionChange }) => {
    return (
        <nav className="space-y-1">
            {SECTIONS.map((section) => {
                const Icon = section.icon;
                return (
                    <button
                        key={section.id}
                        onClick={() => onSectionChange(section.id)}
                        className={cn(
                            'w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                            activeSection === section.id
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-slate-700 hover:bg-slate-100'
                        )}
                    >
                        <Icon className={cn("h-4 w-4", activeSection === section.id ? "text-blue-700" : "text-slate-400")} />
                        {section.label}
                    </button>
                );
            })}
        </nav>
    );
};

export default SectionSidebar;
export { SECTIONS };
