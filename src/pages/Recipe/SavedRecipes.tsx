import { RecipeList } from "@/components/Recipe/RecipeList";
import type { Recipe } from "@/types/Recipe";
import type { RecipeType } from "@/types/RecipeType";

interface SavedRecipesProps {
  recipes: Recipe[];
  recipeTypes: RecipeType[];
  loadingRecipes: boolean;
  recipesError: string | null;
  onRecipeDelete: (recipeId: string) => void;
  onRecipeSaved: (recipe: Recipe) => void;
  setSearchTerm: (searchTerm: string) => void;
  setRecipeType: (recipeTypeId: string) => void;
}

export function SavedRecipes({
  recipes,
  recipeTypes,
  loadingRecipes,
  recipesError,
  onRecipeDelete,
  onRecipeSaved,
  setSearchTerm,
  setRecipeType,
}: SavedRecipesProps) {
  return (
    <div className="p-16">
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
