import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth.store';
import Button from '../components/ui/Button';

const Dashboard = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className='p-10'>
            <h1 className='text-3xl mb-5'>Welcome, {user && user.name}</h1>
            <p className='mb-5'>This is your dashboard.</p>
            <Button onClick={onLogout} variant="danger">Logout</Button>
        </div>
    );
};

export default Dashboard;
