import Container from "./Container";
import DecorativeBackground from "./DecorativeBackground";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  id
}) => {
  return (
    <Container id={id} className="scroll-mt-24">
      <div className="relative py-10">
        <DecorativeBackground />
        {children}
      </div>
    </Container>
  );
};

export default Section;
