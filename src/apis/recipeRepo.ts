import type { BaseResponse } from "../types/BaseResponse";
import type { Recipe } from "../types/Recipe";

//Setup the base url with the route prefix using the VITE_API_BASE_URL variable defined in the .env file
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export async function getRecipes() {
  const recipeResponse: Response = await fetch(`${BASE_URL}/recipes`);

  if (!recipeResponse.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const json: BaseResponse<Recipe[]> = await recipeResponse.json();
  return json.data;
}

export async function getRecipeById(recipeId: string): Promise<Recipe> {
  const recipeResponse: Response = await fetch(`${BASE_URL}/recipes/${recipeId}`);

  if (!recipeResponse.ok) {
    throw new Error(`Failed to fetch recipe with id ${recipeId}`);
  }

  const json: BaseResponse<Recipe> = await recipeResponse.json();
  return json.data;
}

export async function createRecipe(recipe: Recipe) {
  const createResponse: Response = await fetch(`${BASE_URL}/recipes/create`, {
    method: "POST",
    body: JSON.stringify({ ...recipe }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!createResponse.ok) {
    throw new Error(`Failed to create recipe`);
  }

  const json: BaseResponse<Recipe> = await createResponse.json();
  return json.data;
}

export async function updateRecipe(recipe: Recipe) {
  const updateResponse: Response = await fetch(`${BASE_URL}/recipes/update/${recipe.id}`, {
    method: "PUT",
    body: JSON.stringify({ ...recipe }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!updateResponse.ok) {
    throw new Error(`Failed to update recipe with id ${recipe.id}`);
  }

  const json: BaseResponse<Recipe> = await updateResponse.json();
  return json.data;
}

export async function deleteRecipe(recipeId: string): Promise<void> {
  const recipeResponse: Response = await fetch(`${BASE_URL}/recipes/delete/${recipeId}`, {
    method: "DELETE",
  });

  if (!recipeResponse.ok) {
    throw new Error(`Failed to fetch recipe with id ${recipeId}`);
  }
}
