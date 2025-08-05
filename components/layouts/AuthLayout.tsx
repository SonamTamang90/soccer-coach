import Link from "next/link";
import React from "react";
import { Logo } from "../shared/Logo";
import Image from "next/image";

const AuthLayout = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <main className="flex min-h-screen flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link href="/">
              <Logo />
            </Link>
            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm/6 text-secondary">{subtitle}</p>
            )}
          </div>

          <div className="mt-10">{children}</div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          src="/assets/hero.png"
          alt="Player"
          fill
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </main>
  );
};

export default AuthLayout;
