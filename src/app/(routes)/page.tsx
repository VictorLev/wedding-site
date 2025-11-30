"use client"
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Map } from "lucide-react";

import GoldenBorder from "@/components/ui/GoldenBorder";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import EventSection from "@/components/EventSection";
import AccommodationCard from "@/components/AccommodationCard";

import {
  venue,
  homeSection,
  eventSections,
  accommodations,
  giftsSection
} from "@/config/weddingData";

export default function Home() {
  const t = useTranslations('HomePage');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Home */}
      <section id={homeSection.id}>
        {/* Home Background */}
        <div className="absolute top-0 h-[125vh] w-full -z-10 overflow-hidden">
          <Image
            priority
            src={homeSection.backgroundImage}
            alt="Home Background"
            className="object-cover object-[50%_30%] w-full h-full opacity-0 animate-fadeIn"
          />
          <div className="absolute bottom-0 h-12 sm:h-[25vh] w-full bg-gradient-to-b from-transparent to-white"></div>
        </div>
        {/* Banner */}
        <div className="relative h-[125vh] w-full">
          <div className="flex flex-col justify-center items-center h-full">
            <div className={`flex flex-col justify-center items-center py-2 bg-white/50 duration-[1500ms] ${isVisible ? 'opacity-100 w-full' : 'opacity-0'}`}>
              <p className="text-5xl text-darkBlue font-light tracking-widest text-center pt-2">
                {t('subtitle')}
              </p>
              <p className="text-2xl text-darkBlue font-light tracking-widest pt-2">
                {t('date')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Place */}
      <Section id="place" bgColor="bg-white" nextBgColor="bg-lightBlue" decorativeVariant="place">
        <GoldenBorder title={t('Place')} bg_color="bg-white">
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
            {/* Image */}
            <div className="flex justify-center p-6">
              <Image
                src={venue.image}
                alt={venue.name}
                width={500}
                height={300}
                className="object-cover object-center"
                priority
              />
            </div>
            {/* Text */}
            <div className="text-center flex flex-col justify-center">
              <h2 className="text-2xl font-bold">{venue.name}</h2>
              <p className="mt-2 text-sm">{venue.date}</p>
              <p className="mt-4 font-semibold">
                {venue.address.street}, <br />
                {venue.address.city}, <br />
                {venue.address.province}, {venue.address.country}, <br />
                {venue.address.postalCode}
              </p>
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex flex-row justify-center"
                aria-label={`View ${venue.name} on Google Maps`}
              >
                Maps <Map />
              </a>
            </div>
          </div>
        </GoldenBorder>
        <div className="relative flex justify-center mt-4 z-20">
          <Link href="/rsvp">
            <Button>{t('RSVP')}</Button>
          </Link>
        </div>
      </Section>

      {/* Ceremony */}
      <Section id="ceremony" bgColor="bg-lightBlue" nextBgColor="bg-white" decorativeVariant="ceremony">
        <EventSection section={eventSections[0]} reverse={true} />
      </Section>

      {/* Reception */}
      <Section id="reception" bgColor="bg-white" nextBgColor="bg-lightBlue" decorativeVariant="reception">
        <EventSection section={eventSections[1]} />
      </Section>

      {/* Accommodations */}
      <Section id="accommodations" bgColor="bg-lightBlue" nextBgColor="bg-white" decorativeVariant="accommodations">
        <GoldenBorder title={t('Accommodations')} bg_color="bg-lightBlue">
          {accommodations.map((accommodation) => (
            <AccommodationCard key={accommodation.id} accommodation={accommodation} />
          ))}
        </GoldenBorder>
      </Section>

      {/* Gifts */}
      <Section id={giftsSection.id} bgColor={giftsSection.bgColor} decorativeVariant="gifts">
        <GoldenBorder title={t(giftsSection.titleKey)} bg_color={giftsSection.bgColor}>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
            {/* Icon */}
            <div className="text-center flex flex-col justify-center items-center text-darkBlue">
              <Image
                src={giftsSection.icon}
                alt={giftsSection.iconAlt}
                width={300}
                height={300}
                className="object-cover object-center text-darkBlue rounded"
                priority
              />
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center p-6 text-center">
              <h2 className="text-xl font-bold">{t(giftsSection.descriptionKey)}</h2>
              <div>{t(giftsSection.descriptionKey)}</div>
            </div>
          </div>
        </GoldenBorder>
      </Section>

      <div className='relative flex flex-col text-center justify-center items-center w-2/3 py-4 mx-auto mb-12'>
        <p className='text-2xl p-2'>
          {t('SweetMessage')}
        </p>
        <h1 className='text-4xl'>
          {t('Names')}
        </h1>
      </div>
    </div>
  );
}
