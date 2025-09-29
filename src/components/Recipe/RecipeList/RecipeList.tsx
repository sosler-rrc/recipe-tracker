import type { Recipe } from "../../../types/Recipe";
import { RecipeItem } from "../RecipeItem/RecipeItem";
interface RecipeListProps {
  recipes: Recipe[];
  onRecipeSaved: (id: string, saved: boolean) => void;
}

export function RecipeList({ recipes, onRecipeSaved }: RecipeListProps) {
  return (
    <section className="recipe-list">
      {recipes.map((x) => (
        <RecipeItem
          recipe={x}
          key={x.id}
          onRecipeSaved={onRecipeSaved}
        />
      ))}
    </section>
  );
}
