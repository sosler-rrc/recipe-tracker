import { useEffect, useState } from "react";
import * as RecipeService from "../services/recipeService";
import type { Recipe } from "../types/Recipe";
import { toast } from "react-toastify";

export function useRecipes(dependencies: unknown[]) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>();

  const fetchRecipes = async () => {
    try {
      let result = await RecipeService.fetchRecipes();

      setRecipes([...result]);
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  const deleteRecipe = async (recipeId: string) => {
    try {
      await RecipeService.deleteRecipe(recipeId);
      //display a toast message when a recipe has been removed
      toast("Recipe has been deleted", {
        position: "bottom-center",
        theme: "light",
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2500,
      });

      await fetchRecipes();
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  const toggleSavedRecipe = async (recipe: Recipe) => {
    try {
      //display a toast message when a recipe has saved / un-saved
      const message = `${!recipe.saved ? "Added new item to saved recipes" : "Removed item from saved recipes"}`;
      await RecipeService.toggleSavedRecipe(recipe);
      toast(message, {
        position: "bottom-center",
        theme: "light",
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2500,
      });
      await fetchRecipes();
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [...dependencies]);

  return {
    recipes,
    error,
    toggleSavedRecipe,
    deleteRecipe,
  };
}
