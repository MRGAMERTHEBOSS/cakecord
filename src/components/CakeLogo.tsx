import React from "react";
import cakeLogoUrl from "../../assets/main.png";

interface CakeLogoProps {
  className?: string;
  size?: number;
}

export default function CakeLogo({ className = "", size = 32 }: CakeLogoProps) {
  return (
    <img
      src={cakeLogoUrl}
      alt="CakeCord logo"
      width={size}
      height={size}
      className={`select-none object-contain rounded-md ${className}`}
      draggable={false}
    />
  );
}
