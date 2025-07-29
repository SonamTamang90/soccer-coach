import React from "react";

export const Header = () => {
  return (
    <header className="w-full py-6 bg-white flex items-center justify-between px-8 border-b border-gray-100">
      <div className="text-2xl font-bold text-gray-900">SoccerTeam</div>
      <nav className="flex gap-6 items-center">
        <a
          href="#features"
          className="text-gray-800 hover:text-blue-600 transition text-base font-medium"
        >
          Features
        </a>
        <a
          href="#pricing"
          className="text-gray-800 hover:text-blue-600 transition text-base font-medium"
        >
          Pricing
        </a>
        <a
          href="#signup"
          className="ml-2 px-5 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition text-base"
        >
          Sign Up
        </a>
      </nav>
    </header>
  );
};
