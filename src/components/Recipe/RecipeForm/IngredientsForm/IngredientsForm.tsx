import { useState } from "react";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { RemovableFormList } from "../RemovableFormList/RemovableFormList";

interface IngredientsFormProps {
  ingredients: string[];
  setIngredients: (val: string[]) => void;
  error?: string;
}

export function IngredientsForm({ ingredients, setIngredients, error }: IngredientsFormProps) {
  const [newIngredient, setNewIngredient] = useState<string>("");

  const onAddIngredient = () => {
    if (newIngredient.trim() != "") {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient("");
    }
  };

  const onRemoveIngredient = (index: number) => {
    const data = [...ingredients];
    data.splice(index, 1);
    setIngredients(data);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() == "enter") {
      e.preventDefault();
      onAddIngredient();
    }
  };

  const buttonDisabled = newIngredient.trim() == "";

  return (
    <section className="flex flex-col min-w-100">
      <span>Ingredients</span>

      <div className="flex flex-col gap-1 mb-4">
        <Input
          type="text"
          placeholder="Add an ingredient"
          name="recipeIngredients"
          value={newIngredient}
          onKeyDown={(e) => onKeyDown(e)}
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <Button
          className="text-stone-100 mt-2"
          type="button"
          variant="green"
          disabled={buttonDisabled}
          onClick={() => onAddIngredient()}>
          Add Ingredient
        </Button>
        {error && <span className="text-red-500 font-semibold">{error}</span>}
      </div>
      <RemovableFormList
        data={ingredients}
        onTrashClick={onRemoveIngredient}
      />
    </section>
  );
}
