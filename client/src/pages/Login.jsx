import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/auth.store';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useTheme } from '../context/ThemeContext';
import { Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const { login, isLoading, isError, isSuccess, message, user, reset } = useAuthStore();
    const { darkmode } = useTheme();

    const { email, password } = formData;

    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    useEffect(() => {
        if (isError) {
            alert(message);
        }

        if (isSuccess || user) {
            navigate(from, { replace: true });
        }

        return () => {
            reset();
        };
    }, [user, isError, isSuccess, message, navigate, reset, from]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className={`flex min-h-[calc(100vh-64px)] ${darkmode ? "bg-slate-950" : "bg-slate-50"}`}>
            {/* Left Side - Branding & Visuals (Hidden on mobile) */}
            <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden ${darkmode ? "bg-slate-900" : "bg-blue-600"}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-violet-600 opacity-90 dark:opacity-40"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

                <div className="relative z-10 flex flex-col justify-center px-16 text-white h-full">
                    <h2 className="text-4xl font-bold mb-6">Welcome back to TalentIQ</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-md">
                        Your professional journey continues here. Create, edit, and perfect your resume with AI-powered tools.
                    </p>

                    <div className="space-y-4">
                        {[
                            'AI-Powered Resume Optimization',
                            'Professional Templates',
                            'ATS-Friendly Formats',
                            'Real-time Content Analysis'
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-lg font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-violet-500 rounded-full blur-3xl opacity-30"></div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Sign in to your account
                        </h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 hover:underline transition-all">
                                Create a free account
                            </Link>
                        </p>
                    </div>

                    <div className={`p-6 sm:p-8 rounded-2xl shadow-xl border ${darkmode ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-100"}`}>
                        <form className="space-y-6" onSubmit={onSubmit}>
                            <div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    required
                                    placeholder="you@example.com"
                                    startIcon={<Mail size={18} />}
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                        Password
                                    </label>
                                    
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="••••••••"
                                    startIcon={<Lock size={18} />}
                                    value={password}
                                    onChange={onChange}
                                    // Label is handled above for custom layout
                                    label={null}
                                />
                            </div>

                            <Button type="submit" className="w-full py-2.5 text-base font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all" isLoading={isLoading}>
                                Sign in
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>

                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className={`px-4 ${darkmode ? "bg-slate-900 text-slate-400" : "bg-white text-slate-500"}`}>
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-3">
                                <Link
                                    to="/login-otp"
                                    className={`flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-inset transition-all ${darkmode
                                            ? "bg-slate-800 text-white ring-slate-700 hover:bg-slate-700"
                                            : "bg-white text-slate-900 ring-slate-300 hover:bg-slate-50"
                                        }`}
                                >
                                    <Mail className="h-5 w-5 text-blue-500" />
                                    Sign in with OTP
                                </Link>
                                {/* Future: Add Google login button here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
