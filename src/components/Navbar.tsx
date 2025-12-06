'use client';

import Link from 'next/link';
import Container from "./ui/Container";
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const h = useTranslations('HomePage');
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/' || (pathname && pathname.startsWith('/#'));
  const isFaqPage = pathname?.includes('/faq');
  const isStoryPage = pathname?.includes('/story');
  const isAccommodationsPage = pathname?.includes('/accommodations');

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOnHomeSection, setIsOnHomeSection] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { name: 'Wedding', href: '' },
    { name: 'Story', href: 'story' },
    { name: 'Accommodations', href: 'accommodations' }
  ];

  // Intersection Observer to detect if home section is in view
  useEffect(() => {
    if (!isHomePage) {
      setIsOnHomeSection(false);
      return;
    }

    const homeSection = document.querySelector('#home');
    if (!homeSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set to true if home section is visible (even partially)
          setIsOnHomeSection(entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: '-80px 0px 0px 0px' // Account for navbar height
      }
    );

    observer.observe(homeSection);

    return () => observer.disconnect();
  }, [isHomePage, pathname]);

  // Scroll detection for navbar hide/show
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (scrollPosition > lastScrollY && scrollPosition > 100) {
        // Scrolling down
        setIsNavbarVisible(false);
      } else {
        // Scrolling up
        setIsNavbarVisible(true);
      }

      setLastScrollY(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, lastScrollY]);


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
    router.push(`/${href}`);
    toggleMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Determine text color based on whether we're viewing the home section
  const textColor = isHomePage && isOnHomeSection ? 'text-white' : 'text-darkerBlue';
  const bgColor = isHomePage && isOnHomeSection ? 'bg-transparent' : 'bg-lightBlue';

  return (
    <div
      className={`${isHomePage ? 'fixed' : 'sticky'} top-0 w-full z-40 ${bgColor} transition-all duration-500
        ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <Container>
        <div className="flex flex-row justify-between items-center w-full py-6 px-4">
          {/* Left Side - Names/Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h2 className={`text-xl sm:text-2xl ${textColor} font-light tracking-wide transition-colors duration-500`}>
                {h('Names')}
              </h2>
            </Link>
          </div>

          {/* Right Side - Desktop Navigation */}
          <div className="hidden md:flex items-center gap-x-6">
            {navItems.filter(item => item.name !== 'Home').map((item) => {
              const isActive =
                item.name === 'Story' ? isStoryPage :
                item.name === 'Accommodations' ? isAccommodationsPage :
                (item.name === 'Wedding' && isHomePage);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`${textColor} link-container ${isActive ? 'active' : ''} text-sm tracking-wide transition-all duration-500`}
                >
                  {t(item.name)}
                </Link>
              );
            })}
            <Link href="/faq">
              <p className={`${textColor} link-container ${isFaqPage ? 'active' : ''} text-sm tracking-wide transition-all duration-500`}>
                {t('Faq')}
              </p>
            </Link>
            <Link href="/rsvp">
              <button className={`px-6 py-2 ${isHomePage && isOnHomeSection ? 'border-white text-white hover:bg-white hover:text-darkerBlue' : 'border-darkerBlue text-darkerBlue hover:bg-darkerBlue hover:text-white'} border-2 text-sm tracking-wide transition-all duration-500`}>
                {t('Rsvp')}
              </button>
            </Link>
            <LocaleSwitcher textColor={textColor} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`${textColor} focus:outline-none transition-colors duration-500`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu - Full Page Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#CEE0F1', minHeight: '100vh', width: '100vw' }}
      >
        <Container>
          <div className="flex flex-row justify-between items-center w-full py-6 px-4">
            {/* Left Side - Names/Logo */}
            <div className="flex items-center">
              <Link href="/" onClick={toggleMenu}>
                <h2 className="text-xl sm:text-2xl text-darkerBlue font-light tracking-wide">
                  {h('Names')}
                </h2>
              </Link>
            </div>

            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className="text-darkerBlue focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </Container>

        {/* Menu Items */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] space-y-8">
          {navItems.map((item, index) => {
            const isActive =
              item.name === 'Story' ? isStoryPage :
              item.name === 'Accommodations' ? isAccommodationsPage :
              (item.name === 'Wedding' && isHomePage);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-darkerBlue link-container ${isActive ? 'active' : ''} text-2xl tracking-wide transition-all duration-300 hover:scale-110`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {t(item.name)}
              </Link>
            );
          })}
          <Link href="/faq" onClick={toggleMenu}>
            <p className={`text-darkerBlue link-container ${isFaqPage ? 'active' : ''} text-2xl tracking-wide transition-all duration-300 hover:scale-110`}>
              {t('Faq')}
            </p>
          </Link>
          <Link href="/rsvp" onClick={toggleMenu}>
            <button className="px-8 py-3 border-2 border-darkerBlue text-darkerBlue text-lg tracking-wide hover:bg-darkerBlue hover:text-white transition-all duration-300">
              {t('Rsvp')}
            </button>
          </Link>
          <LocaleSwitcher textColor="text-darkerBlue" />
        </div>
      </div>
    </div>
  );
};

