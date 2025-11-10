import { useRecipes } from "../../hooks/useRecipes";
import { RecipeList } from "../../components/Recipe/RecipeList/RecipeList";
import { useFilteredRecipes } from "../../hooks/useFilteredRecipes";
import { useRecipeTypes } from "../../hooks/useRecipeTypes";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

export function MyRecipes() {
  const { recipes, userSavedRecipeIds, loading, toggleSavedRecipe, deleteRecipe } = useRecipes([]);
  let navigate = useNavigate();
  const { user } = useUser();
  const { recipeTypes } = useRecipeTypes([]);
  const { filteredRecipes, setRecipeType, setSearchTerm } = useFilteredRecipes(recipes, [], (recipe) => recipe.userId == user?.id);

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
