import { SignInButton, useAuth } from "@clerk/clerk-react";
import { Link } from "react-router";

export function Landing() {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-col gap-2 text-lg py-8">
      <span>Welcome to Recipe Tracker!</span>
      <Link
        to={"recipes"}
        className="text-sky-600 hover:underline">
        View All Recipes
      </Link>
      {!isSignedIn ? (
        <div>
          <span className="text-sky-600 hover:underline cursor-pointer">
            <SignInButton>
              <span>Sign in</span>
            </SignInButton>
          </span>
          <span> to create recipes</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
