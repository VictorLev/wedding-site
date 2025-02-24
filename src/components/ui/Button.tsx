interface ButtonProps {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ( {
    children
}) => {
    return ( 
        <div className="bg-darkBeige px-2 text-darkBlue font-bold text-xl hover:bg-lightBeige transition-colors duration-300">
            {children}
        </div>
     );
}
 
export default Button;