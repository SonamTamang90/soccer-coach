import Image from "next/image";
import { CircleBackground } from "../CircleBackground";
import { Container } from "../Container";

const PrimaryFeature = () => {
  return (
    <section id="features" className="bg-gray-900 py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-2xl">
          <h2 className="text-3xl font-medium tracking-tight text-white">
            Every day is a new opportunity to learn something new.
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            Our platform helps you excel in soccer with personalized training
            plans, progress tracking, and team communication tools. Whether
            you&apos;re a player or coach, we&apos;ve got you covered.
          </p>
        </div>
      </Container>
      <Container className="hidden md:block">
        <div className="mt-20 grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24">
          <div className="relative z-10 order-last col-span-6 space-y-6">
            FEATURES
          </div>
          <div className="relative col-span-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <CircleBackground
                color="#13B5C8"
                className="animate-spin-slower"
              />
            </div>
            <div className="relative z-10 mx-auto aspect-[4/3] w-full max-w-[1200px]">
              <Image
                src="/assets/team.png"
                alt="Team Winning"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PrimaryFeature;
