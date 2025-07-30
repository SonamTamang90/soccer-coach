import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full py-6 bg-surface border-t border-dark text-primary-white flex flex-col items-center">
      <nav className="mb-2 flex gap-6">
        <a href="#features" className="hover:underline hover:text-primary transition">
          Features
        </a>
        <a href="#about" className="hover:underline hover:text-primary transition">
          About
        </a>
        <a href="#testimonials" className="hover:underline hover:text-primary transition">
          Testimonials
        </a>
      </nav>
      <div className="text-sm text-secondary">
        &copy; {new Date().getFullYear()} Soccer Coach. All rights reserved.
      </div>
    </footer>
  );
};
