'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useMessages } from 'next-intl';
import Lake from '@/public/images/lake.jpg';
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

  const timelineKeys = Object.keys(messages.StoryTimeline || {});
  const timelineEvents: TimelineEvent[] = timelineKeys.map((key) => ({
    date: t(`../StoryTimeline.${key}.date`),
    title: t(`../StoryTimeline.${key}.title`),
    description: t(`../StoryTimeline.${key}.description`),
  }));

  return (
    <div className="relative bg-lightBlue">
      {/* Story Background */}
      <div className="absolute top-0 h-[75vh] w-full overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            priority
            src={Lake}
            alt="Lake Background"
            className="object-cover object-[50% 50%] w-full h-full opacity-0 animate-fadeIn"
          />
          <div className="absolute bottom-0 h-4 sm:h-[10vh] w-full bg-gradient-to-b from-transparent to-lightBlue"></div>
        </div>
      </div>

      {/* Banner */}
      <div className="relative h-[75vh] w-full">
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-5xl text-darkerBlue drop-shadow-lg font-light tracking-widest pt-2 text-center">
            {t('title')}
          </p>
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
          <div className="max-w-4xl mx-auto px-4">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative pb-12 last:pb-0">
                {/* Timeline line */}
                {index !== timelineEvents.length - 1 && (
                  <div className="absolute left-6 sm:left-1/2 top-12 w-0.5 h-full bg-gold -translate-x-1/2"></div>
                )}

                {/* Timeline content */}
                <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}>
                  {/* Left side (or right on odd items) */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'} ${
                    index % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'
                  } hidden sm:block`}>
                    <p className="text-gold font-semibold text-lg">{event.date}</p>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-lg">
                      <Heart className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>

                  {/* Right side (or left on odd items) */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'sm:pl-8' : 'sm:pr-8'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      {/* Mobile date - shown only on small screens */}
                      <p className="text-gold font-semibold text-lg mb-2 sm:hidden">{event.date}</p>

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
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
