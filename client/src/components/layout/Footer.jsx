import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Code2 } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* Brand & Tagline */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">F</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">TalentIQ</h2>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                            The resume builder powered by AI.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link to="/features" onClick={scrollToTop} className="hover:text-blue-400 transition-colors duration-200">Features</Link></li>
                            <li><Link to="/pricing" onClick={scrollToTop} className="hover:text-blue-400 transition-colors duration-200">Pricing</Link></li>
                            <li><Link to="/demo" onClick={scrollToTop} className="hover:text-blue-400 transition-colors duration-200">Live Demo</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" onClick={scrollToTop} className="hover:text-blue-400 transition-colors duration-200">About Us</Link></li>
                            <li><Link to="/contact" onClick={scrollToTop} className="hover:text-blue-400 transition-colors duration-200">Contact</Link></li>
                            <li className="pt-2">
                                <div className="flex items-start gap-2 text-slate-400">
                                    <Code2 className="w-4 h-4 mt-1 text-blue-500" />
                                    <div>
                                        <span className="text-xs uppercase tracking-wider block mb-0.5">Developer</span>
                                        <span className="text-white font-medium">Dheeraj Saini</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-blue-500 shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <a href="mailto:dheerajsaini131652@gmail.com" className="hover:text-white transition-colors text-sm break-all">dheerajsaini131652@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-blue-500 shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <a href="tel:+916375131652" className="hover:text-white transition-colors text-sm">+91 63751 31652</a>
                            </li>
                        </ul>

                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Legal</h3>
                        <ul className="space-y-1 text-sm">
                            <li><Link to="/privacy" onClick={scrollToTop} className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" onClick={scrollToTop} className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© 2026 TalentIQ.</p>
                    <p className="mt-2 md:mt-0 flex items-center gap-1">
                        Developed by <span className="text-slate-300 font-medium hover:text-blue-400 cursor-pointer transition-colors">Dheeraj Saini</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
