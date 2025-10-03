import { Link } from "react-router";

export function Landing() {
  return (
    <div className="flex flex-col gap-2 text-lg py-8">
      <span>Welcome to Recipe Tracker!</span>
      <span>
        <Link to={"/login"}>
          <span className="text-sky-600 hover:underline">Login</span>{" "}
        </Link>
        or{" "}
        <Link to={"/sign-up"}>
          <span className="text-sky-600 hover:underline">Sign up</span>{" "}
        </Link>
        to get started.
      </span>
    </div>
  );
}
