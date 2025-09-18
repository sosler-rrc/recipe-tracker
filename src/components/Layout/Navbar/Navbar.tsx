import { Link } from "react-router";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}

export function Navbar({ onLogin, isLoggedIn }: NavbarProps) {
  return (
    <header>
      <nav className="flex justify-between">
        <div className="title m-w-60">
          <Link to="/">
            <h1 className="text-4xl cursor-pointer">Recipe Tracker</h1>
          </Link>
        </div>
        <div className="links flex flex-row gap-4 justify-around items-center">
          <Link to="/recipes">
            <Button>Recipes</Button>
          </Link>
          {isLoggedIn ? (
            <Link to="/recipes/my-recipes">
              <Button>Saved Recipes</Button>
            </Link>
          ) : (
            <></>
          )}
          <Button onClick={() => onLogin()}>{isLoggedIn ? "Logout" : "Login / Signup"}</Button>
        </div>
      </nav>
    </header>
  );
}
