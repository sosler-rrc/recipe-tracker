import { SignInButton, useAuth } from "@clerk/clerk-react";
import { Link } from "react-router";

export function Landing() {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-col gap-2 text-lg py-8">
      <span>Welcome to Recipe Tracker!</span>
      {!isSignedIn ? (
        <div>
          <span className="text-sky-600 underline">
            <SignInButton />
          </span>
          <span> to get started</span>
        </div>
      ) : (
        <Link
          to={"recipes"}
          className="text-sky-600 hover:underline">
          View All Recipes
        </Link>
      )}
    </div>
  );
}
