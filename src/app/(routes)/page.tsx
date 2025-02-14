"use client"
import Image from "next/image";
import {useTranslations} from 'next-intl';
import bgHome from "@/src/public/images/home.jpg";
import Container from "@/src/components/ui/Container";
import Manoir from "@/src/public/images/manoir.png";
import Logo from "@/src/public/images/Wedding_Logo.png";
import GoldenBorder from "@/src/components/ui/GoldenBorder";
import { Map  } from "lucide-react";
import { FC, useEffect, useState } from 'react';

export default function Home() {
  const t = useTranslations('HomePage');
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // 1 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Home Background */}
      <section id="home">
        <div id="home" className="absolute top-0 h-[125vh] w-full -z-10 overflow-hidden">
          <Image 
            priority
            src={bgHome} 
            alt="Home Background" 
            className="object-cover object-[50%_30%] w-full h-full" 
          />
          <div className="absolute bottom-0 h-[25vh] w-full bg-gradient-to-b from-transparent to-white"></div>
        </div>
        
        <div className="relative h-[calc(125vh-theme(height.14)-theme(height.14))] w-full ">
          <div className="flex flex-col justify-center items-center h-full">
            <div className={`flex flex-col justify-center items-center py-2 bg-white/50 duration-[1500ms] ${ isVisible ? 'opacity-100  w-full' : 'opacity-0'}`}>
              <p className="text-5xl text-darkBlue font-light tracking-widest pt-2">
                {t('subtitle')}
              </p>
              <p className="text-2xl text-darkBlue font-light tracking-widest pt-2">
                {t('date')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Place */}
      <Container>
        <section id="place" className="my-16 mb-96">
          <GoldenBorder title={t('Place')}>
            {/* Content Grid */}
            <div className="grid grid-cols-2 gap-8">
              {/* Image */}
              <div className="flex justify-center p-6">
                <Image
                  src={Manoir.src}
                  alt="Manoir Davis"
                  width={500}
                  height={300}
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Text */}
              <div className="text-center flex flex-col justify-center">
                <h2 className="text-2xl font-bold">Manoir Davis</h2>
                <p className="mt-2 text-sm">25 septembre 2026</p>
                <p className="mt-4 font-semibold">
                  92 Chemin Sir-Mortimer-B.-Davis, <br />
                  Sainte-Agathe-des-Monts, <br />
                  Quebec, Canada, <br />
                  J8C 2Z7
                </p>
                <a href="https://maps.app.goo.gl/UYw39rgTqq9ALXDn7" target="_blank" rel="noopener noreferrer" className="mt-4 flex flex-row justify-center">
                  Maps <Map />
                </a>
              </div>
            </div>
          </GoldenBorder>
        </section>
      </Container>

    </div>
  );
}
