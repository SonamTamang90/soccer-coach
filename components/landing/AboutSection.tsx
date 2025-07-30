import React from "react";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="w-full py-16 bg-surface-light flex flex-col items-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary-white">
        About Us
      </h2>
      <p className="max-w-3xl text-lg text-center text-secondary">
        Our mission is to empower soccer coaches and managers with the tools
        they need to run their teams efficiently. Whether you&apos;re managing a
        youth club or a competitive squad, our platform simplifies scheduling,
        communication, and performance tracking so you can focus on what matters
        most: the game.
      </p>
    </section>
  );
};

export default AboutSection;
