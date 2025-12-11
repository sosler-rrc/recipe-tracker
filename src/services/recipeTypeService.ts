import * as recipeTypeRepo from "@/apis/recipeTypeRepo";

export async function fetchRecipeTypes() {
  return await recipeTypeRepo.getRecipesTypes();
}
