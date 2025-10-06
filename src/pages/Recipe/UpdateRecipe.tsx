import { useParams } from "react-router";
import { RecipeForm } from "../../components/Recipe/RecipeForm/RecipeForm/RecipeForm";

export function UpdateRecipe() {
  const { id } = useParams();

  return (
    <RecipeForm
      formMode="edit"
      recipeId={id}
    />
  );
}
