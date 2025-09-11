import { Star } from "lucide-react";
import type { Recipe } from "../../../types/Recipe";
import { RecipeItemCard } from "../RecipeItemCard/RecipeItemCard";

interface RecipeItemProps {
  recipe: Recipe;
}

export function RecipeItem({ recipe }: RecipeItemProps) {
  return (
    <section className="recipe-item my-4 border p-4 rounded bg-stone-100">
      <div className="flex flex-col">
        <div className="flex justify-items-center my-2 text-center justify-between">
          <div className="text-2xl">
            {recipe.name} - {recipe.type}
          </div>
          <div className="cursor-pointer">
            <Star />
          </div>
        </div>
        <span>Preptime: {recipe.prepTime} mins</span>
        <span>Cooktime: {recipe.cookTime} mins</span>
        {recipe.ovenTemp ? <span>Oven Preheat: {recipe.ovenTemp}&deg;F</span> : <></>}
        <span>Servings: {recipe.servings}</span>
        <div className="my-4">{recipe.description}</div>

        <div className="flex gap-4">
          <RecipeItemCard
            data={recipe.ingredients}
            title="Ingredients"
          />
          <RecipeItemCard
            data={recipe.steps}
            title="Steps"
            ordered={true}
          />
        </div>
      </div>
    </section>
  );
}
