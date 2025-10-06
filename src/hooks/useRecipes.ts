import { useEffect, useMemo, useState } from "react";
import * as RecipeService from "../services/recipeService";
import type { Recipe } from "../types/Recipe";
import { RecipeType } from "../types/RecipeType";

interface FilterOptions {
  searchTerm: string;
  recipeType: string;
}

export function useRecipes(dependencies: unknown[], filterFn?: ((recipe: Recipe) => boolean) | null) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>();
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    recipeType: "All",
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

  const toggleSavedRecipe = async (recipeId: string) => {
    try {
      await RecipeService.toggleSavedRecipe(recipeId);

      await fetchRecipes();
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  const createRecipe = async (recipeData: Recipe) => {
    try {
      await RecipeService.createNewRecipe(recipeData);
      await fetchRecipes();
      return recipeData;
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  const updateRecipe = async (recipeData: Recipe) => {
    try {
      await RecipeService.updateRecipe(recipeData);
      await fetchRecipes();
      return recipeData;
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  const filterOptions = useMemo(() => {
    const recipeTypes = [...Object.values(typeof RecipeType)].filter((filter) => recipes.findIndex((x) => x.type === filter) !== -1) as string[];
    return ["All", ...recipeTypes];
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    if (filters.recipeType !== "All") {
      result = result.filter((recipe) => recipe.type === filters.recipeType);
    }

    if (filters.searchTerm) {
      const st = filters.searchTerm.toLowerCase();
      result = result.filter((recipe) => recipe.name.toLowerCase().includes(st) || recipe.type.toLowerCase().includes(st));
    }

    return result;
  }, [recipes, filters]);

  const setSearchTerm = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }));
  };

  const setRecipeType = (recipeType: string) => {
    setFilters((prev) => ({ ...prev, recipeType }));
  };

  useEffect(() => {
    fetchRecipes();
  }, [...dependencies]);

  return {
    filteredRecipes,
    recipes,
    error,
    toggleSavedRecipe,
    createRecipe,
    updateRecipe,
    filterOptions,
    setSearchTerm,
    setRecipeType,
  };
}
