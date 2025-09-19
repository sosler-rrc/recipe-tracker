import type { Recipe } from "../../types/Recipe";
import { RecipeForm } from "../Recipe/RecipeForm/RecipeForm";

interface CreateRecipeProps {
  onCreateRecipe: (recipe: Recipe) => void;
}

export function CreateRecipe({ onCreateRecipe }: CreateRecipeProps) {
  return <RecipeForm onCreateRecipe={onCreateRecipe} />;
}
