import { useRecipes } from "../../hooks/useRecipes";
import { RecipeList } from "../../components/Recipe/RecipeList/RecipeList";
import { useRecipeTypes } from "../../hooks/useRecipeTypes";
import { useFilteredRecipes } from "../../hooks/useFilteredRecipes";

export function Recipes() {
  const { recipes, userSavedRecipeIds, loading, toggleSavedRecipe, deleteRecipe } = useRecipes([]);
  const { recipeTypes } = useRecipeTypes([]);
  const { filteredRecipes, setSearchTerm, setRecipeType } = useFilteredRecipes(recipes, recipeTypes, null);

  return (
    <div className="p-16">
      <RecipeList
        recipes={filteredRecipes}
        recipeTypes={recipeTypes}
        savedRecipeIds={userSavedRecipeIds}
        loading={loading}
        onRecipeSaved={toggleSavedRecipe}
        onRecipeDelete={deleteRecipe}
        setRecipeType={setRecipeType}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}
