export function Navbar() {
  return (
    <header>
      <nav className="flex justify-between">
        <div className="title w-100">
          <h1 className="text-4xl">Recipe Tracker</h1>
        </div>
        <div className="links flex  w-50 justify-around">
          <span>
            <a href="#">My Recipes</a>
          </span>
          <span>
            <a href="#">Logout</a>
          </span>
        </div>
      </nav>
    </header>
  );
}
