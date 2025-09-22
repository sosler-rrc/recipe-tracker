import type { Recipe } from "../../types/Recipe";
import { CreateRecipeForm } from "../Recipe/RecipeForm/CreateRecipeForm/CreateRecipeForm";

interface CreateRecipeProps {
  onCreateRecipe: (recipe: Recipe) => void;
}

export function CreateRecipe({ onCreateRecipe }: CreateRecipeProps) {
  return <CreateRecipeForm onCreateRecipe={onCreateRecipe} />;
}
