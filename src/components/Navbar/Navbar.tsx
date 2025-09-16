import { Button } from "../ui/Button";

export function Navbar() {
  return (
    <header>
      <nav className="flex justify-between">
        <div className="title m-w-60">
          <h1 className="text-4xl cursor-pointer">Recipe Tracker</h1>
        </div>
        <div className="links flex flex-row gap-4 justify-around items-center">
          <Button>My Recipes</Button>
          <Button>Login / Signup</Button>
        </div>
      </nav>
    </header>
  );
}
