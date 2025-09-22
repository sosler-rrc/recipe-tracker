import { Trash } from "lucide-react";
import { Button } from "../../../ui/Button";

interface RemovableFormListProps {
  data: string[];
  numbered?: boolean;
  onTrashClick: (index: number) => void;
}

export function RemovableFormList({ data, onTrashClick, numbered = false }: RemovableFormListProps) {
  return (
    <div className="flex flex-col gap-2 max-w-[300px] bg-stone-100 h-full rounded p-2">
      {data.map((x, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-1.5 border bg-stone-200 rounded ">
          <div>
            {numbered ? `${i + 1}. ` : ""}
            {x}
          </div>
          <Button
            type="button"
            onClick={() => onTrashClick(i)}>
            <Trash
              width={16}
              height={16}
            />
          </Button>
        </div>
      ))}
    </div>
  );
}
