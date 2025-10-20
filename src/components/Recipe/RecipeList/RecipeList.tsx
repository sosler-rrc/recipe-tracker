import type { Recipe } from "../../../types/Recipe";
import { RecipeItem } from "../RecipeItem/RecipeItem";
interface RecipeListProps {
  recipes: Recipe[];
  onRecipeSaved: (recipe: Recipe) => void;
  onRecipeDelete: (recipeId: string) => void;
}

export function RecipeList({ recipes, onRecipeSaved, onRecipeDelete }: RecipeListProps) {
  return (
    <section className="recipe-list">
      {recipes.map((x) => (
        <RecipeItem
          recipe={x}
          key={x.id}
          onRecipeSaved={onRecipeSaved}
          onRecipeDelete={onRecipeDelete}
        />
      ))}
    </section>
  );
}
