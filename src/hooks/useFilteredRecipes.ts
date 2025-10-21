import { useMemo, useState } from "react";
import type { Recipe } from "../types/Recipe";
import type { RecipeType } from "../types/RecipeType";

interface FilterOptions {
  searchTerm: string;
  recipeTypeId: string;
}

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
    const sortedRecipes = [...recipes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    let result = [...sortedRecipes];

    if (filterFn) {
      result = result.filter(filterFn);
    }

    const { searchTerm, recipeTypeId } = filters;

    if (recipeTypeId !== "All") {
      result = result.filter((r) => r.recipeTypeId === recipeTypeId);
    }

    if (searchTerm) {
      const st = searchTerm.toLowerCase();
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
