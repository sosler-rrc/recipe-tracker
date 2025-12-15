import type { CreateUpdateRecipe } from "@/types/CreateUpdateRecipe";
import { recipeData } from "../data/mockData";
import type { Recipe } from "../types/Recipe";
import { v4 as uuidv4 } from "uuid";

export function getRecipes() {
  return [...recipeData];
}

export function getRecipeById(recipeId: string): Recipe {
  const foundRecipe = recipeData.find((t) => t.id === recipeId);

  if (!foundRecipe) {
    throw new Error(`Failed to fetch recipe with ${recipeId}`);
  }

  return foundRecipe;
}

export async function createRecipe(recipe: CreateUpdateRecipe) {
  const data = {
    ...recipe,
    id: uuidv4(),
    updatedAt: new Date(),
    createdAt: new Date(),
    recipeSaved: true,
  };
  recipeData.push(data);
  return data;
}

export async function updateRecipe(recipe: CreateUpdateRecipe) {
  const foundRecipeIndex = recipeData.findIndex((t) => t.id === recipe.id);

  if (foundRecipeIndex === -1) {
    throw new Error(`Failed to update recipe with ${recipe.id}`);
  }

  recipeData[foundRecipeIndex] = {
    ...recipe,
    id: recipe.id ?? uuidv4(),
    updatedAt: new Date(),
    createdAt: new Date(),
    recipeSaved: false,
  };
  return recipeData[foundRecipeIndex];
}

export async function deleteRecipe(recipeId: string) {
  const foundRecipeIndex = recipeData.findIndex((t) => t.id === recipeId);

  if (foundRecipeIndex === -1) {
    throw new Error(`Failed to find recipe with ${recipeId}`);
  }

  return recipeData.splice(foundRecipeIndex, 1);
}

export async function updateSavedRecipe(recipeId: string) {
  const foundRecipe = recipeData.find((t) => t.id === recipeId);

  if (!foundRecipe) {
    throw new Error(`Failed to fetch recipe with ${recipeId}`);
  } else {
    foundRecipe.recipeSaved = !foundRecipe.recipeSaved;
  }

  return foundRecipe;
}
