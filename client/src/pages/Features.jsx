import React from 'react';
import { Bot, CheckCircle, Smartphone, Layout, Zap, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const features = [
    {
        icon: Bot,
        title: "AI-Powered Suggestions",
        description: "Get real-time, intelligent suggestions for your resume content based on your industry and role."
    },
    {
        icon: CheckCircle,
        title: "ATS-Friendly Templates",
        description: "Professionally designed templates ensuring your resume gets past Applicant Tracking Systems."
    },
    {
        icon: Layout,
        title: "Real-time Preview",
        description: "See changes instantly as you edit. No more guessing how your document will look."
    },
    {
        icon: Smartphone,
        title: "Mobile Responsive",
        description: "Create, edit, and download your resume on the go from any device."
    },
    {
        icon: Zap,
        title: "Instant PDF Export",
        description: "Download your polished resume in high-quality PDF format with a single click."
    },
    {
        icon: Share2,
        title: "Easy Sharing",
        description: "Share a secure link to your resume directly with recruiters or on social media."
    }
];

const Features = () => {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-20 pb-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-5xl tracking-tight mb-6">
                        Everything you need to build a <span className="text-blue-600 dark:text-blue-400">winning resume</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                        TalentIQ combines advanced AI technology with professional design to help you land your dream job faster.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register">
                            <Button size="lg">Get Started Free</Button>
                        </Link>
                        <Link to="/demo">
                            <Button variant="outline" size="lg">View Demo</Button>
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md dark:hover:shadow-blue-900/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
                                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 bg-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Ready to boost your career?</h2>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">Join thousands of job seekers who found success with TalentIQ.</p>
                        <Link to="/register">
                            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                                Build Your Resume Now
                            </button>
                        </Link>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
                </div>

            </div>
        </div>
    );
};

export default Features;
