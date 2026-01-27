import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/auth.store';
import Button from '../ui/Button';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="border-b border-slate-200 bg-white/75 backdrop-blur-lg sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                TalentIQ
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="text-sm font-medium text-slate-700 hidden sm:block">
                                    Hi, {user.name}
                                </span>
                                <Link to="/dashboard">
                                    <Button variant="ghost" size="sm">Dashboard</Button>
                                </Link>
                                <Button variant="outline" size="sm" onClick={onLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">Log in</Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm">Sign up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
