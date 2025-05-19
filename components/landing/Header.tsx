import Link from "next/link";
import { Container } from "../Container";
import Image from "next/image";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center gap-2"
            >
              <Image
                src="/assets/logo.png"
                alt="Brand Logo"
                width={36}
                height={36}
              />
              <span className="text-base font-medium">The Richer Way</span>
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks />
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Header;
