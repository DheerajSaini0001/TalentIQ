import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { toast } from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import authService from '../services/auth.service';
import { Mail, KeyRound, ArrowRight, User, Lock, CheckCircle2 } from 'lucide-react';

const LoginOTP = () => {
    const [step, setStep] = useState('email'); // 'email' or 'otp' or 'register'
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const { darkmode } = useTheme();
    const from = location.state?.from?.pathname || '/dashboard';

    // Timer for resend OTP
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await authService.sendOTP(email);
            setIsNewUser(response.isNewUser);

            if (response.isNewUser) {
                setStep('register');
                toast.success('OTP sent! Please complete registration.');
            } else {
                setStep('otp');
                toast.success('OTP sent to your email!');
            }

            setTimer(60); // 60 seconds cooldown
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isNewUser) {
                // Validation for optional password
                if (password) {
                    if (password.length <= 8) {
                        toast.error('Password must be > 8 chars');
                        setIsLoading(false);
                        return;
                    }
                    if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
                        toast.error('Password must be alphanumeric');
                        setIsLoading(false);
                        return;
                    }
                }

                // Register with OTP
                const response = await authService.registerWithOTP({
                    name,
                    email,
                    otp,
                    password: password || undefined,
                });
                toast.success('Registration successful!');
                navigate(from, { replace: true });
            } else {
                // Login with OTP
                const response = await authService.verifyOTP(email, otp);
                toast.success('Login successful!');
                navigate(from, { replace: true });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (timer > 0) return;

        setIsLoading(true);
        try {
            await authService.sendOTP(email);
            toast.success('OTP resent!');
            setTimer(60);
        } catch (error) {
            toast.error('Failed to resend OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setStep('email');
        setOTP('');
        setName('');
        setPassword('');
    };

    return (
        <div className={`flex min-h-[calc(100vh-64px)] ${darkmode ? "bg-slate-950" : "bg-slate-50"}`}>
            {/* Left Side - Branding & Visuals (Hidden on mobile) */}
            <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden ${darkmode ? "bg-slate-900" : "bg-blue-600"}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-violet-600 opacity-90 dark:opacity-40"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

                <div className="relative z-10 flex flex-col justify-center px-16 text-white h-full">
                    <h2 className="text-4xl font-bold mb-6">Secure & Seamless Access</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-md">
                        Login securely with One-Time Password or create a new account instantly.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-medium">Passwordless Authentication</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-medium">Instant Account Creation</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-medium">Secure & Encrypted</span>
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
                            TalentIQ
                        </h1>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
                            {step === 'email' && 'Welcome Back'}
                            {step === 'otp' && 'Verify OTP'}
                            {step === 'register' && 'Complete Registration'}
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            {step === 'email' && 'Enter your email to receive a login code'}
                            {step === 'otp' && `Enter the 6-digit code sent to ${email}`}
                            {step === 'register' && 'Fill in your details to finalize your account'}
                        </p>
                    </div>

                    <div className={`p-6 sm:p-8 rounded-2xl shadow-xl border ${darkmode ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-100"}`}>
                        {/* Email Step */}
                        {step === 'email' && (
                            <form className="space-y-6" onSubmit={handleSendOTP}>
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
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <Button type="submit" className="w-full py-2.5 text-base font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all" isLoading={isLoading}>
                                    Continue with OTP
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>

                                <div className="text-center pt-2">
                                    <Link to="/login" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                                        Use password instead
                                    </Link>
                                </div>
                            </form>
                        )}

                        {/* OTP Verification Step (Existing User) */}
                        {step === 'otp' && !isNewUser && (
                            <form className="space-y-6" onSubmit={handleVerifyOTP}>
                                <div>
                                    <label htmlFor="otp" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        One-Time Password
                                    </label>
                                    <Input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        required
                                        placeholder="000000"
                                        value={otp}
                                        onChange={(e) => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        className="text-center text-2xl tracking-[0.5em] font-mono h-14"
                                        maxLength={6}
                                        startIcon={<KeyRound size={18} />}
                                    />
                                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center">
                                        Check your spam folder if you don't see the email
                                    </p>
                                </div>

                                <Button type="submit" className="w-full py-2.5 text-base font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all" isLoading={isLoading}>
                                    Verify & Login
                                </Button>

                                <div className="flex justify-between items-center text-sm pt-2">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                                    >
                                        ← different email
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        disabled={timer > 0}
                                        className={`font-medium transition-colors ${timer > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-blue-600 dark:text-blue-400 hover:text-blue-500'}`}
                                    >
                                        {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Registration Step (New User) */}
                        {step === 'register' && (
                            <form className="space-y-5" onSubmit={handleVerifyOTP}>
                                <div>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        label="Full Name"
                                        required
                                        placeholder="John Doe"
                                        startIcon={<User size={18} />}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password (Optional)"
                                    placeholder="Set a password"
                                    startIcon={<Lock size={18} />}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {password && (
                                    <div className="mt-2 space-y-1">
                                        <div className="flex gap-1 h-1">
                                            <div className={`flex-1 rounded-full transition-colors duration-300 ${password.length > 8 ? 'bg-green-500' : 'bg-red-500'
                                                }`} />
                                            <div className={`flex-1 rounded-full transition-colors duration-300 ${/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password) ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'
                                                }`} />
                                        </div>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                            {password.length <= 8 ? 'Must be > 8 chars' :
                                                !/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password) ? 'Must be alphanumeric' :
                                                    'Good password'}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="otp" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Verification Code
                                    </label>
                                    <Input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        required
                                        placeholder="000000"
                                        value={otp}
                                        onChange={(e) => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        className="text-center text-xl tracking-[0.3em] font-mono"
                                        maxLength={6}
                                        startIcon={<KeyRound size={18} />}
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button type="submit" className="w-full py-2.5 text-base font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all" isLoading={isLoading}>
                                        Complete Registration
                                    </Button>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                    >
                                        ← different email
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        disabled={timer > 0}
                                        className={`font-medium ${timer > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-500'}`}
                                    >
                                        {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
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

export default LoginOTP;
