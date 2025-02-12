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

  const navItems = ['Home', 'Place', 'Ceremony', 'Reception', 'Accommodations', 'Gifts'];

  return (
    <div className={`sticky top-0 mx-auto p-1 bg-darkBlue transition-opacity duration-[1500ms] ${ isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Container>
        <div className=' flex flex-row justify-between w-full p-1'>
          <Image
            className="object-contain sm:object-cover"
            width={50}
            priority
            src={Logo}
            alt="Wedding Logo"
          />
          <div className='flex justify-center items-center gap-x-6'>
            {navItems.map((item) => (
              <Link key={item} href="/" className="link-container text-darkBeige text-xl">
                {t(item)}
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