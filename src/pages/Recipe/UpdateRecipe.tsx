import { RecipeForm } from "@/components/Recipe/RecipeForm/RecipeForm";
import { useParams } from "react-router";

export function UpdateRecipe() {
  const { id } = useParams();

  return (
    <RecipeForm
      formMode="edit"
      recipeId={id}
    />
  );
}
