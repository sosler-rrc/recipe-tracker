import { Outlet } from "react-router";
import { Footer } from "./Footer/Footer";
import { Navbar } from "./Navbar/Navbar";

export function Layout() {
  return (
    <div className="p-8 flex flex-col min-h-screen bg-stone-200">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
