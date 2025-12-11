import { useRecipes } from "./useRecipes";
import { useRecipeTypes } from "./useRecipeTypes";

export function useRecipeData() {
  const { recipes, loadingRecipes, recipesError, deleteRecipe, toggleSavedRecipe } = useRecipes([]);
  const { recipeTypes } = useRecipeTypes([]);

  return {
    recipes,
    recipeTypes,
    loadingRecipes,
    recipesError,
    toggleSavedRecipe,
    deleteRecipe,
  };
}
