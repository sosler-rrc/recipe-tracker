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
  recipeSaved: boolean;
  ovenTemp?: number;

  image: string;
}
