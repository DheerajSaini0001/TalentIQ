import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import HeroImage from '../assets/Images/TalentIQHero.png';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const avatarColors = [
    "bg-slate-300",
    "bg-slate-400",
    "bg-slate-500",
    "bg-slate-600",
];

const Home = () => {
    const { darkmode } = useTheme();

    return (
        <div
            className={`relative isolate min-h-screen overflow-hidden transition-colors duration-500
            ${darkmode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}
        >
            {/* Decorative Gradient Blob */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678]
                    w-[36.125rem] -translate-x-1/2 rotate-[30deg]
                    bg-gradient-to-tr from-blue-400 via-indigo-400 to-cyan-400
                    opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>

            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40 items-center gap-12">

                {/* LEFT CONTENT */}
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl w-full animate-in fade-in slide-in-from-left-8 duration-700">

                    {/* Badge */}
                    <div className="mt-8">
                        <Link to="/features" className="inline-flex items-center gap-3 group">
                            <span
                                className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold
                                bg-blue-600/10 dark:bg-blue-400/10
                                text-blue-600 dark:text-blue-400
                                ring-1 ring-inset ring-blue-600/20 dark:ring-blue-400/30
                                group-hover:bg-blue-600/20 transition-all"
                            >
                                <Sparkles className="w-4 h-4 mr-1.5" />
                                Just shipped v1.2
                            </span>

                            <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-blue-500 transition-colors">
                                See what’s new
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    </div>

                    {/* Heading */}
                    <h1 className="mt-10 text-5xl sm:text-7xl font-black tracking-tight leading-[1.1]">
                        Craft Your{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
                            Future
                        </span>{" "}
                        with AI.
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-8 text-lg leading-8 font-semibold text-slate-600 dark:text-slate-400">
                        Build recruiter-approved, ATS-optimized resumes in seconds.
                        Move faster, stand out, and land roles at companies you love.
                    </p>

                    {/* CTA */}
                    <div className="mt-12 flex flex-col sm:flex-row gap-6">
                        <Link to="/create-resume" className="w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="w-full h-14 px-10 rounded-2xl
                                bg-gradient-to-r from-blue-600 to-indigo-600
                                hover:from-blue-700 hover:to-indigo-700
                                text-white font-bold text-lg
                                shadow-xl shadow-blue-500/25
                                transition-all active:scale-95"
                            >
                                Build My Resume
                            </Button>
                        </Link>

                        <Link to="/features" className="w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full h-14 px-8 rounded-2xl
                                border-slate-300 dark:border-slate-700
                                text-slate-700 dark:text-slate-300
                                font-bold text-lg"
                            >
                                Why TalentIQ?
                            </Button>
                        </Link>
                    </div>

                    {/* Trust */}
                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4 text-sm font-semibold text-slate-500">
                        <span>Trusted by 5000+ job seekers</span>
                        <div className="flex -space-x-2">
                            {avatarColors.map((color, i) => (
                                <div
                                    key={i}
                                    className={`w-8 h-8 rounded-full border-2 border-white dark:border-slate-950 ${color}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="mx-auto mt-16 lg:mt-0 animate-in fade-in zoom-in duration-1000">
                    <div className="relative">
                        <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-3xl rounded-3xl" />
                        <div className="relative rounded-3xl bg-white/60 dark:bg-white/5 p-4 ring-1 ring-slate-900/10 dark:ring-white/10 backdrop-blur-2xl shadow-2xl">
                            <img
                                src={HeroImage}
                                alt="TalentIQ app preview"
                                className="w-[50rem] xl:w-[60rem] rounded-2xl
                                shadow-[0_25px_60px_rgba(0,0,0,0.15)]
                                transition-transform duration-500 hover:scale-[1.015]"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
