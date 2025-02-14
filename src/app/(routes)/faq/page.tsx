"use client"
import Image from "next/image";
import {useTranslations} from 'next-intl';
import bgHome from "@/src/public/images/home.jpg";
import Container from "@/src/components/ui/Container";
import Manoir from "@/src/public/images/manoir.png";
import Logo from "@/src/public/images/Wedding_Logo.png";
import GoldenBorder from "@/src/components/ui/GoldenBorder";
import { Map  } from "lucide-react";
import { FC, useEffect, useState } from 'react';



export default function Faq() {
  const t = useTranslations('FaqPage');
  return (
    <div>
      {/* Place */}
      <Container>
        <section id="place" className="my-16 mb-96">
          <GoldenBorder title={t('title')}>
            {/* Content Grid */}
            <div className="grid grid-cols-2 gap-8">
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
        </section>
      </Container>
    </div>
  );
}
