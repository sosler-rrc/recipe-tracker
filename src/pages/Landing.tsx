import { Link } from "react-router";

export function Landing() {
  return (
    <div className="flex flex-col gap-2 text-lg py-8">
      <span>Welcome to Recipe Tracker!</span>
      <Link
        to={"recipes"}
        className="text-sky-600 hover:underline">
        View All Recipes
      </Link>
    </div>
  );
}
