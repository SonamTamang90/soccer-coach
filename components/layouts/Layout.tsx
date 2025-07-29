import React from "react";
import { Header } from "../landing/Header";
import { Footer } from "../landing/Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  );
};
