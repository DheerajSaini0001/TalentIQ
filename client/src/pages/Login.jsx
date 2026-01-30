import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/auth.store';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { toast } from 'react-hot-toast'; // We might need to add this
import { useTheme } from '../context/ThemeContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const { login, isLoading, isError, isSuccess, message, user, reset } = useAuthStore();
    const { darkmode } = useTheme();

    const { email, password } = formData;

    const location = useLocation(); // Add hook
    const from = location.state?.from?.pathname || '/dashboard';

    useEffect(() => {
        if (isError) {
            // toast.error(message);
            alert(message); // Temporary fallback
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
        <div className={`flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-500 ${darkmode ? "bg-slate-950" : "bg-slate-50"}`}>
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 p-8 shadow-xl rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-300">
                <div className="text-center">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        TalentIQ
                    </h1>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Or{' '}
                        <Link to="/register" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                            create a new account
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="-space-y-px rounded-md">
                        <div className='mb-4'>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email address"
                                value={email}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
