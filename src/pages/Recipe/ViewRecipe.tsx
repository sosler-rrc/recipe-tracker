import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { RecipeItem } from "@/components/Recipe/RecipeItem";
import type { Recipe } from "@/types/Recipe";
import type { RecipeType } from "@/types/RecipeType";

interface ViewRecipeProps {
  recipes: Recipe[];
  recipeTypes: RecipeType[];
  onRecipeDelete: (recipeId: string) => void;
  onRecipeSaved: (recipe: Recipe) => void;
}

export function ViewRecipe({ recipes, recipeTypes, onRecipeDelete, onRecipeSaved }: ViewRecipeProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedRecipe = recipes.find((x) => x.id == id);

  useEffect(() => {
    if (!selectedRecipe && recipes.length > 0) {
      navigate("/not-found");
    }
  }, [selectedRecipe, recipes.length, navigate]);

  if (!selectedRecipe) {
    return null;
  }

  return (
    <div className="mt-4">
      <RecipeItem
        recipe={selectedRecipe}
        recipeTypes={recipeTypes}
        onRecipeSaved={onRecipeSaved}
        onRecipeDelete={onRecipeDelete}
        standalone={true}
      />
    </div>
  );
}
