import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth.store';
import authService from '../services/auth.service';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useTheme } from '../context/ThemeContext';
import { Mail, Lock, User, CheckCircle2, ArrowRight, KeyRound } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('details'); // 'details' | 'otp'
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { user, reset } = useAuthStore();
    const { darkmode } = useTheme();

    const { name, email, password, confirmPassword } = formData;

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }

        return () => {
            reset();
        };
    }, [user, navigate, reset]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        // Password Constraint Validation
        if (password.length <= 8) {
            toast.error('Password must be greater than 8 characters');
            return;
        }

        if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
            toast.error('Password must be alphanumeric');
            return;
        }

        setIsSubmitting(true);

        // Send OTP
        try {
            await authService.sendOTP(email);
            setStep('otp');
            toast.success(`OTP sent to ${email}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Using authService directly to register with OTP
            const response = await authService.registerWithOTP({
                name,
                email,
                password,
                otp
            });
            toast.success('Registration successful!');

            // If the response contains a token, we handle login
            if (response.token) {
                // Manually setting user in local storage if needed, or rely on store
                localStorage.setItem('user', JSON.stringify(response));

                // Force navigation/reload
                window.location.href = '/dashboard';
            } else {
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid OTP');
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`flex min-h-[calc(100vh-64px)] ${darkmode ? "bg-slate-950" : "bg-slate-50"}`}>
            {/* Left Side - Branding & Visuals (Hidden on mobile) */}
            <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden ${darkmode ? "bg-slate-900" : "bg-blue-600"}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-violet-600 opacity-90 dark:opacity-40"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

                <div className="relative z-10 flex flex-col justify-center px-16 text-white h-full">
                    <h2 className="text-4xl font-bold mb-6">Start Your Journey</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-md">
                        Join thousands of professionals building their dream careers with TalentIQ.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm mt-1">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Smart Resume Builder</h3>
                                <p className="text-blue-100 text-sm opacity-90">Create professional resumes in minutes with AI assistance.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm mt-1">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">ATS Optimization</h3>
                                <p className="text-blue-100 text-sm opacity-90">Ensure your resume gets past applicant tracking systems.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm mt-1">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Expert Templates</h3>
                                <p className="text-blue-100 text-sm opacity-90">Access a library of field-tested professional templates.</p>
                            </div>
                        </div>
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
                            {step === 'details' ? 'Create your account' : 'Verify Email'}
                        </h1>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            {step === 'details' ? (
                                <>
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 hover:underline transition-all">
                                        Sign in instead
                                    </Link>
                                </>
                            ) : (
                                `We've sent a 6-digit code to ${email}`
                            )}
                        </p>
                    </div>

                    <div className={`p-6 sm:p-8 rounded-2xl shadow-xl border ${darkmode ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-100"}`}>
                        {step === 'details' ? (
                            <form className="space-y-5" onSubmit={handleSendOTP}>
                                <div>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        label="Full Name"
                                        autoComplete="name"
                                        required
                                        placeholder="John Doe"
                                        startIcon={<User size={18} />}
                                        value={name}
                                        onChange={onChange}
                                    />
                                </div>

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

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            autoComplete="new-password"
                                            required
                                            placeholder="••••••••"
                                            startIcon={<Lock size={18} />}
                                            value={password}
                                            onChange={(e) => {
                                                onChange(e);
                                            }}
                                        />
                                        {/* Password Strength Indicator */}
                                        {password && (
                                            <div className="mt-2 space-y-1">
                                                <div className="flex gap-1 h-1">
                                                    <div className={`flex-1 rounded-full transition-colors duration-300 ${password.length >= 8 ? 'bg-green-500' : 'bg-red-500'
                                                        }`} />
                                                    <div className={`flex-1 rounded-full transition-colors duration-300 ${/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password) ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'
                                                        }`} />
                                                    <div className={`flex-1 rounded-full transition-colors duration-300 ${password.length >= 10 && /(?=.*[!@#$%^&*])/.test(password) ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'
                                                        }`} />
                                                </div>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                                    {password.length < 8 ? 'Must be 8+ chars' :
                                                        !/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password) ? 'Must include letters & numbers' :
                                                            'Strong password'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            label="Confirm Password"
                                            autoComplete="new-password"
                                            required
                                            placeholder="••••••••"
                                            startIcon={<Lock size={18} />}
                                            value={confirmPassword}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Button type="submit" className="w-full py-2.5 text-base font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all" isLoading={isSubmitting}>
                                        Continue
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>

                                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                                    By creating an account, you agree to our{' '}
                                    <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                                    {' '}and{' '}
                                    <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                                </p>
                            </form>
                        ) : (
                            <form className="space-y-6" onSubmit={handleVerifyOTP}>
                                <div>
                                    <label htmlFor="otp" className="block text-sm font-medium text-slate-700 mb-1.5 dark:text-slate-300">
                                        Verification Code
                                    </label>
                                    <Input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        required
                                        placeholder="000000"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        className="text-center text-2xl tracking-[0.5em] font-mono h-14"
                                        maxLength={6}
                                        startIcon={<KeyRound size={18} />}
                                    />
                                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center">
                                        Check your spam folder if you don't see the email
                                    </p>
                                </div>

                                <Button type="submit" className="w-full py-2.5 text-base font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all" isLoading={isSubmitting}>
                                    Verify & Create Account
                                </Button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => setStep('details')}
                                        className="text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                                    >
                                        ← Back to details
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
