import React from 'react';
import PropTypes from 'prop-types';

export type ButtonVariant =
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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  variant = 'success',
  shape = 'rounded',
  icon,
  children,
  className = '',
  disabled = false,
  type = 'button',
  loading = false,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center py-2.5 px-5 text-center font-medium focus:outline-none transition-colors';

  const variantClasses = {
    success:
      'translate-all inline-flex cursor-pointer items-center justify-center rounded bg-primary px-4 py-2 text-center font-medium text-white outline-none duration-150 ease-linear hover:bg-opacity-90 hover:shadow-lg focus:outline-none active:bg-[#1A37A7]',
    // 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800',
    'success-outline': 'border border-green-500 text-green-500 hover:bg-green-500 dark:hover:bg-green-900',
    secondary: 'text-slate-700 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white',
    'secondary-outline': 'border border-slate-500 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900',
    info: 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800',
    'info-outline': 'border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800',
    'warning-outline': 'border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900',
    error: 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800',
    'error-outline': 'border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900',
  };

  const shapeClasses = {
    default: '',
    rounded: 'rounded-lg',
    pill: 'rounded-full',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const combinedClasses = [baseClasses, variantClasses[variant], shapeClasses[shape], disabledClasses, className].join(
    ' ',
  );

  return (
    <button type={type} onClick={onClick} className={combinedClasses} disabled={disabled} {...props}>
      {icon && <span className="mr-2.5">{icon}</span>}
      {loading ? 'Loading...' : children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    'success',
    'secondary',
    'info',
    'warning',
    'error',
    'success-outline',
    'secondary-outline',
    'info-outline',
    'warning-outline',
    'error-outline',
  ]),
  shape: PropTypes.oneOf(['default', 'rounded', 'pill']),
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
};

export default Button;
