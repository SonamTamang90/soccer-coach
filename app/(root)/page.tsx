import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("@/components/landing/HeroSection"));
const FeaturesSection = dynamic(
  () => import("@/components/landing/FeaturesSection")
);

const page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex flex-col gap-0">
        <HeroSection />
        <FeaturesSection />
        {/* Add additional sections here as needed */}
      </main>
      <Footer />
    </div>
  );
};

export default page;
