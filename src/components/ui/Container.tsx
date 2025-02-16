interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ( {
    children
}) => {
    return ( 
        <div className={`flex flex-col items-center justify-center max-w-[96rem] mx-auto`}>
            {children}
        </div>
     );
}
 
export default Container;