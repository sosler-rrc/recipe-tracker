import { useNavigate, useParams } from "react-router";
import { RecipeItem } from "../../components/Recipe/RecipeItem/RecipeItem";
import { useRecipes } from "../../hooks/useRecipes";
import { useEffect } from "react";
import { useRecipeTypes } from "../../hooks/useRecipeTypes";

export function ViewRecipe() {
  let navigate = useNavigate();
  const { recipes, userSavedRecipeIds, toggleSavedRecipe, deleteRecipe, createRecipeComment, deleteRecipeComment } = useRecipes([]);
  const { recipeTypes } = useRecipeTypes([]);
  const { id } = useParams();

  const selectedRecipe = recipes.find((x) => x.id == id);
  useEffect(() => {
    if (!selectedRecipe && recipes.length > 0) {
      navigate("/not-found"); //nagivate to 404 when no recipe is found
    }
  }, [selectedRecipe, recipes.length, navigate]);

  if (!selectedRecipe) {
    return null;
  }

  return (
    <RecipeItem
      recipe={selectedRecipe}
      recipeTypes={recipeTypes}
      savedRecipeIds={userSavedRecipeIds}
      onRecipeComment={createRecipeComment}
      onRecipeSaved={toggleSavedRecipe}
      onRecipeDelete={deleteRecipe}
      onDeleteComment={deleteRecipeComment}
      standalone={true}
    />
  );
}
