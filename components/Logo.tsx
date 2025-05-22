import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({
  className,
  color = "text-gray-900",
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx("flex items-center gap-2", className)}
    >
      <Image src="/assets/logo.png" alt="Brand Logo" width={36} height={36} />
      <span className={clsx("text-lg font-medium", color)}>Soccer Coach</span>
    </Link>
  );
};

export default Logo;
