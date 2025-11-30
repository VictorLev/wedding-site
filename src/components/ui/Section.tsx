import Container from "./Container";
import DecorativeBackground from "./DecorativeBackground";

interface SectionProps {
  id: string;
  bgColor: 'bg-white' | 'bg-lightBlue';
  nextBgColor?: 'bg-white' | 'bg-lightBlue';
  decorativeVariant?: 'place' | 'ceremony' | 'reception' | 'accommodations' | 'gifts';
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  id,
  bgColor,
  nextBgColor,
  decorativeVariant,
  children
}) => {
  return (
    <section id={id} className={`relative ${bgColor}`}>
      <Container>
        <div className="relative my-8 py-10">
          {decorativeVariant && <DecorativeBackground variant={decorativeVariant} />}
          {children}
        </div>
      </Container>
      {nextBgColor && (
        <div className={`absolute bottom-0 w-full h-2 bg-gradient-to-b from-transparent to-${nextBgColor}`}></div>
      )}
    </section>
  );
};

export default Section;
