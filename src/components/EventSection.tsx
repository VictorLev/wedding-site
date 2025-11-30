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
    <GoldenBorder title={t(section.titleKey)} bg_color={section.bgColor}>
      <div className={`flex ${reverse ? 'flex-col-reverse' : 'flex-col'} sm:grid sm:grid-cols-2 gap-8`}>
        {/* Text */}
        <div className="flex flex-col justify-center p-6 text-center">
          <h2 className="text-xl font-bold">{t(section.descriptionKey)}</h2>
          <div>{t(section.descriptionKey)}</div>
        </div>
        {/* Icon/Image */}
        <div className="text-center flex flex-col justify-center items-center">
          <Image
            src={section.icon}
            alt={section.iconAlt}
            width={section.id === 'ceremony' ? 200 : 150}
            height={section.id === 'ceremony' ? 200 : 150}
            className="object-cover object-center"
            priority
          />
          <h2 className="text-3xl font-bold mt-4">{t(section.titleKey)}</h2>
          <p className="text-2xl mt-4 font-semibold">{t(section.timeKey)}</p>
        </div>
      </div>
    </GoldenBorder>
  );
};

export default EventSection;
