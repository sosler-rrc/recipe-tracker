import { RecipeList } from "@/components/Recipe/RecipeList";
import { recipeData, recipeTypeData } from "@/data/mockData";

export function Recipes() {
  return (
    <div className="lg:px-16 pt-8">
      <RecipeList
        recipes={recipeData}
        recipeTypes={recipeTypeData}
      />
    </div>
  );
}
