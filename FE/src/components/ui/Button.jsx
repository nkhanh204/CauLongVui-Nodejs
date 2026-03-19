import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({ className, variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-50',
  };

  return (
    <button
      type={props.type || 'button'}
      className={twMerge(
        'px-4 py-2 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 select-none',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
