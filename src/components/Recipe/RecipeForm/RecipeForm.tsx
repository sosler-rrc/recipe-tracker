import { useEffect, useState } from "react";
import { IngredientsForm } from "./IngredientsForm";
import { RecipeStepsForm } from "./StepsForm";
import { Button, Input, Select, Textarea } from "@/components/ui";
import { useNavigate } from "react-router";
import type { CreateUpdateRecipe } from "@/types/CreateUpdateRecipe";
import { createRecipe, updateRecipe } from "@/data/mockData";
import { toast } from "react-toastify";
import type { Recipe } from "@/types/Recipe";
import type { RecipeType } from "@/types/RecipeType";

interface RecipeFormProps {
  recipes: Recipe[];
  recipeTypes: RecipeType[];
  formMode: "edit" | "create";
  recipeId?: string;
  onRecipesFetch: () => void;
}

const DEFAULT_RECIPE = {
  name: "",
  description: "",
  recipeTypeId: "",
  cookTime: undefined,
  prepTime: undefined,
  servings: undefined,
  ovenTemp: undefined,
  ingredients: [],
  steps: [],
  id: undefined,
} as CreateUpdateRecipe;

export function RecipeForm({ recipes, recipeTypes, formMode, recipeId, onRecipesFetch }: RecipeFormProps) {
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState<CreateUpdateRecipe>(DEFAULT_RECIPE);
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

  const handleFormChange = (field: string, value: unknown) => {
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
    const recipeErrors = await validateRecipe(recipeData, ingredients, steps);
    setErrors(recipeErrors);
    if (recipeErrors.size == 0) {
      const recipe = {
        ...recipeData,
        ingredients,
        steps,
      };
      if (formMode == "create") {
        const newRecipe = await createRecipe(recipe);
        recipe.id = newRecipe.id;
      } else {
        await updateRecipe(recipe);
      }
      await onRecipesFetch();
      //display a toast message for a successful update/create
      const toastMessage = `Successfully ${formMode == "create" ? "created new" : "updated"}  recipe ${recipe.name}!`;
      toast(toastMessage, {
        position: "bottom-center",
        theme: "light",
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2500,
      });
      onReset();
      console.log(recipe);
      return recipe;
    }
    return null;
  };

  useEffect(() => {
    //When the formMode is "edit" and a recipeId is passed in, find the associated recipe and use that to fill the form fields for an update
    if (formMode == "edit" && recipeId) {
      const editedRecipe = recipes.find((x) => x.id == recipeId);
      if (editedRecipe) {
        const { updatedAt, createdAt, ...data } = { ...editedRecipe };
        setRecipeData(data);
        setIngredients(editedRecipe.ingredients);
        setSteps(editedRecipe.steps);
      }
    }
  }, [recipes]);

  const onSubmit = async () => {
    const recipe = await onSubmitForm(formMode);
    if (recipe) {
      navigate(`/recipes/${recipe.id}`);
    }
  };

  async function validateRecipe(recipe: CreateUpdateRecipe, ingredients: string[], steps: string[]) {
    const validationErrors = new Map<string, string>();

    if (!recipe.name?.trim()) validationErrors.set("name", "Name must be defined");
    if (!recipe.description?.trim()) validationErrors.set("description", "Description must be defined");
    if (!recipe.recipeTypeId) validationErrors.set("recipeTypeId", "Recipe Type must be selected");
    if (recipe.cookTime != undefined && recipe.cookTime <= 0) validationErrors.set("cookTime", "Cooktime must be greater than 0");
    if (recipe.prepTime != undefined && recipe.prepTime <= 0) validationErrors.set("prepTime", "Preptime must be greater than 0");
    if (recipe.servings != undefined && recipe.servings <= 0) validationErrors.set("servings", "Servings must be greater than 0");
    if (recipe.ovenTemp != undefined && recipe.ovenTemp <= 0) validationErrors.set("ovenTemp", "Oven Temp must be greater than 0");

    if (steps.length <= 0) validationErrors.set("steps", "You must define 1 recipe step");
    if (ingredients.length <= 0) validationErrors.set("ingredients", "You must define 1 recipe ingredient");

    return validationErrors;
  }

  return (
    <section className="my-4 py-4 flex flex-col">
      <span className="text-2xl">{formMode == "create" ? "Create" : "Edit"} Recipe</span>
      <form
        id="form"
        className="">
        <div className="flex flex-col py-4 gap-4 xl:flex-row">
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
                name="recipeTypeId"
                value={recipeData.recipeTypeId}
                onChange={(e) => handleFormChange("recipeTypeId", e.target.value)}>
                <option
                  disabled
                  selected></option>
                {recipeTypes.map((x) => (
                  <option
                    key={x.id}
                    value={x.id}>
                    {x.name}
                  </option>
                ))}
              </Select>
              {errors.has("recipeTypeId") && <span className="text-red-500 font-semibold">{errors.get("recipeTypeId")}</span>}
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col flex-grow">
                <span>Total Servings</span>
                <Input
                  name="servings"
                  type="number"
                  placeholder="Total servings"
                  value={recipeData.servings}
                  onChange={(e) => handleFormChange("servings", Number.parseInt(e.target.value))}
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
                  onChange={(e) => handleFormChange("ovenTemp", Number.parseInt(e.target.value))}
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
                  onChange={(e) => handleFormChange("prepTime", Number.parseInt(e.target.value))}
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
                  onChange={(e) => handleFormChange("cookTime", Number.parseInt(e.target.value))}
                />
                {errors.has("cookTime") && <span className="text-red-500 font-semibold">{errors.get("cookTime")}</span>}
              </div>
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
        </div>
        <div className="flex justify-start gap-4 mt-2">
          <Button
            type="button"
            onClick={() => onSubmit()}
            disabled={errors.values.length > 0}
            variant="green"
            className="bg-emerald-600 text-stone-100 w-50">
            {formMode == "create" ? "Create" : "Update"}
          </Button>
          <Button
            type="button"
            onClick={() => onReset()}
            variant="red"
            className="bg-red-600 text-stone-100 w-50">
            Reset
          </Button>
        </div>
      </form>
    </section>
  );
}
