import { useEffect, useState } from "react";
import type { Recipe } from "../../../../types/Recipe";
import { RecipeType } from "../../../../types/RecipeType";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { Select } from "../../../ui/Select";
import { Textarea } from "../../../ui/Textarea";
import { IngredientsForm } from "../IngredientsForm/IngredientsForm";
import { RecipeStepsForm } from "../StepsForm/StepsForm";

interface CreateRecipeFormProps {
  onCreateRecipe: (recipe: Recipe) => void;
}

export function CreateRecipeForm({ onCreateRecipe }: CreateRecipeFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    if (steps.length == 0 || ingredients.length == 0) {
      setError("You must add a Step and Ingredient before creating a recipe");
    } else {
      setError(null);
    }
    console.log(error);
  }, [ingredients, steps]);

  const onSubmit = (formData: FormData) => {
    if (error == null) {
      const newRecipe = {
        name: formData.get("recipeName"),
        description: formData.get("recipeDescription"),
        type: formData.get("recipeType"),
        prepTime: formData.get("prepTime") as any,
        cookTime: formData.get("cookTime") as any,
        servings: formData.get("servings") as any,
        ovenTemp: formData.get("ovenTemp") as any,
        ingredients: ingredients,
        steps: steps,
        recipeSaved: true,
        image: "placeholder.jpg",
      } as Recipe;

      setIngredients([]);
      setSteps([]);

      onCreateRecipe(newRecipe);
    }
  };

  return (
    <section className="my-4 py-4 flex flex-col ">
      <span className="text-2xl">Create Recipe</span>
      <form
        action={onSubmit}
        id="form"
        className="flex flex-row py-4 gap-4">
        <div className="flex flex-col gap-2 max-w-100">
          <div className="flex flex-col">
            <span>Recipe Name</span>
            <Input
              placeholder="Recipe Name"
              name="recipeName"
            />
          </div>
          <div className="flex flex-col">
            <span>Recipe Description</span>
            <Textarea
              placeholder="Description"
              name="recipeDescription"
            />
          </div>
          <div className="flex flex-col">
            <span>Recipe Type</span>
            <Select name="recipeType">
              {Object.values(RecipeType).map((x) => (
                <option key={x}>{x}</option>
              ))}
            </Select>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col ">
              <span>Total Servings</span>
              <Input
                name="servings"
                type="number"
                placeholder="Total servings"
              />
            </div>
            <div className="flex flex-col">
              <span>Oven Temp (F)</span>
              <Input
                name="ovenTemp"
                type="number"
                placeholder="Oven Temp"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span>Prep Time (Mins)</span>
              <Input
                name="prepTime"
                type="number"
                placeholder="Prep Time (Mins)"
              />
            </div>
            <div className="flex flex-col">
              <span>Cook Time (Mins)</span>
              <Input
                name="cookTime"
                type="number"
                placeholder="Cook Time (Mins)"
              />
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-8">
            <Button
              type="submit"
              disabled={error != null}
              variant="green"
              className="bg-emerald-600 text-stone-100 w-50">
              Create
            </Button>
            <Button
              type="button"
              variant="red"
              className="bg-red-600 text-stone-100 w-50">
              Reset
            </Button>
          </div>
          <div className="flex flex-col">
            <div className="text-red-600 font-semibold">{error}</div>
          </div>
        </div>
        <IngredientsForm
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        <RecipeStepsForm
          steps={steps}
          setSteps={setSteps}
        />
      </form>
    </section>
  );
}
