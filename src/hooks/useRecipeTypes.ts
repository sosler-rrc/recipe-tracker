import { useEffect, useState } from "react";
import * as RecipeTypeService from "@/services/recipeTypeService";
import type { RecipeType } from "@/types/RecipeType";

export function useRecipeTypes(dependencies: unknown[]) {
  const [recipeTypes, setRecipeTypes] = useState<RecipeType[]>([]);

  const fetchRecipeTypes = async () => {
    const types = await RecipeTypeService.fetchRecipeTypes();
    setRecipeTypes([...types]);
  };

  useEffect(() => {
    fetchRecipeTypes();
  }, [...dependencies]);

  return {
    recipeTypes,
  };
}
