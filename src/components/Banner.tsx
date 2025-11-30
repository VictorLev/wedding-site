"use client"
// components/Banner.tsx
import Container from "./ui/Container";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Banner() {
  const pathname = usePathname()
  const isHomePage = pathname === '/' || pathname === '/#home';

    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500); // 1 seconds delay
  
      return () => clearTimeout(timer);
    }, []);

  return (
    <div className={`mx-auto bg-darkBlue ${isHomePage ? '' : 'hidden' } transition-all duration-[500ms] ${ isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Container>
        <h1 className='hidden sm:flex text-5xl text-darkBeige tracking-widest px-2 pt-2 h-14'>
          Marie-Lie & Victor
        </h1>
      </Container>
    </div>
  );
};