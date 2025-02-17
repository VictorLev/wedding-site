'use client';

import Link from 'next/link';
import Container from "./ui/Container";
import Button from './ui/Button';
import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Logo from "@/src/public/images/Wedding_Logo.png";
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/' || (pathname && pathname.startsWith('/#'));
  const isFaqPage = pathname === '/faq';

  const [activeSection, setActiveSection] = useState('');
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const isMouseOver = useRef(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Place', href: '#place' },
    { name: 'Ceremony', href: '#ceremony' },
    { name: 'Reception', href: '#reception' },
    { name: 'Accommodations', href: '#accommodations' },
    { name: 'Gifts', href: '#gifts' },
  ];

  // Initial fade-in effect on homepage
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHomePage) {
      timer = setTimeout(() => setIsNavbarVisible(true), 500);
    } else {
      setIsNavbarVisible(true);
    }
    return () => clearTimeout(timer);
  }, [isHomePage]);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (isMouseOver.current) return; // Don't hide navbar if hovered

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsNavbarVisible(false); // Hide on scroll down
      } else {
        setIsNavbarVisible(true); // Show on scroll up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    setActiveSection(''); // Reset on route change
    if (!isHomePage) return;

    const sections = document.querySelectorAll('section');
    if (!sections.length) return;

    const observerRef = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0, rootMargin: '-40% 0px -60% 0px' }
    );

    sections.forEach((section) => observerRef.observe(section));

    return () => observerRef.disconnect();
  }, [pathname, isHomePage]);

  // Handle smooth scrolling on page load
  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isHomePage) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/${href}`);
    }
    toggleMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`sticky top-0 w-full z-40 bg-darkBlue transition-all duration-[500ms]
        ${isNavbarVisible ? 'opacity-100' : 'opacity-0'}
      `}
      onMouseEnter={() => {
        isMouseOver.current = true;
        setIsNavbarVisible(true);
      }}
      onMouseLeave={() => {
        isMouseOver.current = false;
        if (window.scrollY > 50) setIsNavbarVisible(false);
      }}
    >
      <Container>
        <div className="flex flex-row justify-between w-full px-1 h-14">
          <div className='w-1/4'>
            <Link href={isHomePage ? '/#home' : "/"} onClick={toggleMenu}>
              <Image
                className="object-contain sm:object-cover p-1"
                width={50}
                priority
                src={Logo}
                alt="Wedding Logo"
              />
            </Link>
          </div>
          <div className="hidden md:flex md:w-1/2 justify-center items-center gap-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={isHomePage ? item.href : `/${item.href}`}
                onClick={isHomePage ? (e) => handleNavClick(e, item.href) : undefined}
                className={`link-container text-darkBeige text-xl ${
                  activeSection === item.href.substring(1) ? 'font-bold' : 'font-normal'
                }`}
              >
                {t(item.name)}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex md:w-1/4 justify-end items-center gap-x-4 relative">
            <LocaleSwitcher />
            <Link href="/faq">
              <p className={`link-container text-darkBeige text-xl ${isFaqPage ? 'font-bold' : 'font-normal'}`}>
                {t('Faq')}
              </p>
            </Link>
            <Link href="/rsvp">
              <Button>{t('Rsvp')}</Button>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-darkBeige focus:outline-none">
              {isMenuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </Container>
      {isMenuOpen && (
        <div className="md:hidden bg-darkBlue text-darkBeige absolute top-14 right-0 w-full h-screen z-20">
          <div className="flex flex-col items-center space-y-6 mt-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={isHomePage ? item.href : `/${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-xl"
              >
                {t(item.name)}
              </Link>
            ))}
            <LocaleSwitcher />
            <Link href="/faq" onClick={toggleMenu}>
              <p className={`text-xl ${isFaqPage ? 'font-bold' : 'font-normal'}`}>
                {t('Faq')}
              </p>
            </Link>
            <Link href="/rsvp" onClick={toggleMenu}>
              <Button>{t('Rsvp')}</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

