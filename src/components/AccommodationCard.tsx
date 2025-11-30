import Image from "next/image";
import { useTranslations } from 'next-intl';
import { Accommodation } from "@/config/weddingData";

interface AccommodationCardProps {
  accommodation: Accommodation;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation }) => {
  const t = useTranslations('HomePage');

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-center my-3">{accommodation.name}</h2>
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
        {/* Image */}
        <div className="text-center flex flex-col justify-center items-center">
          <Image
            src={accommodation.image}
            alt={accommodation.imageAlt}
            width={300}
            height={300}
            className="object-cover object-center text-darkerBlue rounded"
            priority
          />
        </div>
        {/* Text */}
        <div className="flex flex-col justify-center p-6 text-center">
          <h2 className="text-xl font-bold">{t(accommodation.descriptionKey)}</h2>
          <div>{t(accommodation.descriptionKey)}</div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
