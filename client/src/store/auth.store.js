import { create } from 'zustand';
import authService from '../services/auth.service';

const user = authService.getCurrentUser();

const useAuthStore = create((set) => ({
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',

    reset: () => {
        set({
            isError: false,
            isSuccess: false,
            isLoading: false,
            message: '',
        });
    },

    register: async (user) => {
        set({ isLoading: true, isError: false });
        try {
            const data = await authService.register(user);
            set({ user: data, isLoading: false, isSuccess: true });
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            set({
                user: null,
                isError: true,
                isLoading: false,
                message,
            });
        }
    },

    login: async (user) => {
        set({ isLoading: true, isError: false });
        try {
            const data = await authService.login(user); // Corrected function call
            set({ user: data, isLoading: false, isSuccess: true });
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            set({
                user: null,
                isError: true,
                isLoading: false,
                message,
            });
        }
    },

    logout: () => {
        authService.logout();
        set({ user: null });
    },
}));

export default useAuthStore;
