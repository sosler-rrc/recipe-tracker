import { mockRecipes } from "../../../data/mockRecipes";
import { RecipeItem } from "../RecipeItem/RecipeItem";

export function RecipeList() {
  const recipes = mockRecipes;

  return (
    <section className="recipe-list">
      {recipes.map((x) => (
        <RecipeItem
          recipe={x}
          key={x.id}
        />
      ))}
    </section>
  );
}
