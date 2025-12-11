import { RecipeList } from "@/components/Recipe/RecipeList";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { useRecipeData } from "@/hooks/useRecipeData";

export function SavedRecipes() {
  const recipeData = useRecipeData();
  const { filteredRecipes, setRecipeType, setSearchTerm } = useFilteredRecipes(recipeData.recipes, recipeData.recipeTypes, (recipe) => recipe.recipeSaved);

  return (
    <div className="p-16">
      <RecipeList
        recipes={filteredRecipes}
        recipeTypes={recipeData.recipeTypes}
        loadingRecipes={recipeData.loadingRecipes}
        recipesError={recipeData.recipesError}
        onRecipeDelete={recipeData.deleteRecipe}
        onRecipeSaved={recipeData.toggleSavedRecipe}
        setRecipeType={setRecipeType}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}
