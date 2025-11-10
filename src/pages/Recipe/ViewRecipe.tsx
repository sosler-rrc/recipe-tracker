import { useNavigate, useParams } from "react-router";
import { RecipeItem } from "../../components/Recipe/RecipeItem/RecipeItem";
import { useRecipes } from "../../hooks/useRecipes";
import { useEffect } from "react";
import { useRecipeTypes } from "../../hooks/useRecipeTypes";

export function ViewRecipe() {
  let navigate = useNavigate();
  const { recipes, userSavedRecipeIds, toggleSavedRecipe, deleteRecipe } = useRecipes([]);
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
      onRecipeSaved={toggleSavedRecipe}
      onRecipeDelete={deleteRecipe}
      standalone={true}
    />
  );
}
