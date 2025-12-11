import type { Recipe } from "@/types/Recipe";
import type { RecipeType } from "@/types/RecipeType";
import { RecipeItem } from "./RecipeItem";

interface RecipeListProps {
  recipes: Recipe[];
  recipeTypes: RecipeType[];
}

export function RecipeList({ recipes, recipeTypes }: RecipeListProps) {
  return (
    <section className="recipe-list">
      {recipes.map((x) => (
        <div className="mt-2">
          <RecipeItem
            key={x.id}
            recipe={x}
            recipeTypes={recipeTypes}
          />
        </div>
      ))}
    </section>
  );
}
