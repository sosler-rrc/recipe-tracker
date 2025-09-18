import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../../ui/Button";
import { useState } from "react";

interface RecipeItemCardProps {
  title: string;
  data: string[];
  ordered?: boolean;
}

export function RecipeItemCard({ data, title, ordered = false }: RecipeItemCardProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border rounded flex-grow p-4 min-w-60">
      <div className="flex justify-between item-center">
        <span className="text-lg">{title}</span>
        <Button onClick={() => setExpanded(!expanded)}>{expanded ? <ChevronUp /> : <ChevronDown />}</Button>
      </div>
      {expanded ? (
        <ul className="text-sm mt-4 flex flex-col gap-2">
          {data.map((x, i) => (
            <li
              key={i}
              className="mb-1">
              {ordered ? `${i + 1}. ${x}` : `- ${x}`}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
