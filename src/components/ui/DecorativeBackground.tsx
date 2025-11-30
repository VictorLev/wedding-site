'use client';
import Image from "next/image";
import Leaf from "@/public/images/leaf.svg";

interface DecorativeBackgroundProps {
  variant?: 'place' | 'ceremony' | 'reception' | 'accommodations' | 'gifts';
}

// Fixed leaf positions for each variant - neat and uniform with rotation variance
const leafPositions: Record<string, Array<{ top: string; left: string; rotation: number; scale: number; flipX: boolean }>> = {
  place: [
    { top: '15%', left: '10%', rotation: 45, scale: 0.8, flipX: false },
    { top: '25%', left: '85%', rotation: 135, scale: 0.9, flipX: true },
    { top: '70%', left: '20%', rotation: 225, scale: 0.7, flipX: false },
    { top: '80%', left: '90%', rotation: 315, scale: 0.85, flipX: true },
    { top: '50%', left: '50%', rotation: 180, scale: 0.75, flipX: false },
  ],
  ceremony: [
    { top: '20%', left: '15%', rotation: 60, scale: 0.85, flipX: true },
    { top: '30%', left: '80%', rotation: 150, scale: 0.9, flipX: false },
    { top: '65%', left: '25%', rotation: 240, scale: 0.8, flipX: true },
    { top: '75%', left: '85%', rotation: 330, scale: 0.75, flipX: false },
  ]
};

const DecorativeBackground: React.FC<DecorativeBackgroundProps> = ({ variant = 'place' }) => {
  const leaves = leafPositions[variant] || leafPositions.place;

  return (
    <div className="absolute inset-0 opacity-[0.04] z-10 pointer-events-none overflow-hidden">
      {leaves.map((leaf, index) => (
        <div
          key={index}
          className="absolute w-64 h-64"
          style={{
            top: leaf.top,
            left: leaf.left,
            transform: `translate(-50%, -50%) rotate(${leaf.rotation}deg) scale(${leaf.scale}) ${leaf.flipX ? 'scaleX(-1)' : ''}`
          }}
        >
          <Image
            src={Leaf}
            alt=""
            fill
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default DecorativeBackground;
