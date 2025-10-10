interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'neutral' | 'accent';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  className = '',
  ...props
}) => {
  return (
    <button
      {...props}
      className={`btn btn-${variant} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={loading || props.disabled}
    >
      {loading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
};
