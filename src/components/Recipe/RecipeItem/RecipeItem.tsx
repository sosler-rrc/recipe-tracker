import { Edit, Star, Trash } from "lucide-react";
import type { Recipe } from "../../../types/Recipe";
import { RecipeItemCard } from "../RecipeItemCard/RecipeItemCard";
import { Button } from "../../ui/Button";
import image from "../../../assets/default-image.jpg";
import { useNavigate } from "react-router";
import type { RecipeType } from "../../../types/RecipeType";
import { useUser } from "@clerk/clerk-react";

interface RecipeItemProps {
  recipe: Recipe;
  recipeTypes: RecipeType[];
  savedRecipeIds: string[];

  onRecipeSaved: (recipe: Recipe) => void;
  onRecipeDelete: (recipeId: string) => void;
}

export function RecipeItem({ recipe, recipeTypes, savedRecipeIds, onRecipeSaved, onRecipeDelete }: RecipeItemProps) {
  let navigate = useNavigate();
  const { user } = useUser();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "medium",
    });
  }

  return (
    <section className="recipe-item my-4 border p-4 rounded bg-stone-100">
      <div className="flex flex-col">
        <div className="flex justify-items-center mt-2 text-center justify-between">
          <div className="text-2xl">
            {recipe.name} - {recipeTypes.find((x) => x.id == recipe.recipeTypeId)?.name ?? ""}
          </div>
          <div className="flex gap-2">
            {recipe.user.id == user?.id ? (
              <>
                <Button onClick={() => navigate(`/recipes/${recipe.id}/edit`)}>
                  <Edit />
                </Button>
                <Button onClick={() => onRecipeDelete(recipe.id)}>
                  <Trash />
                </Button>
              </>
            ) : (
              <Button onClick={() => onRecipeSaved(recipe)}>{savedRecipeIds?.includes(recipe.id) ? <Star fill="orange" /> : <Star />}</Button>
            )}
          </div>
        </div>
        <span className="text-sm">{formatDate(recipe.updatedAt.toString())}</span>
        <span className="text-sm mb-2">User: {recipe.user.username}</span>
        <span>Preptime: {recipe.prepTime} mins</span>
        <span>Cooktime: {recipe.cookTime} mins</span>
        {recipe.ovenTemp ? <span>Oven Preheat: {recipe.ovenTemp}&deg;F</span> : <></>}
        <span>Servings: {recipe.servings}</span>
        <div className="flex mb-4 justify-between">
          <div className="my-4">{recipe.description}</div>
          <img
            src={image}
            alt="Recipe image"
            className="w-48 h-48 object-cover rounded-lg ml-2"
          />
        </div>

        <div className="flex gap-4 flex-col">
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
