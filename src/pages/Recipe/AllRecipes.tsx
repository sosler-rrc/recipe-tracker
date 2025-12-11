import { RecipeList } from "@/components/Recipe/RecipeList";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { useRecipeData } from "@/hooks/useRecipeData";

export function Recipes() {
  const recipeData = useRecipeData();
  const { filteredRecipes, setSearchTerm, setRecipeType } = useFilteredRecipes(recipeData.recipes, recipeData.recipeTypes, null);

  return (
    <div className="lg:px-16 pt-8">
      <RecipeList
        recipes={filteredRecipes}
        recipeTypes={recipeData.recipeTypes}
        loadingRecipes={recipeData.loadingRecipes}
        recipesError={recipeData.recipesError}
        onRecipeSaved={recipeData.toggleSavedRecipe}
        onRecipeDelete={recipeData.deleteRecipe}
        setRecipeType={setRecipeType}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}
