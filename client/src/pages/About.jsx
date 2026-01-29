import React from 'react';
import { Users, Target, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const values = [
    {
        icon: Users,
        title: "User-Centric Design",
        description: "We build everything with the job seeker in mind. Your success is our success."
    },
    {
        icon: Target,
        title: "Precision & Quality",
        description: "Our AI is tuned to deliver high-quality, ATS-optimized content every time."
    },
    {
        icon: Shield,
        title: "Data Privacy",
        description: "Your personal information is secure with us. We never sell your data."
    },
    {
        icon: Globe,
        title: "Accessibility",
        description: "Professional career tools should be accessible to everyone, everywhere."
    }
];

const About = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-20 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight mb-6">
                        We're on a mission to <br /><span className="text-blue-600">democratize career success</span>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        TalentIQ was founded with a simple belief: everyone deserves a resume that truly reflects their potential. We combine cutting-edge AI with expert career advice to level the playing field.
                    </p>
                </div>

                {/* Our Story / Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-600 rounded-3xl -rotate-2 opacity-10"></div>
                        <div className="relative bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Story</h2>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                Started in 2024, TalentIQ emerged from the frustration of seeing talented individuals get passed over due to poorly formatted resumes. We realized that while talent is distributed equally, the ability to present it effectively is not.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Today, we help thousands of job seekers worldwide craft compelling narratives that get them hired at top companies.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-full min-h-[300px] bg-slate-200 rounded-3xl overflow-hidden flex items-center justify-center">
                        {/* Abstract visual */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-90"></div>
                        <div className="relative text-white text-center p-8">
                            <div className="text-5xl font-bold mb-2">10k+</div>
                            <div className="text-blue-100 text-lg">Resumes Built</div>
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                                    <value.icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
                                <p className="text-sm text-slate-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team CTA */}
                <div className="text-center bg-slate-900 rounded-3xl p-12 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-4">Join us on our journey</h2>
                        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                            Whether you're a job seeker looking for your next role or a developer wanting to contribute (we're open source!), we'd love to have you.
                        </p>
                        <Link to="/contact">
                            <Button variant="primary" size="lg">Get in Touch</Button>
                        </Link>
                    </div>
                    {/* Background elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 -translate-x-1/3 translate-y-1/3"></div>
                </div>

            </div>
        </div>
    );
};

export default About;
