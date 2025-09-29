import { recipeData } from "../data/mockRecipes";
import type { Recipe } from "../types/Recipe";

export function getRecipes() {
  return recipeData;
}

export function getRecipeById(recipeId: string): Recipe {
  const foundRecipe = recipeData.find((t) => t.id === recipeId);

  if (!foundRecipe) {
    throw new Error(`Failed to fetch recipe with ${recipeId}`);
  }

  return foundRecipe;
}

export async function updateRecipe(recipe: Recipe) {
  const foundRecipeIndex = recipeData.findIndex((t) => t.id === recipe.id);

  if (foundRecipeIndex === -1) {
    throw new Error(`Failed to update recipe with ${recipe.id}`);
  }

  recipeData[foundRecipeIndex] = recipe;
  return recipeData[foundRecipeIndex];
}

export async function updateSavedRecipe(recipeId: string, recipeSaved: boolean) {
  const foundRecipe = recipeData.find((t) => t.id === recipeId);

  if (!foundRecipe) {
    throw new Error(`Failed to fetch recipe with ${recipeId}`);
  } else {
    foundRecipe.recipeSaved = recipeSaved;
  }

  return foundRecipe;
}
