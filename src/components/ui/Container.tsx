interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <div
            className={`flex flex-col items-center justify-center max-w-[96rem] mx-auto ${className}`}
            {...props}
        >
            {children}
        </div>
     );
}
 
export default Container;