import React from "react";
import Image from "next/image";

interface LogoProps {
  size?: number;
  showText?: boolean;
  textColor?: string;
  textSize?: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  variant?: "default" | "hero" | "minimal";
}

export const Logo: React.FC<LogoProps> = ({
  size = 40,
  showText = true,
  textColor = "text-white",
  textSize = "text-xl",
  className = "",
  iconClassName = "",
  textClassName = "",
  variant = "default",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "hero":
        return {
          containerClass: "items-center gap-4",
          iconWrapperClass:
            "w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg",
          iconClass: "w-10 h-10 object-contain filter brightness-0 invert",
          textClass:
            "text-2xl font-bold text-white drop-shadow-lg tracking-wide",
        };
      case "minimal":
        return {
          containerClass: "items-center gap-2",
          iconWrapperClass: "",
          iconClass: "object-contain",
          textClass: `${textSize} font-bold ${textColor} ${textClassName}`,
        };
      default:
        return {
          containerClass: "items-center gap-3",
          iconWrapperClass: "",
          iconClass: `object-contain ${iconClassName}`,
          textClass: `${textSize} font-bold ${textColor} ${textClassName}`,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`flex ${styles.containerClass} ${className}`}>
      {variant === "hero" ? (
        <div className={styles.iconWrapperClass}>
          <Image
            src="/assets/logo.svg"
            alt="SoccerCoach Logo"
            width={40}
            height={40}
            className={styles.iconClass}
          />
        </div>
      ) : (
        <Image
          src="/assets/logo.svg"
          alt="SoccerCoach Logo"
          width={size}
          height={size}
          className={styles.iconClass}
        />
      )}
      {showText && <div className={styles.textClass}>Soccer Coach</div>}
    </div>
  );
};
