import * as recipeRepo from "../apis/recipeRepo";
import type { Recipe } from "../types/Recipe";

export async function fetchRecipes() {
  const recipes = await recipeRepo.getRecipes();
  return recipes;
}

export async function createNewRecipe(recipe: Recipe) {
  return await recipeRepo.createRecipe(recipe);
}

export async function updateRecipe(recipe: Recipe) {
  return await recipeRepo.updateRecipe(recipe);
}

export async function deleteRecipe(recipeId: string) {
  return await recipeRepo.deleteRecipe(recipeId);
}

export async function toggleSavedRecipe(recipe: Recipe) {
  recipe.saved = !recipe.saved;
  return await recipeRepo.updateRecipe(recipe);
}
