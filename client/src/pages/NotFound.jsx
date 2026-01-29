import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound = () => {
    return (
        <div className="bg-slate-50 min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">

                {/* Animated 404 Visual */}
                <div className="relative mb-8">
                    <h1 className="text-9xl font-extrabold text-slate-900 tracking-widest">
                        4<span className="text-blue-600">0</span>4
                    </h1>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-100 px-2 rounded rotate-12">
                        <span className="text-sm font-bold text-blue-800 uppercase tracking-widest">Page Not Found</span>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Oops! Look like you're lost.
                </h2>
                <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/">
                        <Button className="w-full sm:w-auto">
                            <Home className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NotFound;
