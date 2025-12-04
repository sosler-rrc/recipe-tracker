import { useRecipes } from "./useRecipes";
import { useRecipeTypes } from "./useRecipeTypes";

export function useRecipeData() {
  const { recipes, userSavedRecipeIds, loading, toggleSavedRecipe, deleteRecipe, createRecipeComment, deleteRecipeComment } = useRecipes([]);
  const { recipeTypes } = useRecipeTypes([]);

  return {
    recipes,
    recipeTypes,
    userSavedRecipeIds,
    loading,
    toggleSavedRecipe,
    deleteRecipe,
    createRecipeComment,
    deleteRecipeComment,
  };
}
