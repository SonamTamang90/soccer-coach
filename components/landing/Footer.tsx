import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gray-900 text-white flex flex-col items-center">
      <nav className="mb-2 flex gap-6">
        <a href="#features" className="hover:underline">
          Features
        </a>
        <a href="#about" className="hover:underline">
          About
        </a>
        <a href="#testimonials" className="hover:underline">
          Testimonials
        </a>
      </nav>
      <div className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Soccer Coach. All rights reserved.
      </div>
    </footer>
  );
};
