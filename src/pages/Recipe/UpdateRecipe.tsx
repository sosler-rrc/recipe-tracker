import { RecipeForm } from "@/components/Recipe/RecipeForm/RecipeForm";
import { useParams } from "react-router";
import type { Recipe } from "@/types/Recipe";
import type { RecipeType } from "@/types/RecipeType";

interface UpdateRecipeProps {
  recipes: Recipe[];
  recipeTypes: RecipeType[];
  onRecipesFetch: () => void;
}

export function UpdateRecipe({ recipes, recipeTypes, onRecipesFetch }: UpdateRecipeProps) {
  const { id } = useParams();

  return (
    <RecipeForm
      formMode="edit"
      recipeId={id}
      recipes={recipes}
      recipeTypes={recipeTypes}
      onRecipesFetch={onRecipesFetch}
    />
  );
}
