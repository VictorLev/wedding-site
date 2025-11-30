import { StaticImageData } from 'next/image';
import Manoir from "@/public/images/manoir.png";
import Ring from "@/public/images/ring.png";
import Cake from "@/public/images/wedding-cake.png";
import StoneHaven from "@/public/images/accommodations/StoneHaven.png";
import Super8 from "@/public/images/accommodations/Super8.png";
import Gift from "@/public/images/gift.png";
import bgHome from "@/public/images/home.jpg";

export interface VenueInfo {
  name: string;
  date: string;
  address: {
    street: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
  };
  mapsUrl: string;
  image: StaticImageData;
}

export interface EventSection {
  id: string;
  titleKey: string;
  timeKey: string;
  descriptionKey: string;
  icon: StaticImageData;
  iconAlt: string;
  bgColor: 'bg-white' | 'bg-lightBlue';
}

export interface Accommodation {
  id: string;
  name: string;
  image: StaticImageData;
  imageAlt: string;
  descriptionKey: string;
}

export const venue: VenueInfo = {
  name: "Manoir Davis",
  date: "26 septembre 2026",
  address: {
    street: "92 Chemin Sir-Mortimer-B.-Davis",
    city: "Sainte-Agathe-des-Monts",
    province: "Quebec",
    country: "Canada",
    postalCode: "J8C 2Z7"
  },
  mapsUrl: "https://maps.app.goo.gl/UYw39rgTqq9ALXDn7",
  image: Manoir
};

export const homeSection = {
  id: "home",
  backgroundImage: bgHome
};

export const eventSections: EventSection[] = [
  {
    id: "ceremony",
    titleKey: "Ceremony",
    timeKey: "Ceremony-time",
    descriptionKey: "Ceremony-description",
    icon: Ring,
    iconAlt: "Wedding rings",
    bgColor: "bg-lightBlue"
  },
  {
    id: "cocktail",
    titleKey: "Cocktail",
    timeKey: "Cocktail-time",
    descriptionKey: "Cocktail-description",
    icon: Gift,
    iconAlt: "Cocktail drinks",
    bgColor: "bg-lightBlue"
  },
  {
    id: "reception",
    titleKey: "Reception",
    timeKey: "Reception-time",
    descriptionKey: "Reception-description",
    icon: Cake,
    iconAlt: "Wedding cake",
    bgColor: "bg-lightBlue"
  }
];
