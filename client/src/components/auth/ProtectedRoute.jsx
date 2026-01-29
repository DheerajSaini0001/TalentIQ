import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/auth.store';

const ProtectedRoute = () => {
    const { user } = useAuthStore();
    const location = useLocation();

    if (!user) {
        // Redirect to login but save the attempted location
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
