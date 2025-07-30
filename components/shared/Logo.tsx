import React from "react";
import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 40,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/assets/logo.svg"
        alt="SoccerCoach Logo"
        width={size}
        height={size}
        className="object-contain"
      />
      <div className="text-xl font-bold text-white">Soccer Coach</div>
    </div>
  );
};
