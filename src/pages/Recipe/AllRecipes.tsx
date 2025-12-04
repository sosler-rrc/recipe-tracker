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
        savedRecipeIds={recipeData.userSavedRecipeIds}
        loading={recipeData.loading}
        onRecipeSaved={recipeData.toggleSavedRecipe}
        onRecipeDelete={recipeData.deleteRecipe}
        onRecipeComment={recipeData.createRecipeComment}
        onDeleteComment={recipeData.deleteRecipeComment}
        setRecipeType={setRecipeType}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}
