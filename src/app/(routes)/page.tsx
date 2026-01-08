"use client"
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Map } from "lucide-react";

import GoldenBorder from "@/components/ui/GoldenBorder";
import Section from "@/components/ui/Section";
import EventSection from "@/components/EventSection";

import {
  venue,
  homeSection,
  eventSections
} from "@/config/weddingData";

export default function Home() {
  const t = useTranslations('HomePage');
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % homeSection.backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden bg-lightBlue">
      {/* Home */}
      <section id={homeSection.id} className="relative">
        {/* Home Background Slideshow with Kenburns Effect */}
        <div className="absolute top-0 h-[110vh] w-full overflow-hidden">
          {homeSection.backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`w-full h-full absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                src={image}
                alt={`Home Background ${index + 1}`}
                fill
                sizes="100vw"
                quality={85}
                className="object-cover animate-kenburns"
                style={{ objectPosition: '50% 50%' }}
              />
            </div>
          ))}
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/5"></div>
          {/* Top gradient for navbar visibility */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent"></div>
          <div className={`absolute bottom-0 left-0 right-0 h-[10vh] bg-gradient-to-b from-transparent to-lightBlue`}></div>
        </div>

        {/* Hero Content - Centered */}
        <div className="relative h-screen w-full flex flex-col justify-center items-center">
          <div className={`flex flex-col items-center duration-[1500ms] transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Large Centered Names */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-wide text-center mb-8 px-4">
              {t('Names')}
            </h1>

            {/* Date and Location */}
            <p className="text-sm sm:text-base md:text-lg text-white tracking-widest text-center mb-12 px-4">
              {venue.date} · {venue.address.city}, {venue.address.province}
            </p>

            {/* RSVP Button */}
            <Link href="/rsvp">
              <button className="px-8 py-3 border-2 border-white text-white text-sm tracking-widest hover:bg-white hover:text-darkerBlue transition-all duration-300">
                {t('RSVP')}
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom gradient for fade to next section - Outside h-screen */}
        
      </section>

      {/* Invitation Text */}
      <div className="bg-lightBlue pt-48 pb-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-3xl text-darkerBlue font-light leading-relaxed tracking-wide">
            {t('InvitationText')}
          </p>
        </div>
      </div>

      {/* Place */}
      <Section>
        <GoldenBorder title={t('Place')} bg_color="bg-lightBlue">
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
      </Section>

      {/* Ceremony */}
      <Section>
        <GoldenBorder title={t('Ceremony')} bg_color="bg-lightBlue">
          <EventSection section={eventSections[0]} reverse={true} />
          <EventSection section={eventSections[1]} />
          <EventSection section={eventSections[2]} reverse={true} />
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
