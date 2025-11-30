import Image from "next/image";
import { useTranslations } from 'next-intl';
import GoldenBorder from "./ui/GoldenBorder";
import { EventSection as EventSectionType } from "@/config/weddingData";

interface EventSectionProps {
  section: EventSectionType;
  reverse?: boolean;
}

const EventSection: React.FC<EventSectionProps> = ({ section, reverse = false }) => {
  const t = useTranslations('HomePage');

  return (
      <div className={`flex flex-col ${reverse ? 'sm:flex-row-reverse' : 'sm:flex-row'} gap-8`}>
        {/* Icon/Image - First on mobile */}
        <div className="text-center flex flex-col justify-center items-center flex-1 order-1 sm:order-none">
          <Image
            src={section.icon}
            alt={section.iconAlt}
            width={ 200}
            height={ 200}
            className="object-cover object-center"
            priority
          />
          <h2 className="text-3xl font-bold mt-4">{t(section.titleKey)}</h2>
          <p className="text-2xl mt-4 font-semibold">{t(section.timeKey)}</p>
        </div>
        {/* Text - Second on mobile */}
        <div className="flex flex-col justify-center p-6 text-center flex-1 order-2 sm:order-none">
          <h2 className="text-xl font-semibold">{t(section.descriptionKey)}</h2>
        </div>
      </div>
  );
};

export default EventSection;
