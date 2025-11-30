import Container from "./Container";
import DecorativeBackground from "./DecorativeBackground";

interface SectionProps {
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  children
}) => {
  return (
    <Container>
      <div className="relative py-10">
        <DecorativeBackground />
        {children}
      </div>
    </Container>
  );
};

export default Section;
