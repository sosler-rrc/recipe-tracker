import * as recipeRepo from "../apis/recipeRepo";
import type { Recipe } from "../types/Recipe";

export async function fetchRecipes(sessionToken: string) {
  const recipes = await recipeRepo.getRecipes(sessionToken);
  return recipes;
}

export async function createNewRecipe(recipe: Recipe, sessionToken: string) {
  return await recipeRepo.createRecipe(recipe, sessionToken);
}

export async function updateRecipe(recipe: Recipe, sessionToken: string) {
  return await recipeRepo.updateRecipe(recipe, sessionToken);
}

export async function deleteRecipe(recipeId: string, sessionToken: string) {
  return await recipeRepo.deleteRecipe(recipeId, sessionToken);
}

export async function toggleSavedRecipe(recipe: Recipe, sessionToken: string) {
  recipe.saved = !recipe.saved;
  return await recipeRepo.updateRecipe(recipe, sessionToken);
}
