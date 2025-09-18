import type { Recipe } from "../../types/Recipe";
import { RecipeList } from "../Recipe/RecipeList/RecipeList";

interface RecipeProps {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

export function Recipes({ recipes, setRecipes }: RecipeProps) {
  return (
    <div className="p-16">
      <RecipeList
        recipes={recipes}
        setRecipes={setRecipes}
      />
    </div>
  );
}
