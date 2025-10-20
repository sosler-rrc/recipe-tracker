import { useEffect, useMemo, useState } from "react";
import * as RecipeService from "../services/recipeService";
import type { Recipe } from "../types/Recipe";

interface FilterOptions {
  searchTerm: string;
  recipeTypeId: string;
}

export function useRecipes(dependencies: unknown[], filterFn?: ((recipe: Recipe) => boolean) | null) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>();
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    recipeTypeId: "",
  });

  const fetchRecipes = async () => {
    try {
      let result = await RecipeService.fetchRecipes();

      if (filterFn) {
        result = result.filter(filterFn);
      }

      setRecipes([...result]);
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  const toggleSavedRecipe = async (recipe: Recipe) => {
    try {
      await RecipeService.toggleSavedRecipe(recipe);

      await fetchRecipes();
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    if (filters.recipeTypeId !== "") {
      result = result.filter((recipe) => recipe.recipeTypeId === filters.recipeTypeId);
    }

    if (filters.searchTerm) {
      const st = filters.searchTerm.toLowerCase();
      result = result.filter((recipe) => recipe.name.toLowerCase().includes(st) || recipe.recipeTypeId.toLowerCase().includes(st));
    }

    return result;
  }, [recipes, filters]);

  const setSearchTerm = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }));
  };

  const setRecipeType = (recipeTypeId: string) => {
    console.log(recipeTypeId);
    setFilters((prev) => ({ ...prev, recipeTypeId }));
  };

  useEffect(() => {
    fetchRecipes();
  }, [...dependencies]);

  return {
    filteredRecipes,
    recipes,
    error,
    toggleSavedRecipe,
    setSearchTerm,
    setRecipeType,
  };
}
