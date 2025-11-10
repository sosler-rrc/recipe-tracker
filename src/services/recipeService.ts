import * as recipeRepo from "../apis/recipeRepo";
import type { CreateUpdateRecipe } from "../types/CreateUpdateRecipe";

export async function fetchRecipes() {
  return await recipeRepo.getRecipes();
}

export async function fetchUserSavedRecipes(sessionToken: string) {
  return await recipeRepo.getUserSavedRecipes(sessionToken);
}

export async function createNewRecipe(recipe: CreateUpdateRecipe, sessionToken: string) {
  return await recipeRepo.createRecipe(recipe, sessionToken);
}

export async function updateRecipe(recipe: CreateUpdateRecipe, sessionToken: string) {
  return await recipeRepo.updateRecipe(recipe, sessionToken);
}

export async function deleteRecipe(recipeId: string, sessionToken: string) {
  return await recipeRepo.deleteRecipe(recipeId, sessionToken);
}

export async function toggleSavedRecipe(recipeId: string, sessionToken: string) {
  return await recipeRepo.toggleUserSavedRecipe(recipeId, sessionToken);
}
