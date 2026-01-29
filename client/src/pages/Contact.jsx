import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
    };

    return (
        <div className="bg-slate-50 min-h-screen pt-20 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight mb-6">
                        Get in touch
                    </h1>
                    <p className="text-lg text-slate-600">
                        Have questions about our pricing, features, or need support? We're here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Email</p>
                                        <a href="mailto:dheerajsaini131652@gmail.com" className="text-slate-600 hover:text-blue-600 transition-colors">
                                            dheerajsaini131652@gmail.com
                                        </a>
                                        <p className="text-xs text-slate-500 mt-1">We'll respond within 24 hours.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Phone</p>
                                        <a href="tel:+916375131652" className="text-slate-600 hover:text-blue-600 transition-colors">
                                            +91 63751 31652
                                        </a>
                                        <p className="text-xs text-slate-500 mt-1">Mon-Fri from 9am to 6pm.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Office</p>
                                        <p className="text-slate-600">
                                            Remote<br />
                                            Jaipur, Rajasthan, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Preview or Socials could go here */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl text-white shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Developer Note</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                Hi, I'm Dheeraj. I built TalentIQ to help people present their best selves to employers. If you have any feedback or feature requests, please don't hesitate to reach out directly!
                            </p>
                            <div className="flex gap-4">
                                {/* Placeholder for social icons if needed */}
                                <div className="h-8 w-8 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer flex items-center justify-center">
                                    <span className="font-bold text-xs">LI</span>
                                </div>
                                <div className="h-8 w-8 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer flex items-center justify-center">
                                    <span className="font-bold text-xs">GH</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                    <Input
                                        placeholder="Your name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                                <Input
                                    placeholder="How can we help?"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all placeholder:text-slate-400 text-slate-900"
                                    placeholder="Tell us more about your inquiry..."
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Send Message
                                    </>
                                )}
                            </Button>

                            {status === 'success' && (
                                <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-center justify-center animate-fade-in">
                                    Message sent successfully! We'll get back to you soon.
                                </div>
                            )}
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
