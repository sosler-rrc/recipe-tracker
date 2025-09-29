import * as recipeRepo from "../apis/recipeRepo";

export async function fetchRecipes() {
  const recipes = await recipeRepo.getRecipes();
  return recipes;
}

export async function toggleSavedRecipe(recipeId: string) {
  const recipe = await recipeRepo.getRecipeById(recipeId);
  await recipeRepo.updateSavedRecipe(recipeId, !recipe.recipeSaved);
}
