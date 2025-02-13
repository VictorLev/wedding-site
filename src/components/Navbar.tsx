'use client'
// components/Navbar.tsx
import Link from 'next/link';
import Container from "./ui/Container";
import Button from './ui/Button';
import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Logo from "@/src/public/images/Wedding_Logo.png";
import { usePathname } from 'next/navigation';
import Banner from './Banner';

interface NavbarProps {
  // Define any props if needed, for example, for user info or theme preferences
}

const Navbar: FC<NavbarProps> = () => {
  const t = useTranslations('Navbar');


  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // 1 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Place', href: '#place' },
    { name: 'Ceremony', href: '#ceremony' },
    { name: 'Reception', href: '#reception' },
    { name: 'Accommodations', href: '#accommodations' },
    { name: 'Gifts', href: '#gifts' },
  ];
  return (
    <div className={`sticky top-0 z-10 mx-auto p-1 bg-darkBlue transition-opacity duration-[1500ms] ${ isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Container>
        <div className=' flex flex-row justify-between w-full px-1 h-14'>
          <Image
            className="object-contain sm:object-cover"
            width={50}
            priority
            src={Logo}
            alt="Wedding Logo"
          />
          <div className='flex justify-center items-center gap-x-6'>
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="link-container text-darkBeige text-xl">
                {t(item.name)}
              </Link>
            ))}
          </div>
          <div className='flex justify-center items-center gap-x-6'>
            <Link href="/" className="">
                <p className="link-container text-darkBeige text-xl">
                    {t('Faq')}
                </p>
            </Link>
            <Link href="/" className="">
              <Button>
                {t('Rsvp')}
              </Button>  
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;