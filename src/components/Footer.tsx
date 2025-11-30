// components/Footer.tsx
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import Container from "./ui/Container";
import Image from 'next/image';
import Logo from "@/public/images/Wedding_Logo.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className='bg-darkBlue text-darkBeige w-full'>
      <Container>
        <div className='flex flex-row justify-between w-full p-4'>
          <div className='flex flex-col gap-4 w-56'>
            <p> 
              {t('Made with')} ❤️ {t('by')} Victor Lévesque
              
            </p>
            <div className='flex flex-row gap-2 items-center '>
              Code <Link href="https://github.com/VictorLev/wedding-site" className='text-darkBeige h-6 w-6'>
              <FontAwesomeIcon icon={faSquareGithub} size='lg'/>
              </Link>
            </div>
            <p className='text-sm'>
              &copy; {new Date().getFullYear()} {t('Rights')}
            </p>
          </div>
          <Image
            className="hidden  object-contain sm:block p-1"
            height={150}
            priority
            src={Logo}
            alt="Wedding Logo"
          />
          <div className='flex flex-col gap-2 text-left w-56'>
            <p>{t('Contact')}</p>
            <p className='text-sm'> Victor: </p>
            <p className='text-sm'>{t('emailV')}<br/>{t('phoneV')}</p>
            <p className='text-sm'>Marie-Lie: </p>
            <p className='text-sm'>{t('emailM')}<br/>{t('phoneM')}</p>
          </div>  
        </div>
      </Container>
    </footer>
  );
};