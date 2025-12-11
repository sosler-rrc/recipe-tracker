import type { Recipe } from "@/types/Recipe";
import type { RecipeType } from "@/types/RecipeType";
import { RecipeItem } from "./RecipeItem";
import { LoadingSpinner } from "@/components/ui";
import { NoRecipesFound } from "./NoRecipesFound";
import { RecipeListFilter } from "./RecipeListFilters";

interface RecipeListProps {
  recipes: Recipe[];
  recipeTypes: RecipeType[];
  loadingRecipes: boolean;
  recipesError: string | null;

  onRecipeSaved: (recipe: Recipe) => void;
  onRecipeDelete: (recipeId: string) => void;

  setSearchTerm: (val: string) => void;
  setRecipeType: (val: string) => void;
}

export function RecipeList({
  recipes,
  recipeTypes,
  loadingRecipes,
  recipesError,
  onRecipeSaved,
  onRecipeDelete,
  setSearchTerm,
  setRecipeType,
}: RecipeListProps) {
  return (
    <section className="recipe-list">
      <RecipeListFilter
        recipes={recipes}
        recipeTypes={recipeTypes}
        setRecipeType={setRecipeType}
        setSearchTerm={setSearchTerm}
      />
      {loadingRecipes && (
        <div className="flex justify-around mt-16">
          <LoadingSpinner />
        </div>
      )}

      {!loadingRecipes && recipesError != null && <div className="text-red-400 text-xl font-semibold mt-4">{recipesError}</div>}

      {!loadingRecipes && !recipesError && recipes.length === 0 && <NoRecipesFound />}

      {!loadingRecipes &&
        !recipesError &&
        recipes.length > 0 &&
        recipes.map((x) => (
          <div className="mt-2">
            <RecipeItem
              key={x.id}
              recipe={x}
              recipeTypes={recipeTypes}
              onRecipeSaved={onRecipeSaved}
              onRecipeDelete={onRecipeDelete}
            />
          </div>
        ))}
    </section>
  );
}
