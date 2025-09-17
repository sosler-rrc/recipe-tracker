import { Outlet } from "react-router";
import { Footer } from "./Footer/Footer";
import { Navbar } from "./Navbar/Navbar";
import { useState } from "react";

export function Layout() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const onLogin = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <div className="p-8 flex flex-col min-h-screen bg-stone-200">
      <Navbar
        onLogin={onLogin}
        isLoggedIn={loggedIn}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
