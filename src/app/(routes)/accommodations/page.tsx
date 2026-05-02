'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useMessages } from 'next-intl';
import { MapPin, ExternalLink, Navigation, Landmark } from 'lucide-react';
import AccommodationBg from '@/public/images/accommodation.jpeg';
import StoneHavenImg from '@/public/images/accommodations/StoneHaven.png';
import ClairMontImg from '@/public/images/accommodations/ClairMont.jpg';
import Super8Img from '@/public/images/accommodations/Super8.png';
import WatelImg from '@/public/images/accommodations/Watel.jpg';
import Container from '@/components/ui/Container';
import Loading from '@/components/ui/Loading';
import { StaticImageData } from 'next/image';

interface Accommodation {
  name: string;
  description: string;
  distance: string;
  image: StaticImageData;
  website: string;
}

const accommodationData: Record<string, { image: StaticImageData; website: string }> = {
  StoneHaven: { image: StoneHavenImg, website: 'https://www.stonehavenlemanoir.com/' },
  ClairMont: { image: ClairMontImg, website: 'https://www.motelclair-mont.com/' },
  Super8: { image: Super8Img, website: 'https://www.super8steagathe.com/' },
  Watel: { image: WatelImg, website: 'https://hotelspawatel.com/' },
};

const mapLocations = [
  { name: 'Manoir Davis', label: 'Reception', address: '92 Chemin Sir-Mortimer-B.-Davis', mapsUrl: 'https://maps.app.goo.gl/UYw39rgTqq9ALXDn7', isVenue: true },
  { name: 'StoneHaven Le Manoir', label: 'StoneHaven', address: '40 chemin du Lac-des-Sables', mapsUrl: 'https://maps.google.com/maps?q=StoneHaven+Le+Manoir+Sainte-Agathe-des-Monts' },
  { name: 'Motel Clair-Mont', label: 'Clair-Mont', address: '1591 rue Principale', mapsUrl: 'https://maps.google.com/maps?q=Motel+Clair-Mont+Sainte-Agathe-des-Monts' },
  { name: 'Super 8', label: 'Super 8', address: '500 rue Léonard', mapsUrl: 'https://maps.google.com/maps?q=Super+8+Sainte-Agathe-des-Monts' },
  { name: 'Hôtel Spa Watel', label: 'Spa Watel', address: '250 rue Saint-Venant', mapsUrl: 'https://maps.google.com/maps?q=Hotel+Spa+Watel+Sainte-Agathe-des-Monts' },
];

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
    image: accommodationData[key]?.image,
    website: accommodationData[key]?.website ?? '#',
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
          <div className="absolute inset-0 bg-black/10"></div>
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
        <div className="px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {accommodations.map((accommodation, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={accommodation.image}
                    alt={accommodation.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
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

                  <a
                    href={accommodation.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-darkerBlue text-white rounded hover:bg-blue transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('viewWebsite')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Map Section */}
      <Container>
        <div className="px-10 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps?q=Manoir+Davis,+92+Chemin+Sir-Mortimer-B.-Davis,+Sainte-Agathe-des-Monts,+QC&z=13&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map - Venue and Accommodations"
              />
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mapLocations.map((location) => (
                <a
                  key={location.name}
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  {location.isVenue
                    ? <Landmark className="w-5 h-5 mt-0.5 shrink-0 text-darkerBlue" />
                    : <Navigation className="w-5 h-5 mt-0.5 shrink-0 text-mediumBlue" />
                  }
                  <div>
                    <p className={`font-semibold ${location.isVenue ? 'text-darkerBlue' : 'text-darkBlue'}`}>
                      {location.label}
                      {location.isVenue && <span className="ml-2 text-xs font-normal bg-darkerBlue text-white px-2 py-0.5 rounded-full">{t('venue')}</span>}
                    </p>
                    <p className="text-sm text-gray-500">{location.address}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
