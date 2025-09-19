import type { Recipe } from "../../../types/Recipe";
import { RecipeType } from "../../../types/RecipeType";
import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";
import { Textarea } from "../../ui/Textarea";

interface RecipeFormProps {
  onCreateRecipe: (recipe: Recipe) => void;
}

export function RecipeForm({ onCreateRecipe }: RecipeFormProps) {
  return (
    <section className="my-4 py-4">
      <span className="text-2xl">Create Recipe</span>
      <div
        id="form"
        className="flex flex-col w-70 py-4 gap-2">
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
      </div>
    </section>
  );
}
