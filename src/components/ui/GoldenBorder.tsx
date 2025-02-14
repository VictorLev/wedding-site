import Image from 'next/image';
import Logo from "@/src/public/images/Wedding_Logo.png";

interface GoldenBorderProps {
    children: React.ReactNode;
    title: string;
}

const GoldenBorder: React.FC<GoldenBorderProps> = ( {
    children,
    title
}) => {
    return ( 
        <div className="relative flex items-center justify-center p-10">
            {/* Border */}
            <div className="relative border border-darkBeige p-8 max-w-5xl w-full">
                {/* Title */}
                <div className="absolute inset-x-0 -top-4 h-8 w-full flex justify-center">
                    <div className="bg-white px-6">
                    <h1 className="text-center text-darkBeige italic text-3xl font-[500] mb-4 tracking-[0.3rem]">{title}</h1>
                    </div>
                </div>

                {children}

                {/* Bottom Logo */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-6">
                    <Image
                    className="object-contain"
                    width={50}
                    priority
                    src={Logo}
                    alt="Wedding Logo"
                    />
                </div>
            </div>
        </div>
     );
}
 
export default GoldenBorder;