import { useState } from "react";
import { Button } from "../../../ui/Button";
import { RemovableFormList } from "../RemovableFormList/RemovableFormList";
import { Textarea } from "../../../ui/Textarea";

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

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key.toLowerCase() == "enter") {
      e.preventDefault();
      onAddStep();
    }
  };

  const buttonDisabled = newStep.trim() == "";

  return (
    <section className="flex flex-col">
      <span>Recipe Steps</span>
      <div className="flex flex-col w-75 gap-1 mb-4">
        <Textarea
          placeholder="Add an step"
          name="recipeIngredients"
          value={newStep}
          onKeyDown={(e) => onKeyDown(e)}
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
