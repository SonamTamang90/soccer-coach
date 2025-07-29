import React from "react";

const testimonials = [
  {
    name: "Coach Alex",
    text: "This platform has transformed the way I manage my team. Scheduling and communication are a breeze!",
  },
  {
    name: "Manager Jamie",
    text: "Player stats and attendance tracking have never been easier. Highly recommend!",
  },
];

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="w-full py-16 bg-white flex flex-col items-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        What Our Users Say
      </h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="bg-blue-50 p-6 rounded-lg shadow flex-1"
          >
            <p className="text-lg italic mb-4">“{testimonial.text}”</p>
            <div className="text-right font-semibold text-blue-700">
              - {testimonial.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
