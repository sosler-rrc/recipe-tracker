import { Share, Star } from "lucide-react";
import type { Recipe } from "../../../types/Recipe";
import { RecipeItemCard } from "../RecipeItemCard/RecipeItemCard";
import { Button } from "../../ui/Button";
import image from "../../../assets/default-image.jpg";

interface RecipeItemProps {
  recipe: Recipe;
  onRecipeSaved: (id: string, saved: boolean) => void;
}

export function RecipeItem({ recipe, onRecipeSaved }: RecipeItemProps) {
  return (
    <section className="recipe-item my-4 border p-4 rounded bg-stone-100">
      <div className="flex flex-col">
        <div className="flex justify-items-center my-2 text-center justify-between">
          <div className="text-2xl">
            {recipe.name} - {recipe.type}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => onRecipeSaved(recipe.id, !recipe.recipeSaved)}>{recipe.recipeSaved ? <Star fill="orange" /> : <Star />}</Button>
            <Button>
              <Share />
            </Button>
          </div>
        </div>
        <span>Preptime: {recipe.prepTime} mins</span>
        <span>Cooktime: {recipe.cookTime} mins</span>
        {recipe.ovenTemp ? <span>Oven Preheat: {recipe.ovenTemp}&deg;F</span> : <></>}
        <span>Servings: {recipe.servings}</span>
        <div className="flex mb-4">
          <div className="my-4">{recipe.description}</div>
          <img
            src={image}
            alt="Recipe image"
            className="w-48 h-48 object-cover rounded-lg ml-2"
          />
        </div>

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
