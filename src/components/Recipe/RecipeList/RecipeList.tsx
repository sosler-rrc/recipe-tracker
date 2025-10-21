import type { Recipe } from "../../../types/Recipe";
import type { RecipeType } from "../../../types/RecipeType";
import { RecipeItem } from "../RecipeItem/RecipeItem";
interface RecipeListProps {
  recipes: Recipe[];
  recipeTypes: RecipeType[];

  onRecipeSaved: (recipe: Recipe) => void;
  onRecipeDelete: (recipeId: string) => void;
}

export function RecipeList({ recipes, recipeTypes, onRecipeSaved, onRecipeDelete }: RecipeListProps) {
  return (
    <section className="recipe-list">
      {recipes.map((x) => (
        <RecipeItem
          key={x.id}
          recipe={x}
          recipeTypes={recipeTypes}
          onRecipeSaved={onRecipeSaved}
          onRecipeDelete={onRecipeDelete}
        />
      ))}
    </section>
  );
}
