interface ButtonProps {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ( {
    children
}) => {
    return ( 
        <div className="bg-darkBeige py-2 px-4 text-darkBlue font-bold text-2xl hover:bg-lightBeige transition-colors duration-300">
            {children}
        </div>
     );
}
 
export default Button;