import { Link } from "react-router";

export function Landing() {
  return (
    <div className="flex flex-col gap-2 text-lg py-8">
      <span>Welcome to Recipe Tracker!</span>
      <span>
        <span className="text-sky-600 hover:underline">
          <Link to={"/login"}>Login</Link>
        </span>{" "}
        or{" "}
        <span className="text-sky-600 hover:underline">
          <Link to={"/sign-up"}>Sign up</Link>
        </span>{" "}
        to get started.
      </span>
    </div>
  );
}
