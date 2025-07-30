import React from "react";

const features = [
  {
    title: "Team Management",
    description: "Easily add and manage players, coaches, and staff members.",
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0zm6 4v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2a6 6 0 0112 0z"
        />
      </svg>
    ),
  },
  {
    title: "Scheduling",
    description: "Plan and schedule practices, games, and events effortlessly.",
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-primary"
      >
        <rect
          x="3"
          y="8"
          width="18"
          height="13"
          rx="2"
          strokeWidth={2}
          stroke="currentColor"
        />
        <path strokeWidth={2} stroke="currentColor" d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    title: "Communication",
    description: "Send messages and announcements to entire team.",
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4 1 1-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    title: "Player Availability",
    description:
      "Track player attendance and availability for upcoming events.",
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="w-full py-16 bg-surface flex flex-col items-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-primary-white">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 w-full max-w-4xl">
        {features.map((feature) => (
          <div key={feature.title} className="flex items-start gap-4">
            <div className="flex-shrink-0">{feature.icon}</div>
            <div>
              <h3 className="text-xl font-semibold mb-1 text-primary-white">
                {feature.title}
              </h3>
              <p className="text-secondary text-base">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
