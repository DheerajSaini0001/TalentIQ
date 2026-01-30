import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Eye, EyeOff } from 'lucide-react';

const Input = React.forwardRef(({ className, type, label, startIcon, endIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="w-full relative group">
            {label && (
                <label htmlFor={props.id || props.name} className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300 mb-1.5 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                    {label}
                </label>
            )}
            <div className="relative">
                {startIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-blue-500 transition-colors">
                        {startIcon}
                    </div>
                )}

                <input
                    type={inputType}
                    className={cn(
                        'flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white transition-all duration-200',
                        'placeholder:text-slate-400 dark:placeholder:text-slate-500',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 dark:focus-visible:ring-blue-400/20 dark:focus-visible:border-blue-400',
                        'hover:border-slate-300 dark:hover:border-slate-700',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'text-slate-900 dark:text-slate-100',
                        startIcon && 'pl-10',
                        (isPassword || endIcon) && 'pr-10',
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {isPassword ? (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                ) : endIcon ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        {endIcon}
                    </div>
                ) : null}
            </div>
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
