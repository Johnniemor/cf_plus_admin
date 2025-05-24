import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

type ButtonVariant =
  | 'success'
  | 'secondary'
  | 'info'
  | 'warning'
  | 'error'
  | 'success-outline'
  | 'secondary-outline'
  | 'info-outline'
  | 'warning-outline'
  | 'error-outline';

type ButtonShape = 'default' | 'rounded' | 'pill';

interface LinkButtonProps extends LinkProps {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  variant = 'success',
  shape = 'rounded',
  icon,
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center py-2.5 px-5 text-center font-medium focus:outline-none transition-colors';

  const variantClasses = {
    success:
      'bg-green-500 text-white hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800',
    'success-outline':
      'border border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900',
    secondary:
      'bg-slate-500 text-white hover:bg-slate-600 dark:bg-slate-700 dark:hover:bg-slate-800',
    'secondary-outline':
      'border border-slate-500 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900',
    info: 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800',
    'info-outline':
      'border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900',
    warning:
      'bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800',
    'warning-outline':
      'border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900',
    error:
      'bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800',
    'error-outline':
      'border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900',
  };

  const shapeClasses = {
    default: '',
    rounded: 'rounded-md',
    pill: 'rounded-full',
  };

  const disabledClasses = disabled ? 'pointer-events-none opacity-50' : '';

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    shapeClasses[shape],
    disabledClasses,
    className,
  ].join(' ');

  return (
    <Link
      to={to}
      className={`${combinedClasses} ${disabled ? 'pointer-events-none' : ''}`}
      {...props}
    >
      {icon && <span className="mr-2.5">{icon}</span>}
      {children}
    </Link>
  );
};

export default LinkButton;
