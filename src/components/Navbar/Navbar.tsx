import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}

export function Navbar({ onLogin, isLoggedIn }: NavbarProps) {
  return (
    <header>
      <nav className="flex justify-between">
        <div className="title m-w-60">
          <h1 className="text-4xl cursor-pointer">Recipe Tracker</h1>
        </div>
        <div className="links flex flex-row gap-4 justify-around items-center">
          {isLoggedIn ? <Button>My Recipes</Button> : <></>}
          <Button onClick={() => onLogin()}>{isLoggedIn ? "Logout" : "Login / Signup"}</Button>
        </div>
      </nav>
    </header>
  );
}
