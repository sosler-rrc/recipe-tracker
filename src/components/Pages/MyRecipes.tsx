import { Link } from "react-router";
import type { Recipe } from "../../types/Recipe";
import { RecipeList } from "../Recipe/RecipeList/RecipeList";

interface MyRecipesProps {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

export function MyRecipes({ recipes, setRecipes }: MyRecipesProps) {
  const NoRecipesFound = () => {
    return (
      <div className="flex flex-col text-xl gap-4">
        <div>
          <span>You have no recipes saved.</span>
        </div>
        <div>
          <Link to="/recipes">
            <span className="text-sky-600 hover:underline">View all recipes</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="py-8">
      {recipes.length == 0 ? NoRecipesFound() : <></>}
      <div className="p-16">
        <RecipeList
          recipes={recipes}
          setRecipes={setRecipes}
        />
      </div>
    </div>
  );
}
