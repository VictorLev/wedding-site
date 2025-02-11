// components/Navbar.tsx
import Link from 'next/link';
import { FC } from 'react';
import {useTranslations} from 'next-intl';

interface NavbarProps {
  // Define any props if needed, for example, for user info or theme preferences
}

const Navbar: FC<NavbarProps> = () => {
  const t = useTranslations('Navbar');
  return (
    <nav>
      {t('title')}
    </nav>
  );
};

export default Navbar;