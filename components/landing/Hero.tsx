import { Container } from "../Container";
import { Button } from "../ui/Button";

const Hero = () => {
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900">
              <span>The Richer Way, Live more Organized</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              An all-in-one application to track job applications, manage
              projects, monitor health goals, and lead a well-organized life.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Button>Get Started Free</Button>
              <Button variant="outline">Sign in</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
