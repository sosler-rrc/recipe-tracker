import type { Recipe } from "../../types/Recipe";
import { useRecipes } from "../../hooks/useRecipes";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { RecipeList } from "../../components/Recipe/RecipeList/RecipeList";
import { useRecipeTypes } from "../../hooks/useRecipeTypes";

interface RecipeProps {
  recipeDependencies: any[];
  recipeFilterFn: ((recipe: Recipe) => boolean) | null;
}

export function Recipes({ recipeDependencies, recipeFilterFn }: RecipeProps) {
  const { filteredRecipes, setSearchTerm, setRecipeType, toggleSavedRecipe } = useRecipes(recipeDependencies, recipeFilterFn);
  const { recipeTypes } = useRecipeTypes([]);

  return (
    <div className="p-16">
      <div className="flex justify-between gap-6">
        <Input
          className="w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Find a recipe"
        />
        <Select
          className="w-40"
          onChange={(e) => setRecipeType(e.target.value)}>
          {recipeTypes.map((x) => (
            <option
              key={x.id}
              value={x.id}>
              {x.name}
            </option>
          ))}
        </Select>
      </div>
      <span>{filteredRecipes.length} results</span>
      <RecipeList
        recipes={filteredRecipes}
        onRecipeSaved={toggleSavedRecipe}
      />
    </div>
  );
}
