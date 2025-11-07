import { useCallback, useEffect, useState } from "react";
import * as RecipeService from "../services/recipeService";
import type { Recipe } from "../types/Recipe";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

export function useRecipes(dependencies: unknown[]) {
  const { getToken, isSignedIn } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [userSavedRecipeIds, setUserSavedRecipeIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const fetchRecipes = useCallback(async () => {
    if (!isSignedIn) return;
    setLoading(true);
    try {
      let sessionToken = (await getToken()) ?? null;

      if (!sessionToken) {
        throw new Error("Unauthorized");
      }
      const [recipesData, savedIds] = await Promise.all([RecipeService.fetchRecipes(sessionToken), RecipeService.fetchUserSavedRecipes(sessionToken)]);

      setRecipes(recipesData);
      setUserSavedRecipeIds(savedIds);
    } catch (errorObject) {
      setError(`${errorObject}`);
    } finally {
      setLoading(false);
    }
  }, [getToken, isSignedIn]);

  const deleteRecipe = useCallback(
    async (recipeId: string) => {
      try {
        let sessionToken = (await getToken()) ?? null;

        if (!sessionToken) {
          throw new Error("Unauthorized");
        }
        await RecipeService.deleteRecipe(recipeId, sessionToken);

        setRecipes((prev) => prev.filter((r) => r.id !== recipeId));

        //display a toast message when a recipe has been removed
        toast("Recipe has been deleted", {
          position: "bottom-center",
          theme: "light",
          hideProgressBar: true,
          closeButton: false,
          autoClose: 2500,
        });
      } catch (errorObject) {
        setError(`${errorObject}`);
      }
    },
    [getToken]
  );

  const toggleSavedRecipe = useCallback(
    async (recipe: Recipe) => {
      try {
        let sessionToken = (await getToken()) ?? null;

        if (!sessionToken) {
          throw new Error("Unauthorized");
        }
        const isSaved = userSavedRecipeIds.includes(recipe.id);
        await RecipeService.toggleSavedRecipe(recipe.id, sessionToken);

        setUserSavedRecipeIds((prev) => (isSaved ? prev.filter((id) => id !== recipe.id) : [...prev, recipe.id]));

        // display a toast message when a recipe has saved / un-saved
        toast(`${isSaved ? "Removed item from saved recipes" : "Added new item to saved recipes"}`, {
          position: "bottom-center",
          theme: "light",
          hideProgressBar: true,
          closeButton: false,
          autoClose: 2500,
        });
      } catch (errorObject) {
        setError(`${errorObject}`);
      }
    },
    [getToken, userSavedRecipeIds]
  );

  useEffect(() => {
    console.log("Fetching recipes...");
    fetchRecipes();
  }, [fetchRecipes, ...dependencies]);

  return {
    recipes,
    userSavedRecipeIds,
    loading,
    error,
    toggleSavedRecipe,
    deleteRecipe,
  };
}
