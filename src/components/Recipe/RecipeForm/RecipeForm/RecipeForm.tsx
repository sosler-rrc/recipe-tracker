import { useEffect, useState } from "react";
import type { Recipe } from "../../../../types/Recipe";
import { RecipeType } from "../../../../types/RecipeType";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { Select } from "../../../ui/Select";
import { Textarea } from "../../../ui/Textarea";
import { IngredientsForm } from "../IngredientsForm/IngredientsForm";
import { RecipeStepsForm } from "../StepsForm/StepsForm";
import { useRecipes } from "../../../../hooks/useRecipes";
import { toast } from "react-toastify";

interface RecipeFormProps {
  formMode: "edit" | "create";
}

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

export function RecipeForm({ formMode }: RecipeFormProps) {
  const { createRecipe, updateRecipe } = useRecipes([], null);
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

  const validateRecipe = (recipe: Recipe, ingredients: string[], steps: string[]) => {
    const validationErrors = new Map<string, string>();

    if (!recipe.name?.trim()) validationErrors.set("name", "Name must be defined");
    if (!recipe.description?.trim()) validationErrors.set("description", "Description must be defined");
    if (recipe.cookTime <= 0) validationErrors.set("cookTime", "Cooktime must be greater than 0");
    if (recipe.prepTime <= 0) validationErrors.set("prepTime", "Preptime must be greater than 0");
    if (recipe.servings <= 0) validationErrors.set("servings", "Servings must be greater than 0");
    if (recipe.ovenTemp != undefined && recipe.ovenTemp <= 0) validationErrors.set("ovenTemp", "Oven Temp must be greater than 0");

    if (steps.length <= 0) validationErrors.set("steps", "You must define 1 recipe step");
    if (ingredients.length <= 0) validationErrors.set("ingredients", "You must define 1 recipe ingredient");

    return validationErrors;
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

  const onSubmit = () => {
    const recipeErrors = validateRecipe(recipeData, ingredients, steps);
    setErrors(recipeErrors);
    if (recipeErrors.size == 0) {
      const recipe = {
        ...recipeData,
        ingredients,
        steps,
      };
      let toastMessage = `Successfully created new recipe ${recipe.name}!`;
      if (formMode == "create") {
        recipe.recipeSaved = true;
        createRecipe(recipe);
      } else {
        toastMessage = "Successfully updated recipe!";
        updateRecipe(recipe);
      }
      toast(toastMessage, {
        position: "bottom-center",
        theme: "light",
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2500,
      });
      onReset();
    }
  };

  return (
    <section className="my-4 py-4 flex flex-col">
      <span className="text-2xl">Create Recipe</span>
      <form
        id="form"
        className="flex flex-row py-4 gap-4">
        <div className="flex flex-col gap-2 flex-grow">
          <div className="flex flex-col">
            <span>Recipe Name</span>
            <Input
              placeholder="Recipe Name"
              name="recipeName"
              value={recipeData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
            />
            {errors.has("name") && <span className="text-red-500 font-semibold">{errors.get("name")}</span>}
          </div>
          <div className="flex flex-col">
            <span>Recipe Description</span>
            <Textarea
              placeholder="Description"
              name="recipeDescription"
              value={recipeData.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
            />
            {errors.has("description") && <span className="text-red-500 font-semibold">{errors.get("description")}</span>}
          </div>
          <div className="flex flex-col">
            <span>Recipe Type</span>
            <Select
              name="recipeType"
              value={recipeData.type}
              onChange={(e) => handleFormChange("recipeType", e.target.value)}>
              {Object.values(RecipeType).map((x) => (
                <option key={x}>{x}</option>
              ))}
            </Select>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col flex-grow">
              <span>Total Servings</span>
              <Input
                name="servings"
                type="number"
                placeholder="Total servings"
                value={recipeData.servings}
                onChange={(e) => handleFormChange("servings", e.target.value)}
              />
              {errors.has("servings") && <span className="text-red-500 font-semibold">{errors.get("servings")}</span>}
            </div>
            <div className="flex flex-col flex-grow">
              <span>Oven Temp (F)</span>
              <Input
                name="ovenTemp"
                type="number"
                placeholder="Oven Temp"
                value={recipeData.ovenTemp ?? ""}
                onChange={(e) => handleFormChange("ovenTemp", e.target.value)}
              />
              {errors.has("ovenTemp") && <span className="text-red-500 font-semibold">{errors.get("ovenTemp")}</span>}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col flex-grow">
              <span>Prep Time (Mins)</span>
              <Input
                name="prepTime"
                type="number"
                placeholder="Prep Time (Mins)"
                value={recipeData.prepTime}
                onChange={(e) => handleFormChange("prepTime", e.target.value)}
              />
              {errors.has("prepTime") && <span className="text-red-500 font-semibold">{errors.get("prepTime")}</span>}
            </div>
            <div className="flex flex-col flex-grow">
              <span>Cook Time (Mins)</span>
              <Input
                name="cookTime"
                type="number"
                placeholder="Cook Time (Mins)"
                value={recipeData.cookTime}
                onChange={(e) => handleFormChange("cookTime", e.target.value)}
              />
              {errors.has("cookTime") && <span className="text-red-500 font-semibold">{errors.get("cookTime")}</span>}
            </div>
          </div>
          <div className="flex justify-start gap-4 mt-8">
            <Button
              type="button"
              onClick={() => onSubmit()}
              disabled={errors.values.length > 0}
              variant="green"
              className="bg-emerald-600 text-stone-100 w-50">
              Create
            </Button>
            <Button
              type="button"
              onClick={() => onReset()}
              variant="red"
              className="bg-red-600 text-stone-100 w-50">
              Reset
            </Button>
          </div>
        </div>
        <IngredientsForm
          ingredients={ingredients}
          setIngredients={setIngredients}
          error={errors.get("ingredients")}
        />
        <RecipeStepsForm
          steps={steps}
          setSteps={setSteps}
          error={errors.get("steps")}
        />
      </form>
    </section>
  );
}
