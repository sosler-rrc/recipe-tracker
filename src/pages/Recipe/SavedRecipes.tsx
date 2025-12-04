import { RecipeList } from "@/components/Recipe/RecipeList";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { useRecipeData } from "@/hooks/useRecipeData";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

export function SavedRecipes() {
  const recipeData = useRecipeData();
  const { filteredRecipes, setRecipeType, setSearchTerm } = useFilteredRecipes(
    recipeData.recipes,
    [],
    (recipe) => recipeData.userSavedRecipeIds.findIndex((x) => x == recipe.id) != -1
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
        recipeTypes={recipeData.recipeTypes}
        savedRecipeIds={recipeData.userSavedRecipeIds}
        loading={recipeData.loading}
        onRecipeDelete={recipeData.deleteRecipe}
        onRecipeSaved={recipeData.toggleSavedRecipe}
        onRecipeComment={recipeData.createRecipeComment}
        onDeleteComment={recipeData.deleteRecipeComment}
        setRecipeType={setRecipeType}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}
