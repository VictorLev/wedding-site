// components/Navbar.tsx
import Link from 'next/link';
import { FC } from 'react';

interface NavbarProps {
  // Define any props if needed, for example, for user info or theme preferences
}

const Navbar: FC<NavbarProps> = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/" passHref>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about" passHref>
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/contact" passHref>
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;