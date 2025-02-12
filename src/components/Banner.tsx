"use client"
// components/Banner.tsx
import Link from 'next/link';
import Container from "./ui/Container";
import Button from './ui/Button';
import { FC, useEffect, useState } from 'react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import Logo from "@/src/public/images/Wedding_Logo.png";
import { usePathname } from 'next/navigation';

interface BannerProps {
  // Define any props if needed, for example, for user info or theme preferences
}

const Banner: FC<BannerProps> = () => {
    const pathname = usePathname()
    const isHomePage = pathname === '/';

      const [isVisible, setIsVisible] = useState(false);
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 500); // 1 seconds delay
    
        return () => clearTimeout(timer);
      }, []);

    return (
    <div className={`mx-auto bg-darkBlue ${isHomePage ? '' : 'hidden' } transition-opacity duration-[1500ms] ${ isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Container>
            <h1 className='hidden sm:flex text-5xl text-darkBeige tracking-widest p-2'>
                Marie-Lie & Victor
            </h1>
        </Container>
    </div>
  );
};

export default Banner;