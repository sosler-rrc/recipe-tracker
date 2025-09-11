import type { RecipeType } from "./RecipeType";

export interface Recipe {
  id: string;
  name: string;
  description: string;
  type: RecipeType;

  ingredients: string[];
  steps: string[];

  servings: number;
  prepTime: number; // mins
  cookTime: number; // mins
  ovenTemp?: number;

  image: string;
}
