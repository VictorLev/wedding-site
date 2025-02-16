"use client"
import Image from "next/image";
import {useTranslations} from 'next-intl';
import bgHome from "@/src/public/images/home.jpg";
import Container from "@/src/components/ui/Container";
import Manoir from "@/src/public/images/manoir.png";
import GoldenBorder from "@/src/components/ui/GoldenBorder";
import { Map  } from "lucide-react";
import { FC, useEffect, useState } from 'react';
import Leaf from "@/src/public/images/leaf.svg";
import Ring from "@/src/public/images/ring.png";
import Cake from "@/src/public/images/wedding-cake.png";
import StoneHaven from "@/src/public/images/accomodations/StoneHaven.png";
import Super8 from "@/src/public/images/accomodations/Super8.png";
import Gift from "@/src/public/images/gift.png";
import Button from "@/src/components/ui/Button";
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('HomePage');
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // 1 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Home */}
      <section id="home">
        {/* Home Background */}
        <div id="home" className="absolute top-0 h-[125vh] w-full -z-10 overflow-hidden">
          <Image 
            priority
            src={bgHome} 
            alt="Home Background" 
            className="object-cover object-[50%_30%] w-full h-full opacity-0 animate-fadeIn" 
          />
          <div className="absolute bottom-0 h-12 sm:h-[25vh] w-full bg-gradient-to-b from-transparent to-white"></div>
        </div>
        {/* Banner */}
        <div className="relative h-[125vh] w-full ">
          <div className="flex flex-col justify-center items-center h-full">
            <div className={`flex flex-col justify-center items-center py-2 bg-white/50 duration-[1500ms] ${ isVisible ? 'opacity-100  w-full' : 'opacity-0'}`}>
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
      <section id="place" className="relative bg-white">
        <Container>
          <div className="relative mb-8 pb-10">
            {/* Scattered Leaf Background */}
            <div className="absolute inset-0 opacity-[0.04] z-10">
              {/* Randomly positioned and rotated leaves */}
              <Image
                src={Leaf}
                alt="Decorative Leaf"
                className="absolute top-10 -left-48 w-96 "
              />
              <Image
                src={Leaf}
                alt="Decorative Leaf"
                className="absolute top-2/3 -right-48 w-96 rotate-90 scale-x-[-1]"
              />
            </div>
            <GoldenBorder title={t('Place')} bg_color="bg-white" rotation="rotate-0">
              {/* Content Grid */}
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
                {/* Image */}
                <div className="flex justify-center p-6">
                  <Image
                    src={Manoir.src}
                    alt="Manoir Davis"
                    width={500}
                    height={300}
                    className="object-cover object-center"
                    priority
                  />
                </div>
                {/* Text */}
                <div className="text-center flex flex-col justify-center">
                  <h2 className="text-2xl font-bold">Manoir Davis</h2>
                  <p className="mt-2 text-sm">25 septembre 2026</p>
                  <p className="mt-4 font-semibold">
                    92 Chemin Sir-Mortimer-B.-Davis, <br />
                    Sainte-Agathe-des-Monts, <br />
                    Quebec, Canada, <br />
                    J8C 2Z7
                  </p>
                  <a href="https://maps.app.goo.gl/UYw39rgTqq9ALXDn7" target="_blank" rel="noopener noreferrer" className="mt-4 flex flex-row justify-center">
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
          </div>
          <div className="absolute bottom-0 w-full h-2 bg-gradient-to-b from-transparent to-lightBlue"></div>
        </Container>
      </section>
      
      {/* Ceremony */}
      <section id="ceremony" className="relative bg-lightBlue">
        <Container >
          <div className=" relative my-8 py-10">
            {/* Scattered Leaf Background */}
            <div className="absolute inset-0 opacity-[0.04] z-10">
              <Image
                src={Leaf}
                alt="Decorative Leaf"
                className="absolute top-0 -left-48 w-96 rotate-90"
              />
              <Image
                src={Leaf}
                alt="Decorative Leaf"
                className="absolute top-3/4 -right-48 w-96 rotate-180 scale-x-[-1]"
              />
            </div>   
            <GoldenBorder title={t('Ceremony')} bg_color="bg-lightBlue" >
              {/* Content Grid */}
              <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-8">
                {/* Text */}
                <div className="flex flex-col justify-center p-6 text-center">
                <h2 className="text-xl font-bold">Lorem Ipsum</h2>
                  <div>
                    {t('Lorem Ipsum')}
                  </div>
                </div>
                {/* Emoji */}
                <div className="text-center flex flex-col justify-center items-center">
                  <Image
                    src={Ring.src}
                    alt="Ring emoji"
                    width={200}
                    height={200}
                    className="object-cover object-center text-darkBlue"
                    priority
                  />
                  <h2 className="text-3xl font-bold">{t('Ceremony')}</h2>
                  <p className="text-2xl mt-4 font-semibold">
                  {t('Ceremony-time')}<br />
                  </p>
                </div>
              </div>
            </GoldenBorder>
          </div>
        </Container>
        <div className="absolute bottom-0 w-full h-2 bg-gradient-to-b from-transparent to-white"></div>
      </section>

      {/* Reception */}
      <section id="reception" className="relative bg-white">
        <Container >
          <div className=" relative my-8 py-10">
            {/* Scattered Leaf Background */}
            <div className="absolute inset-0 opacity-[0.04] z-10">
              <Image
                src={Leaf}
                alt="Decorative Leaf"
                className="absolute top-5 -left-48 w-96 -rotate-[130deg]"
              />
              <Image
                src={Leaf}
                alt="Decorative Leaf"
                className="absolute top-3/4 -right-0 w-96 -rotate-90 scale-x-[-1]"
              />
            </div>   
            <GoldenBorder title={t('Reception')} bg_color="bg-white" >
              {/* Content Grid */}
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
                {/* Emoji */}
                <div className="text-center flex flex-col justify-center items-center">
                  <Image
                    src={Cake.src}
                    alt="Ring emoji"
                    width={150}
                    height={150}
                    className="object-cover object-center text-darkBlue"
                    priority
                  />
                  <h2 className="text-3xl font-bold mt-4">{t('Reception')}</h2>
                  <p className="text-2xl mt-4 font-semibold">
                  {t('Reception-time')}<br />
                  </p>
                </div>
                {/* Text */}
                <div className="flex flex-col justify-center p-6 text-center">
                <h2 className="text-xl font-bold">Lorem Ipsum</h2>
                  <div>
                    {t('Lorem Ipsum')}
                  </div>
                </div>
              </div>
            </GoldenBorder>
          </div>
        </Container>
        <div className="absolute bottom-0 w-full h-2 bg-gradient-to-b from-transparent to-lightBlue"></div>
      </section>

      {/* Accommodations */}
      <section id="accommodations" className="relative bg-lightBlue">
        <Container >
          <div className=" relative my-8 py-10">
            {/* Scattered Leaf Background */}
            <div className="absolute inset-0 opacity-[0.04] z-10">
              <Image
                src={Leaf}
                alt="Decorative Leaf"
                className="absolute top-5 -left-96 w-96 rotate-[130deg]"
              />
              <Image
                src={Leaf}
                alt="Decorative Leaf"
                className="absolute top-3/4 -right-48 w-96 rotate-90 scale-x-[-1]"
              />
            </div>   
            <GoldenBorder title={t('Accommodations')} bg_color="bg-lightBlue">
              {/* Accommodation 1 */}
              <h2 className="text-xl font-bold text-center my-3">StoneHaven Le Manoir</h2>
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
                {/* Emoji */}
                <div className="text-center flex flex-col justify-center items-center ">
                  <Image
                    src={StoneHaven.src}
                    alt="StoneHaven"
                    width={300}
                    height={300}
                    className="object-cover object-center text-darkBlue rounded"
                    priority
                  />
                </div>
                {/* Text */}
                <div className="flex flex-col justify-center p-6 text-center">
                <h2 className="text-xl font-bold">Lorem Ipsum</h2>
                  <div>
                    {t('Lorem Ipsum')}
                  </div>
                </div>
              </div>
              {/* Accommodation 2 */}
              <h2 className="text-xl font-bold text-center my-3">Accomodations 2</h2>
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
                {/* Emoji */}
                <div className="text-center flex flex-col justify-center items-center">
                  <Image
                    src={Cake.src}
                    alt="Ring emoji"
                    width={150}
                    height={150}
                    className="object-cover object-center text-darkBlue"
                    priority
                  />
                  <h2 className="text-3xl font-bold mt-4">{t('Reception')}</h2>
                  <p className="text-2xl mt-4 font-semibold">
                  {t('Reception-time')}<br />
                  </p>
                </div>
                {/* Text */}
                <div className="flex flex-col justify-center p-6 text-center">
                <h2 className="text-xl font-bold">Lorem Ipsum</h2>
                  <div>
                    {t('Lorem Ipsum')}
                  </div>
                </div>
              </div>
              {/* Accommodation 3 */}
              <h2 className="text-xl font-bold text-center my-3">Super 8</h2>
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
                {/* Emoji */}
                <div className="text-center flex flex-col justify-center items-center">
                  <Image
                    src={Super8.src}
                    alt="Ring emoji"
                    width={300}
                    height={300}
                    className="object-cover object-center text-darkBlue"
                    priority
                  />

                </div>
                {/* Text */}
                <div className="flex flex-col justify-center p-6 text-center">
                <h2 className="text-xl font-bold">Lorem Ipsum</h2>
                  <div>
                    {t('Lorem Ipsum')}
                  </div>
                </div>
              </div>
            </GoldenBorder>
          </div>
        </Container>
        <div className="absolute bottom-0 w-full h-2 bg-gradient-to-b from-transparent to-white"></div>

      </section>

      {/* Gifts */}
      <section id="gifts" className="relative bg-white">
        <Container >
          <div className=" relative my-8 py-10">
            {/* Scattered Leaf Background */}
            <div className="absolute inset-0 opacity-[0.04] z-10">
              <Image
                src={Leaf}
                alt="Decorative Leaf"
                className="absolute top-5 -left-96 w-96 rotate-[130deg]"
              />
              <Image
                src={Leaf}
                alt="Decorative Leaf"
                className="absolute top-0 -right-48 w-96 -rotate-90 scale-x-[-1]"
              />
            </div>   
            <GoldenBorder title={t('Gifts')} bg_color="bg-white">
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
                {/* Emoji */}
                <div className="text-center flex flex-col justify-center items-center text-darkBlue">
                  <Image
                    src={Gift.src}
                    alt="gift"
                    width={300}
                    height={300}
                    className="object-cover object-center text-darkBlue rounded"
                    priority
                  />
                </div>
                {/* Text */}
                <div className="flex flex-col justify-center p-6 text-center">
                <h2 className="text-xl font-bold">Lorem Ipsum</h2>
                  <div>
                    {t('Lorem Ipsum')}
                  </div>
                </div>
              </div>
            </GoldenBorder>
          </div>
        </Container>
      </section>
      
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
