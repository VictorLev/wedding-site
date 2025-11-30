import Image from "next/image";
import Logo from "@/public/images/Wedding_Logo.png";


interface GoldenBorderProps {
  children: React.ReactNode;
  title: string;
  bg_color: string;
}

const GoldenBorder: React.FC<GoldenBorderProps> = ({ children, title, bg_color }) => {

  return (
    <div className="relative flex flex-col items-center justify-center p-10 z-20">


      {/* Border */}
      <div className="relative border-2 border-mediumBlue p-8 max-w-5xl w-full shadow">
        {/* Title */}
        <div className="absolute inset-x-0 -top-5 h-8 w-full flex justify-center">
          <div className={`${bg_color} px-6`}>
            <h1 className="text-center text-darkerBlue italic text-5xl font-normal mb-4 tracking-[0.3rem]">
              {title}
            </h1>
          </div>
        </div>

        {children}

        {/* Bottom Logo */}
        <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 ${bg_color} px-6`}>
          <Image
            className="object-contain brightness-0 saturate-100"
            style={{ filter: 'invert(20%) sepia(35%) saturate(2000%) hue-rotate(190deg) brightness(90%) contrast(95%)' }}
            width={50}
            priority
            src={Logo}
            alt="Wedding Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default GoldenBorder;
