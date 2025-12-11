export interface Recipe {
  id: string;
  name: string;
  description: string;
  recipeTypeId: string;

  ingredients: string[];
  steps: string[];

  recipeSaved: boolean;

  servings?: number;
  prepTime?: number; // mins
  cookTime?: number; // mins
  ovenTemp?: number;
  updatedAt: Date;
  createdAt: Date;
}
