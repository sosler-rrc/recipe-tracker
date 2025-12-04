import { useMemo, useState } from "react";
import type { Recipe } from "@/types/Recipe";
import type { RecipeType } from "@/types/RecipeType";

interface FilterOptions {
  searchTerm: string;
  recipeTypeId: string;
}

//This hook will consume a list of recipes & recipeTypes used for filtering along with a filter function callback
export function useFilteredRecipes(recipes: Recipe[], recipeTypes: RecipeType[], filterFn?: ((recipe: Recipe) => boolean) | null) {
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    recipeTypeId: "All",
  });

  const recipeTypeMap = useMemo(() => {
    const map = new Map<string, string>();
    recipeTypes.forEach((type) => map.set(type.id, type.name.toLowerCase()));
    return map;
  }, [recipeTypes]);

  const filteredRecipes = useMemo(() => {
    //sort recipes by updatedAt field in desc order so most recent updated recipe is first
    const sortedRecipes = [...recipes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    let result = [...sortedRecipes];

    if (filterFn) {
      result = result.filter(filterFn);
    }

    const { searchTerm, recipeTypeId } = filters;

    if (recipeTypeId !== "All") {
      //filter recipes by the recipeTypeId field when not equal to "All"
      result = result.filter((r) => r.recipeTypeId === recipeTypeId);
    }

    if (searchTerm) {
      const st = searchTerm.toLowerCase();
      //filter recipes using searchTerm and find matching recipe names or recipeTypes
      result = result.filter((recipe) => {
        const recipeTypeName = recipeTypeMap.get(recipe.recipeTypeId) || "";
        return recipe.name.toLowerCase().includes(st) || recipeTypeName.includes(st);
      });
    }

    return result;
  }, [recipes, recipeTypeMap, filters, filterFn]);

  const setSearchTerm = (searchTerm: string) => setFilters((prev) => ({ ...prev, searchTerm }));

  const setRecipeType = (recipeTypeId: string) => setFilters((prev) => ({ ...prev, recipeTypeId }));

  return {
    filteredRecipes,
    filters,
    setSearchTerm,
    setRecipeType,
  };
}
