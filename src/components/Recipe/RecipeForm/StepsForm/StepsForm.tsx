import { useState } from "react";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { RemovableFormList } from "../RemovableFormList/RemovableFormList";

interface RecipeStepsFormProps {
  steps: string[];
  setSteps: (val: string[]) => void;
}

export function RecipeStepsForm({ setSteps, steps }: RecipeStepsFormProps) {
  const [newStep, setNewStep] = useState<string>("");

  const onAddStep = () => {
    if (newStep.trim() != "") {
      setSteps([...steps, newStep]);
      setNewStep("");
    }
  };

  const onRemoveStep = (index: number) => {
    const data = [...steps];
    data.splice(index, 1);
    setSteps(data);
  };

  const buttonDisabled = newStep.trim() == "";

  return (
    <section className="flex flex-col">
      <span>Recipe Steps</span>
      <div className="flex flex-col w-75 gap-1 mb-4">
        <Input
          type="text"
          placeholder="Add an step"
          name="recipeIngredients"
          value={newStep}
          onChange={(e) => setNewStep(e.target.value)}
        />
        <Button
          className="text-stone-100 mt-2"
          type="button"
          variant="green"
          disabled={buttonDisabled}
          onClick={() => onAddStep()}>
          Add Step
        </Button>
      </div>
      <RemovableFormList
        data={steps}
        numbered={true}
        onTrashClick={onRemoveStep}
      />
    </section>
  );
}
