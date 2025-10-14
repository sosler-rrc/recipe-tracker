import { useEffect, useState } from "react";
import * as RecipeService from "../services/recipeService";
import type { Recipe } from "../types/Recipe";
import { RecipeType } from "../types/RecipeType";
import { toast } from "react-toastify";

const DEFAULT_RECIPE = {
  id: "0",
  name: "",
  description: "",
  recipeSaved: false,
  type: RecipeType.DINNER,
  cookTime: 0,
  prepTime: 0,
  servings: 0,
  ovenTemp: undefined,
  image: "",
  ingredients: [],
  steps: [],
} as Recipe;

export function useRecipeForm() {
  const [recipeData, setRecipeData] = useState<Recipe>(DEFAULT_RECIPE);
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const [steps, setSteps] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    if (steps.length > 0) {
      clearFieldError("steps");
    }
    if (ingredients.length > 0) {
      clearFieldError("ingredients");
    }
  }, [ingredients, steps]);

  const clearFieldError = (field: string) => {
    setErrors((prev) => {
      const newErrors = new Map(prev);
      newErrors.delete(field);
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors(new Map());
  };

  const handleFormChange = (field: string, value: any) => {
    clearFieldError(field);
    setRecipeData({
      ...recipeData,
      [field]: value,
    });
  };
  const onReset = () => {
    setRecipeData(DEFAULT_RECIPE);
    setIngredients([]);
    setSteps([]);
    clearAllErrors();
  };

  const onSubmitForm = async (formMode: "create" | "edit") => {
    const recipeErrors = await RecipeService.validateRecipe(recipeData, ingredients, steps);
    setErrors(recipeErrors);
    if (recipeErrors.size == 0) {
      const recipe = {
        ...recipeData,
        ingredients,
        steps,
      };
      let toastMessage = `Successfully created new recipe ${recipe.name}!`;
      let recipeId = recipe.id;
      if (formMode == "create") {
        recipe.recipeSaved = true;
        const newRecipe = await RecipeService.createNewRecipe(recipe);
        if (newRecipe) {
          recipeId = newRecipe.id;
        }
      } else {
        toastMessage = "Successfully updated recipe!";
        await RecipeService.updateRecipe(recipe);
      }
      toast(toastMessage, {
        position: "bottom-center",
        theme: "light",
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2500,
      });
      onReset();
      return recipe;
    }
    return null;
  };

  return { recipeData, steps, ingredients, errors, onReset, handleFormChange, clearAllErrors, setIngredients, setSteps, setRecipeData, onSubmitForm };
}
