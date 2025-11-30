interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseClasses = "px-2 font-bold text-xl transition-colors duration-300";
    const variantClasses = variant === 'primary'
        ? "bg-mediumBlue text-darkerBlue hover:bg-lightBlue"
        : "bg-lightBlue text-darkerBlue hover:bg-mediumBlue";

    return (
        <button
            className={`${baseClasses} ${variantClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
     );
}
 
export default Button;