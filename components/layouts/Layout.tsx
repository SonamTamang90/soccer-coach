import Header from "../landing/Header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <footer>Footer</footer>
    </>
  );
};
