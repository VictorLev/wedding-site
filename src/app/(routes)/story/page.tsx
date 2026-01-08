'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useMessages } from 'next-intl';
import Lake from '@/public/images/lake.jpg';
import Story1 from '@/public/images/story-1.jpg';
import Story2 from '@/public/images/story-2.jpg';
import Story3 from '@/public/images/story-3.jpg';
import Story4 from '@/public/images/story-4.jpg';
import Story5 from '@/public/images/story-5.jpg';
import Story6 from '@/public/images/story-6.jpg';
import Story7 from '@/public/images/story-7.jpg';
import Story8 from '@/public/images/story-8.jpg';
import Container from '@/components/ui/Container';
import Loading from '@/components/ui/Loading';
import { Heart } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export default function Story() {
  const t = useTranslations('StoryPage');
  const tTimeline = useTranslations('StoryTimeline');
  const messages = useMessages();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (messages.StoryPage) {
      setLoading(false);
    }
  }, [messages]);

  if (loading) {
    return <Loading />;
  }

  const timelineImages = [Story1, Story2, Story3, Story4, Story5, Story6, Story7, Story8];

  const timelineKeys = Object.keys(messages.StoryTimeline || {});
  const timelineEvents: TimelineEvent[] = timelineKeys.map((key) => ({
    date: tTimeline(`${key}.date`),
    title: tTimeline(`${key}.title`),
    description: tTimeline(`${key}.description`),
  }));

  return (
    <div className="relative bg-lightBlue">
      {/* Story Background */}
      <div className="absolute top-0 h-[50vh] w-full overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            priority
            src={Lake}
            alt="Lake Background"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover object-[50% 50%] opacity-0 animate-fadeIn"
          />
          <div className="absolute bottom-0 h-4 sm:h-[5vh] w-full bg-gradient-to-b from-transparent to-lightBlue"></div>
        </div>
      </div>



      {/* Banner */}
      <div className="relative h-[50vh] w-full">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-7xl text-darkerBlue drop-shadow-lg font-light tracking-widest pt-2 text-center">
            {t('title')}
          </h1>
        </div>
      </div>
      <Container>
        {/* Introduction */}
        <div className="bg-lightBlue py-10 text-center">
          <p className="text-lg text-darkerBlue max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative bg-lightBlue pb-20">
          {/* Continuous vertical line - hidden on mobile */}
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-20 w-0.5 bg-mediumBlue -translate-x-1/2"></div>

          <div className="max-w-6xl mx-auto px-4">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative pb-16 last:pb-0">
                {/* Timeline content */}
                <div className={`flex flex-col sm:grid sm:grid-cols-2 gap-8 items-start ${
                  index % 2 === 0 ? '' : 'sm:grid-flow-dense'
                }`}>
                  {/* Image */}
                  <div className={`w-full p-8 ${index % 2 === 0 ? '' : 'sm:col-start-2'}`}>
                    {timelineImages[index] ? (
                      <div className="rounded-lg overflow-hidden shadow-lg aspect-[4/3] relative">
                        <Image
                          src={timelineImages[index]}
                          alt={`${event.title} - ${event.date}`}
                          fill
                          loading={index === 0 ? 'eager' : 'lazy'}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                          quality={85}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bg-white/50 rounded-lg aspect-[4/3] flex items-center justify-center text-darkerBlue/30">
                        {/* Placeholder for future image */}
                        <span className="text-sm">Image placeholder</span>
                      </div>
                    )}
                  </div>

                  {/* Center dot - positioned absolutely */}
                  <div className="absolute left-6 sm:left-1/2 top-[40%] sm:-translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-darkerBlue flex items-center justify-center shadow-lg">
                      <Heart className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>

                  {/* Text content with date */}
                  <div className={`w-full h-full flex items-center gap-4 items-start ${index % 2 === 0 ? '' : 'sm:col-start-1 sm:row-start-1'}`}>
                    {/* Text card */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'sm:ml-auto sm:pl-12' : 'sm:mr-auto sm:pr-12'}`}>
                      <div className="bg-white p-6 rounded-lg shadow-md ml-16 sm:ml-0">
                        <p className="text-darkerBlue font-semibold text-lg mb-2">{event.date}</p>
                        <h3 className="text-darkerBlue font-semibold text-xl mb-2">
                          {event.title}
                        </h3>
                        <p className="text-darkerBlue">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
