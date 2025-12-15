import { RecipeList } from "@/components/Recipe/RecipeList";
import type { Recipe } from "@/types/Recipe";
import type { RecipeType } from "@/types/RecipeType";

interface RecipesProps {
  recipes: Recipe[];
  recipeTypes: RecipeType[];
  loadingRecipes: boolean;
  recipesError: string | null;
  onRecipeDelete: (recipeId: string) => void;
  onRecipeSaved: (recipe: Recipe) => void;
  setSearchTerm: (searchTerm: string) => void;
  setRecipeType: (recipeTypeId: string) => void;
}

export function Recipes({ recipes, recipeTypes, loadingRecipes, recipesError, onRecipeDelete, onRecipeSaved, setSearchTerm, setRecipeType }: RecipesProps) {
  return (
    <div className="lg:px-16 pt-8">
      <RecipeList
        recipes={recipes}
        recipeTypes={recipeTypes}
        loadingRecipes={loadingRecipes}
        recipesError={recipesError}
        onRecipeDelete={onRecipeDelete}
        onRecipeSaved={onRecipeSaved}
        setRecipeType={setRecipeType}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}
