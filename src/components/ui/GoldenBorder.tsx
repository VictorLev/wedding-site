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
            style={{ filter: 'brightness(0) saturate(100%) invert(82%) sepia(23%) saturate(300%) hue-rotate(170deg) brightness(89%) contrast(90%)' }}
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
