import { RecipeForm } from "@/components/Recipe/RecipeForm/RecipeForm";
import type { Recipe } from "@/types/Recipe";
import type { RecipeType } from "@/types/RecipeType";

interface CreateRecipeProps {
  recipes: Recipe[];
  recipeTypes: RecipeType[];
  onRecipesFetch: () => void;
}

export function CreateRecipe({ recipes, recipeTypes, onRecipesFetch }: CreateRecipeProps) {
  return (
    <RecipeForm
      formMode="create"
      recipes={recipes}
      recipeTypes={recipeTypes}
      onRecipesFetch={onRecipesFetch}
    />
  );
}
