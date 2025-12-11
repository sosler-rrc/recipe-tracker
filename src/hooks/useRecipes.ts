import { useCallback, useEffect, useState } from "react";
import * as RecipeService from "@/services/recipeService";
import type { Recipe } from "@/types/Recipe";
import { toast } from "react-toastify";

export function useRecipes(dependencies: unknown[]) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [recipesError, setRecipesError] = useState<string | null>(null);

  const fetchRecipes = useCallback(async () => {
    setLoadingRecipes(true);
    setRecipesError(null);
    try {
      const recipesData = await RecipeService.fetchRecipes();
      setRecipes(recipesData);
    } catch (errorObject) {
      setRecipesError("Unable to fetch recipes due to an unexpected error");
    } finally {
      setLoadingRecipes(false);
    }
  }, []);

  const deleteRecipe = useCallback(
    async (recipeId: string) => {
      try {
        const res = window.confirm("Are you sure you'd like to delete this recipe? This cannot be undone.");

        if (res) {
          await RecipeService.deleteRecipe(recipeId);

          setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
          //display a toast message when a recipe has been removed
          toast("Recipe has been deleted", {
            position: "bottom-center",
            theme: "light",
            hideProgressBar: true,
            closeButton: false,
            autoClose: 2500,
          });
        }
      } catch (errorObject) {
        toast("Unable to delete recipe due to an unexpected error", {
          position: "bottom-center",
          theme: "light",
          hideProgressBar: true,
          closeButton: false,
          autoClose: 2500,
        });
      }
      await fetchRecipes();
    },
    [fetchRecipes]
  );

  const toggleSavedRecipe = useCallback(
    async (recipe: Recipe) => {
      try {
        const isSaved = recipe.recipeSaved;
        await RecipeService.toggleSavedRecipe(recipe.id);

        // display a toast message when a recipe has saved / un-saved
        toast(`${isSaved ? "Removed item from saved recipes" : "Added new item to saved recipes"}`, {
          position: "bottom-center",
          theme: "light",
          hideProgressBar: true,
          closeButton: false,
          autoClose: 2500,
        });
      } catch (errorObject) {
        toast("Unable to save recipe due to an unexpected error", {
          position: "bottom-center",
          theme: "light",
          hideProgressBar: true,
          closeButton: false,
          autoClose: 2500,
        });
      }
      await fetchRecipes();
    },
    [fetchRecipes]
  );

  useEffect(() => {
    console.log("Fetching recipes...");
    fetchRecipes();
  }, [...dependencies, fetchRecipes]);

  return {
    recipes,
    loadingRecipes,
    recipesError,
    toggleSavedRecipe,
    deleteRecipe,
  };
}
