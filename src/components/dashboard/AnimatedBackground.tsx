
import { ReactNode } from "react";

interface AnimatedBackgroundProps {
  children: ReactNode;
}

export const AnimatedBackground = ({ children }: AnimatedBackgroundProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50] relative overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 12}s infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          <div 
            className={`w-8 h-8 rounded-lg opacity-20`}
            style={{
              transform: `rotate(${Math.random() * 360}deg)`,
              backgroundColor: [
                "#FFE4E6", "#E7EFE6", "#FFF1E6", "#E5DEFF", 
                "#FFDEE2", "#FDE1D3", "#D3E4FD", "#F2FCE2",
                "#FEF7CD", "#FEC6A1", "#F1F0FB"
              ][i % 11]
            }}>
          </div>
        </div>
      ))}
      <div className="container mx-auto max-w-4xl relative z-10">
        {children}
      </div>
    </div>
  );
};
