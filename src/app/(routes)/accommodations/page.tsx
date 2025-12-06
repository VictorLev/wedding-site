'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useMessages } from 'next-intl';
import { MapPin, ExternalLink } from 'lucide-react';
import AccommodationBg from '@/public/images/accommodation.jpeg';
import Container from '@/components/ui/Container';
import Loading from '@/components/ui/Loading';

interface Accommodation {
  name: string;
  description: string;
  distance: string;
}

export default function Accommodations() {
  const t = useTranslations('AccommodationsPage');
  const tAccommodations = useTranslations('Accommodations');
  const messages = useMessages();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (messages.AccommodationsPage) {
      setLoading(false);
    }
  }, [messages]);

  if (loading) {
    return <Loading />;
  }

  const accommodationKeys = Object.keys(messages.Accommodations || {});
  const accommodations: Accommodation[] = accommodationKeys.map((key) => ({
    name: tAccommodations(`${key}.name`),
    description: tAccommodations(`${key}.description`),
    distance: tAccommodations(`${key}.distance`),
  }));

  return (
    <div className="relative bg-lightBlue min-h-screen">
      {/* Background Image */}
      <div className="absolute top-0 h-[50vh] w-full overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            priority
            src={AccommodationBg}
            alt="Accommodation Background"
            className="object-cover object-[50% 50%] w-full h-full opacity-0 animate-fadeIn"
          />
          <div className="absolute bottom-0 h-4 sm:h-[5vh] w-full bg-gradient-to-b from-transparent to-lightBlue"></div>
        </div>
      </div>

      {/* Header / Banner */}
      <div className="relative h-[50vh] w-full">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-7xl text-white drop-shadow-lg font-light tracking-widest pt-2 text-center mb-4 px-4">
            {t('title')}
          </h1>
        </div>
      </div>

      {/* Subtitle */}
      <Container>
        <div className="bg-lightBlue py-10 text-center">
          <p className="text-lg text-darkerBlue max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </Container>

      {/* Accommodations Grid */}
      <Container>
        <div className="pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {accommodations.map((accommodation, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Placeholder */}
                <div className="w-full h-64 bg-gradient-to-br from-mediumBlue to-blue relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-2xl font-light opacity-50">
                      {accommodation.name}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-darkerBlue mb-3">
                    {accommodation.name}
                  </h2>

                  <div className="flex items-center text-darkBlue mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{accommodation.distance}</span>
                  </div>

                  <p className="text-darkerBlue mb-6 leading-relaxed">
                    {accommodation.description}
                  </p>

                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-darkerBlue text-white rounded hover:bg-blue transition-colors duration-300">
                    <ExternalLink className="w-4 h-4" />
                    {t('viewWebsite')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
