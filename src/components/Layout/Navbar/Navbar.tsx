import { Link } from "react-router";
import { Button } from "../../ui/Button";
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from "@clerk/clerk-react";

export function Navbar() {
  const { getToken, isSignedIn } = useAuth();

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
            <Button>Recipes</Button>
          </Link>
          {isSignedIn ? (
            <Link to="/recipes/my-recipes">
              <Button>Saved Recipes</Button>
            </Link>
          ) : (
            <></>
          )}
          {isSignedIn ? (
            <Link to="/recipes/create">
              <Button>Create Recipe</Button>
            </Link>
          ) : (
            <></>
          )}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
