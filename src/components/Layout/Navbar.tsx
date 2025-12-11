import { Link } from "react-router";

export function Navbar() {
  return (
    <header>
      <nav className="flex justify-between">
        <div className="title m-w-60">
          <Link to="/">
            <h1 className="text-4xl cursor-pointer">Recipe Tracker</h1>
          </Link>
        </div>
      </nav>
    </header>
  );
}
