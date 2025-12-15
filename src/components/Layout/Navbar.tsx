import { Link } from "react-router";
import { Button } from "@/components/ui/Button";

export function Navbar() {
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
            <Button>All Recipes</Button>
          </Link>
          <Link to="/recipes/saved-recipes">
            <Button>Saved Recipes</Button>
          </Link>
          <Link to="/recipes/create">
            <Button>Create Recipe</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
