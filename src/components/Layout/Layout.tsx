import { Outlet } from "react-router";
import { Footer } from "./Footer/Footer";
import { Navbar } from "./Navbar/Navbar";

interface LayoutProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}
export function Layout({ isLoggedIn, onLogin }: LayoutProps) {
  return (
    <div className="p-8 flex flex-col min-h-screen bg-stone-200">
      <Navbar
        onLogin={onLogin}
        isLoggedIn={isLoggedIn}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
