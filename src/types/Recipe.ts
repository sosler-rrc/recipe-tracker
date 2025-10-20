export interface Recipe {
  id: string;
  name: string;
  description: string;
  recipeTypeId: string;

  ingredients: string[];
  steps: string[];

  servings: number;
  prepTime: number; // mins
  cookTime: number; // mins
  saved: boolean;
  ovenTemp?: number;
}
