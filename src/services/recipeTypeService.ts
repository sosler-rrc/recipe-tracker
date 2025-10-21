import * as recipeTypeRepo from "../apis/recipeTypeRepo";
import type { RecipeType } from "../types/RecipeType";

export async function fetchRecipeTypes() {
  const recipeTypes = await recipeTypeRepo.getRecipeTypes();
  return recipeTypes;
}

export async function createNewRecipeType(recipeType: RecipeType) {
  return await recipeTypeRepo.createRecipeType(recipeType);
}

export async function updateRecipe(recipeType: RecipeType) {
  return await recipeTypeRepo.updateRecipeTypes(recipeType);
}
