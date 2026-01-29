import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ className, type, label, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={props.id || props.name} className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-100 mb-1.5">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400',
                    className
                )}
                ref={ref}
                {...props}
            />
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
