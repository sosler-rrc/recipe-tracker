import { useUser } from "@clerk/clerk-react";
import { Edit, Printer, Star, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router";
import type { Recipe } from "@/types/Recipe";
import type { RecipeType } from "@/types/RecipeType";
import { formatDate } from "@/utils/formateDate";
import { Button } from "@/components/ui";
import { RecipeItemCard } from "./RecipeItemCard";
import { RecipeComments } from "./RecipeComments";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface RecipeItemProps {
  recipe: Recipe;
  recipeTypes: RecipeType[];
  savedRecipeIds: string[];
  standalone?: boolean;

  onRecipeSaved: (recipe: Recipe) => void;
  onRecipeDelete: (recipeId: string) => void;
  onRecipeComment: (recipeId: string, text: string) => void;
  onDeleteComment: (recipeId: string, commentId: string) => void;
}

export function RecipeItem({
  recipe,
  recipeTypes,
  savedRecipeIds,
  standalone = false,
  onRecipeSaved,
  onRecipeDelete,
  onRecipeComment,
  onDeleteComment,
}: RecipeItemProps) {
  let navigate = useNavigate();
  const { user, isSignedIn } = useUser();

  function getRecipeTitle() {
    const text = `${recipe.name} - ${recipeTypes.find((x) => x.id == recipe.recipeTypeId)?.name ?? ""}`;
    if (!standalone) {
      return (
        <Link
          to={`/recipes/${recipe.id}`}
          className="hover:underline cursor:pointer">
          {text}
        </Link>
      );
    }
    return text;
  }

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  return (
    <section
      ref={printRef}
      className="recipe-item my-4 border p-4 rounded bg-stone-100">
      <div className="flex flex-col gap-2">
        <div className="flex justify-items-center mt-2 text-center justify-between">
          <div className="text-2xl">{getRecipeTitle()}</div>
          <div className="flex gap-2">
            {isSignedIn ? (
              recipe.user.id == user?.id ? (
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
              )
            ) : (
              <></>
            )}
            <Button onClick={handlePrint}>
              <Printer />
            </Button>
          </div>
        </div>
        <span className="text-sm">{formatDate(recipe.updatedAt.toString(), "medium")}</span>
        <span className="text-sm mb-2">User: {recipe.user.username}</span>
        <div className="flex flex-col print:flex-row print:flex print:gap-2">
          <span>Preptime: {recipe.prepTime} mins</span>
          <span>Cooktime: {recipe.cookTime} mins</span>
          {recipe.ovenTemp ? <span>Oven Preheat: {recipe.ovenTemp}&deg;F</span> : <></>}
          <span>Servings: {recipe.servings}</span>
        </div>
        <div className="my-4 print:my-1">{recipe.description}</div>

        <div className="flex gap-4 flex-col">
          <RecipeItemCard
            data={recipe.ingredients}
            title="Ingredients"
            defaultExpand={standalone}
          />
          <RecipeItemCard
            data={recipe.steps}
            title="Steps"
            ordered={true}
            defaultExpand={standalone}
          />
        </div>
        {standalone ? (
          <RecipeComments
            recipeId={recipe.id}
            onRecipeComment={onRecipeComment}
            onDeleteComment={(comment) => onDeleteComment(recipe.id, comment)}
            comments={recipe.comments}
          />
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}
