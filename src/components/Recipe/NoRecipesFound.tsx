import { Link } from "react-router";

export function NoRecipesFound() {
  return (
    <div className="flex flex-col text-xl gap-4 mt-8">
      <div>
        <span>No recipes found</span>
      </div>
      <div>
        <Link to="/recipes">
          <span className="text-sky-600 hover:underline">View all recipes</span>
        </Link>
      </div>
    </div>
  );
}
