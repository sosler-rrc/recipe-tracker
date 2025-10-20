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

export async function validateRecipe(recipe: Recipe, ingredients: string[], steps: string[]) {
  const validationErrors = new Map<string, string>();

  if (!recipe.name?.trim()) validationErrors.set("name", "Name must be defined");
  if (!recipe.description?.trim()) validationErrors.set("description", "Description must be defined");
  if (!recipe.recipeTypeId) validationErrors.set("recipeTypeId", "Recipe Type must be selected");
  if (recipe.cookTime <= 0) validationErrors.set("cookTime", "Cooktime must be greater than 0");
  if (recipe.prepTime <= 0) validationErrors.set("prepTime", "Preptime must be greater than 0");
  if (recipe.servings <= 0) validationErrors.set("servings", "Servings must be greater than 0");
  if (recipe.ovenTemp != undefined && recipe.ovenTemp <= 0) validationErrors.set("ovenTemp", "Oven Temp must be greater than 0");

  if (steps.length <= 0) validationErrors.set("steps", "You must define 1 recipe step");
  if (ingredients.length <= 0) validationErrors.set("ingredients", "You must define 1 recipe ingredient");

  return validationErrors;
}
