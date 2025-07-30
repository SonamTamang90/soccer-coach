import React from "react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="w-full h-screen bg-surface flex flex-col md:flex-row items-center justify-center"
    >
      <div className="flex-1 flex flex-col items-start md:items-start mb-10 md:mb-0">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-white leading-tight">
          Manage Your <br className="hidden md:block" /> Soccer Team{" "}
          <br className="hidden md:block" /> with Ease
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-secondary max-w-xl">
          A powerful and easy-to-use app for organizing practices, games, and
          communication with your team.
        </p>
        <button className="px-8 py-3 bg-primary text-black font-semibold rounded shadow hover:bg-primary-hover transition text-lg">
          Sign Up
        </button>
      </div>
      <div className="flex-1 flex justify-center md:justify-end w-full">
        {/* Placeholder for illustration */}
        <div className="w-64 h-64 flex items-center justify-center">
          <span className="text-[7rem]">⚽️</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
