import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Code2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
    const { darkmode } = useTheme();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            className={`relative transition-all duration-500 border-t backdrop-blur-lg
            ${darkmode
                    ? "bg-slate-950/90 border-slate-800 text-slate-400"
                    : "bg-white border-slate-200 text-slate-600 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* TOP GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

                    {/* BRAND */}
                    <div className="space-y-6">
                        <Link
                            to="/"
                            onClick={scrollToTop}
                            className="flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                                <span className="text-white font-black text-xl">T</span>
                            </div>
                            <h2  className={`text-2xl font-extrabold tracking-tight font-bold uppercase tracking-widest  ${darkmode ? "text-slate-200" : "text-slate-900"}`}>
                           
                                TalentIQ
                            </h2>
                        </Link>

                        <p className="text-sm leading-relaxed font-medium max-w-xs">
                            Empowering your career journey with AI-driven precision.
                            Craft resumes that recruiters actually notice.
                        </p>
                    </div>

                    {/* PRODUCT */}
                    <div >
                        <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 ${darkmode ? "text-slate-200" : "text-slate-900"}`}>
                            Product
                        </h3>
                        <ul className="space-y-4 text-sm font-semibold">
                            {["Features", "Pricing", "Live Demo"].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/${item.toLowerCase().replace(" ", "")}`}
                                        onClick={scrollToTop}
                                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 ${darkmode ? "text-slate-200" : "text-slate-900"}`}>
                            Company
                        </h3>
                        <ul className="space-y-4 text-sm font-semibold">
                            <li>
                                <Link to="/about" onClick={scrollToTop} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" onClick={scrollToTop} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Contact
                                </Link>
                            </li>

                            {/* DEV CARD */}
                            <li className="pt-3">
                                <div className="flex items-center gap-3 p-3 rounded-xl border
                                bg-white/60 dark:bg-slate-800/50
                                border-slate-200 dark:border-slate-700 backdrop-blur">
                                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center">
                                        <Code2 className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] uppercase tracking-widest text-slate-500">
                                            Developer
                                        </span>
                                        <span className="text-xs font-bold text-slate-900 dark:text-slate-200">
                                            Dheeraj Saini
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 ${darkmode ? "text-slate-200" : "text-slate-900"}`}>
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <a
                                    href="mailto:dheerajsaini131652@gmail.com"
                                    className="text-sm font-semibold hover:text-slate-900 dark:hover:text-white transition-colors break-all"
                                >
                                    dheerajsaini131652@gmail.com
                                </a>
                            </li>

                            <li className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <a
                                    href="tel:+916375131652"
                                    className="text-sm font-semibold hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    +91 63751 31652
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
                    <p>© 2026 TalentIQ. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <Link to="/privacy" onClick={scrollToTop} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                            Privacy
                        </Link>
                        <Link to="/terms" onClick={scrollToTop} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                            Terms
                        </Link>
                        <span>
                            Built by{" "}
                            <span
                                className={`cursor-pointer transition-colors font-bold
                                ${darkmode
                                        ? "text-slate-400 hover:text-yellow-400"
                                        : "text-slate-600 hover:text-blue-600"
                                    }`}
                            >
                                Dheeraj Saini
                            </span>
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
