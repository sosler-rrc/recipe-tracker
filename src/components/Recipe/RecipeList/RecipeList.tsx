import type { Recipe } from "../../../types/Recipe";
import { RecipeItem } from "../RecipeItem/RecipeItem";
import { mockRecipes } from "../../../data/mockRecipes";

interface RecipeListProps {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

export function RecipeList({ recipes, setRecipes }: RecipeListProps) {
  const onRecipeSaved = (id: string, saved: boolean) => {
    const data = [...mockRecipes];
    const index = data.findIndex((x) => x.id == id);
    if (index > -1) {
      const recipe = data[index];
      recipe.recipeSaved = saved;
      data.splice(index, 1, recipe);
    }

    setRecipes(data);
  };

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
