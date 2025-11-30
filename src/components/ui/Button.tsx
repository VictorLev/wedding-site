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
        ? "bg-darkBeige text-darkBlue hover:bg-lightBeige"
        : "bg-lightBlue text-darkBlue hover:bg-darkBeige";

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