'use client';

import { useState , useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useMessages } from 'next-intl';
import Faqbg from '@/public/images/faqbg.jpg';
import Container from '@/components/ui/Container';
import Loading from '@/components/ui/Loading';
import { Plus } from 'lucide-react';
import { Minus } from 'lucide-react';

export default function Faq() {
  const t = useTranslations('FaqQuestions');
  const f = useTranslations('FaqPage');
  const messages = useMessages();
  
  const [loading, setLoading] = useState(true);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);


  useEffect(() => {
    if (messages.FaqQuestions) {
      setLoading(false);
    }
  }, [messages]);
  
  const toggleFAQ = (index: number) => {
    setOpenIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  if (loading) {
    return <Loading />;
  }

  const keys = Object.keys(messages.FaqQuestions);

  return (
    <div className='relative bg-lightBlue'>
      {/* Faq Background */}
      <div className="absolute top-0 h-[50vh] w-full overflow-hidden">
        <div className='relative h-full w-full'>
          <Image
            priority
            src={Faqbg}
            alt="FAQ Background"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover object-[50% 50%] opacity-0 animate-fadeIn"
          />
          <div className="absolute bottom-0 h-4 sm:h-[10vh] w-full bg-gradient-to-b from-transparent to-lightBlue"></div>
        </div>
      </div>
      {/* Banner */}
      <div className="relative h-[50vh] w-full ">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-7xl text-white drop-shadow-lg font-light tracking-widest pt-2 text-center">
            {f('title')}
          </h1>
        </div>
      </div>

      <Container>
        {/* FAQ Section */}
        <div className="bg-lightBlue p-4 sm:px-0 sm:py-10 text-left sm:w-3/4">
          {keys.map((key: string, index: number) => (
            <div key={index} className="border-b border-lightBlue py-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center text-lg font-semibold w-full text-left"
              >
                <span className="flex flex-row mr-2 px-1 text-xl">{openIndexes.includes(index) ? <Minus/> : <Plus/>}</span>
                <p>{t(`${key}.question`)}</p>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndexes.includes(index) ? 'max-h-screen' : 'max-h-0'
                }`}
              >
                <p className="px-4 mt-2 text-darkerBlue">{t(`${key}.answer`)}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}