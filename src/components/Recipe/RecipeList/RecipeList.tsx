import { Link } from "react-router";
import type { Recipe } from "../../../types/Recipe";
import type { RecipeType } from "../../../types/RecipeType";
import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";
import { RecipeItem } from "../RecipeItem/RecipeItem";
import { LoadingSpinner } from "../../ui/LoadingSpinner";
interface RecipeListProps {
  recipes: Recipe[];
  recipeTypes: RecipeType[];
  savedRecipeIds: string[];
  loading: boolean;

  onRecipeSaved: (recipe: Recipe) => void;
  onRecipeDelete: (recipeId: string) => void;
  onRecipeComment: (recipeId: string, text: string) => void;
  onDeleteComment: (recipeId: string, commentId: string) => void;

  setSearchTerm: (val: string) => void;
  setRecipeType: (val: string) => void;
}

export function RecipeList({
  recipes,
  recipeTypes,
  savedRecipeIds,
  loading,
  onRecipeSaved,
  onRecipeDelete,
  onRecipeComment,
  onDeleteComment,
  setSearchTerm,
  setRecipeType,
}: RecipeListProps) {
  const NoRecipesFound = () => {
    return (
      <div className="flex flex-col text-xl gap-4 mt-8">
        <div>
          <span>No recipes found</span>
        </div>
        <div>
          <Link to="/recipes">
            <span className="text-sky-600 hover:underline">View all recipes</span>
          </Link>
        </div>
      </div>
    );
  };
  return (
    <section className="recipe-list">
      <div className="flex justify-between gap-6">
        <Input
          className="w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Find a recipe"
        />
        <Select
          className="w-40"
          onChange={(e) => setRecipeType(e.target.value)}>
          <option
            selected
            value={undefined}>
            All
          </option>
          {recipeTypes.map((x) => (
            <option
              key={x.id}
              value={x.id}>
              {x.name}
            </option>
          ))}
        </Select>
      </div>
      <span>{recipes.length} results</span>
      {loading ? (
        <div className="flex justify-around mt-16">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {recipes.length == 0 && !loading ? NoRecipesFound() : <></>}
          {recipes.map((x) => (
            <RecipeItem
              key={x.id}
              recipe={x}
              recipeTypes={recipeTypes}
              savedRecipeIds={savedRecipeIds}
              onRecipeSaved={onRecipeSaved}
              onRecipeDelete={onRecipeDelete}
              onRecipeComment={onRecipeComment}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </>
      )}
    </section>
  );
}
