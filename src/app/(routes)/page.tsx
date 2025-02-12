import Image from "next/image";
import {useTranslations} from 'next-intl';
import bgHome from "@/src/public/images/home.jpg";
import Container from "@/src/components/ui/Container";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div className="overflow-x-hidden">
      <div className="absolute top-0 h-[125vh] w-full -z-10 overflow-hidden">
        <Image 
          priority
          src={bgHome} 
          alt="Home Background" 
          className="object-cover object-[50%_60%] w-full h-full" 
        />
        <div className="absolute bottom-0 h-[25vh] w-full bg-gradient-to-b from-transparent to-white"></div>
      </div>
      
      <div className="relative h-screen w-screen mt-[100vh]">
        <Container>
          Test
        </Container>
      </div>
    </div>
  );
}
