import * as recipeRepo from "../apis/recipeRepo";
import type { Recipe } from "../types/Recipe";

export async function fetchRecipes() {
  const recipes = await recipeRepo.getRecipes();
  return recipes;
}

export async function createNewRecipe(recipe: Recipe) {
  await recipeRepo.createRecipe(recipe);
}

export async function updateRecipe(recipe: Recipe) {
  await recipeRepo.updateRecipe(recipe);
}

export async function toggleSavedRecipe(recipeId: string) {
  const recipe = await recipeRepo.getRecipeById(recipeId);
  await recipeRepo.updateSavedRecipe(recipeId, !recipe.recipeSaved);
}
