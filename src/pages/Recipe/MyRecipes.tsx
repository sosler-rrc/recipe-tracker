import { Link } from "react-router";
import type { Recipe } from "../../types/Recipe";
import { useRecipes } from "../../hooks/useRecipes";
import { RecipeList } from "../../components/Recipe/RecipeList/RecipeList";

interface MyRecipesProps {
  recipeDependencies: any[];
  recipeFilterFn: ((recipe: Recipe) => boolean) | null;
}
export function MyRecipes({ recipeDependencies, recipeFilterFn }: MyRecipesProps) {
  const { recipes, toggleSavedRecipe, deleteRecipe } = useRecipes(recipeDependencies, recipeFilterFn);

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
          onRecipeDelete={deleteRecipe}
          onRecipeSaved={toggleSavedRecipe}
        />
      </div>
    </div>
  );
}
