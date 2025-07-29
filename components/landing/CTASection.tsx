import React from "react";

const CTASection = () => {
  return (
    <section
      id="cta"
      className="w-full py-16 bg-blue-600 text-white flex flex-col items-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Ready to Transform Your Team?
      </h2>
      <p className="mb-8 text-lg text-center max-w-xl">
        Join hundreds of coaches and managers who trust our platform to
        streamline their soccer operations.
      </p>
      <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100 transition">
        Sign Up Free
      </button>
    </section>
  );
};

export default CTASection;
