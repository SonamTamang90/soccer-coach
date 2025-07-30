import React from "react";
import { Logo } from "@/components/shared/Logo";

export const Header = () => {
  return (
    <header className="w-full py-6 bg-surface flex items-center justify-between px-8 border-b border-dark">
      <Logo />
      <nav className="flex gap-6 items-center">
        <a
          href="#features"
          className="text-primary-white hover:text-primary transition text-base font-medium"
        >
          Features
        </a>
        <a
          href="#pricing"
          className="text-primary-white hover:text-primary transition text-base font-medium"
        >
          Pricing
        </a>
        <a
          href="#signup"
          className="ml-2 px-5 py-2 bg-primary text-black rounded font-semibold hover:bg-primary transition text-base"
        >
          Sign Up
        </a>
      </nav>
    </header>
  );
};
