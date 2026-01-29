import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/auth.store';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const { darkmode } = useTheme();

    const onLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Features', path: '/features' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'About', path: '/about' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-500 border-b backdrop-blur-lg
            ${darkmode
                    ? "bg-slate-950/90 border-slate-800 text-slate-200 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)]"
                    : "bg-white border-slate-200 text-slate-900 shadow-sm"
                }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">

                    {/* Left: Logo & Nav Links */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="group flex items-center gap-2">
                            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
                                <span className="text-white font-black text-xl">T</span>
                            </div>
                            <span
                                className="text-2xl font-black tracking-tight bg-clip-text text-transparent
                                bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900
                                dark:from-white dark:via-blue-400 dark:to-white"
                            >
                                TalentIQ
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                                    ${isActive(link.path)
                                            ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20"
                                            : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <ThemeToggle />

                        <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-800" />

                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden lg:flex flex-col items-end">
                                    <span className="text-xs text-slate-500 dark:text-slate-400">Welcome back,</span>
                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{user.name}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link to="/dashboard">
                                        <Button variant="ghost" size="sm" className="font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                            Dashboard
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white dark:hover:bg-red-500/20 transition-all font-bold"
                                        onClick={onLogout}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="hidden xs:block">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        Log in
                                    </Button>
                                </Link>

                                <Link to="/register">
                                    <Button
                                        size="sm"
                                        className="bg-slate-900 dark:bg-blue-600 text-white hover:bg-slate-800 dark:hover:bg-blue-700 font-bold px-6 rounded-xl shadow-lg shadow-blue-900/10 transition-all active:scale-95"
                                    >
                                        Sign up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
