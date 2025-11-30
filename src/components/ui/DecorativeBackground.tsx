import Image from "next/image";
import Leaf from "@/public/images/leaf.svg";

interface LeafPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotation: string;
  scale?: string;
}

interface DecorativeBackgroundProps {
  variant?: 'place' | 'ceremony' | 'reception' | 'accommodations' | 'gifts';
}

const leafPositions: Record<string, LeafPosition[]> = {
  place: [
    { top: '10', left: '-48', rotation: 'rotate-0' },
    { top: '2/3', right: '-48', rotation: 'rotate-90 scale-x-[-1]' }
  ],
  ceremony: [
    { top: '0', left: '-48', rotation: 'rotate-90' },
    { top: '3/4', right: '-48', rotation: 'rotate-180 scale-x-[-1]' }
  ],
  reception: [
    { top: '5', left: '-48', rotation: '-rotate-[130deg]' },
    { top: '3/4', right: '0', rotation: '-rotate-90 scale-x-[-1]' }
  ],
  accommodations: [
    { top: '5', left: '-96', rotation: 'rotate-[130deg]' },
    { top: '3/4', right: '-48', rotation: 'rotate-90 scale-x-[-1]' }
  ],
  gifts: [
    { top: '5', left: '-96', rotation: 'rotate-[130deg]' },
    { top: '0', right: '-48', rotation: '-rotate-90 scale-x-[-1]' }
  ]
};

const DecorativeBackground: React.FC<DecorativeBackgroundProps> = ({ variant = 'place' }) => {
  const positions = leafPositions[variant];

  return (
    <div className="absolute inset-0 opacity-[0.04] z-10">
      {positions.map((pos, index) => (
        <Image
          key={index}
          src={Leaf}
          alt="Decorative Leaf"
          className={`absolute w-96 ${pos.rotation}
            ${pos.top ? `top-${pos.top}` : ''}
            ${pos.bottom ? `bottom-${pos.bottom}` : ''}
            ${pos.left ? `-left-${pos.left}` : ''}
            ${pos.right ? `-right-${pos.right}` : ''}`}
        />
      ))}
    </div>
  );
};

export default DecorativeBackground;
