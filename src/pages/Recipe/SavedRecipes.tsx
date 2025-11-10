import { useRecipes } from "../../hooks/useRecipes";
import { RecipeList } from "../../components/Recipe/RecipeList/RecipeList";
import { useFilteredRecipes } from "../../hooks/useFilteredRecipes";
import { useRecipeTypes } from "../../hooks/useRecipeTypes";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

export function SavedRecipes() {
  const { recipes, userSavedRecipeIds, loading, toggleSavedRecipe, deleteRecipe } = useRecipes([]);
  const { recipeTypes } = useRecipeTypes([]);
  const { filteredRecipes, setRecipeType, setSearchTerm } = useFilteredRecipes(
    recipes,
    [],
    (recipe) => userSavedRecipeIds.findIndex((x) => x == recipe.id) != -1
  );
  const { user } = useUser();
  let navigate = useNavigate();

  if (!user) {
    navigate("/not-found");
  }

  return (
    <div className="p-16">
      <RecipeList
        recipes={filteredRecipes}
        recipeTypes={recipeTypes}
        savedRecipeIds={userSavedRecipeIds}
        loading={loading}
        onRecipeDelete={deleteRecipe}
        onRecipeSaved={toggleSavedRecipe}
        setRecipeType={setRecipeType}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}
