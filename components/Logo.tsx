import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx("flex items-center gap-2", className)}
    >
      <Image src="/assets/logo.png" alt="Brand Logo" width={36} height={36} />
      <span className="text-lg font-medium text-gray-900">Soccer Coach</span>
    </Link>
  );
};

export default Logo;
