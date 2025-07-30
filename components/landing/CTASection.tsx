import React from "react";

const CTASection = () => {
  return (
    <section
      id="cta"
      className="w-full py-16 bg-primary text-black flex flex-col items-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Ready to Transform Your Team?
      </h2>
      <p className="mb-8 text-lg text-center max-w-xl">
        Join hundreds of coaches and managers who trust our platform to
        streamline their soccer operations.
      </p>
      <button className="px-8 py-3 bg-surface text-primary-white font-semibold rounded shadow hover:bg-surface-light transition border border-dark">
        Sign Up Free
      </button>
    </section>
  );
};

export default CTASection;
