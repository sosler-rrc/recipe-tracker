import * as recipeRepo from "@/apis/recipeRepo";
import type { CreateUpdateRecipe } from "@/types/CreateUpdateRecipe";

export async function fetchRecipes() {
  return await recipeRepo.getRecipes();
}

export async function createNewRecipe(recipe: CreateUpdateRecipe) {
  return await recipeRepo.createRecipe(recipe);
}

export async function updateRecipe(recipe: CreateUpdateRecipe) {
  return await recipeRepo.updateRecipe(recipe);
}

export async function deleteRecipe(recipeId: string) {
  return await recipeRepo.deleteRecipe(recipeId);
}

export async function toggleSavedRecipe(recipeId: string) {
  return await recipeRepo.updateSavedRecipe(recipeId);
}
