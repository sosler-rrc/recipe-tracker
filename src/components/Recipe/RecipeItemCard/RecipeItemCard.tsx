interface RecipeItemCardProps {
  title: string;
  data: string[];
  ordered?: boolean;
}

export function RecipeItemCard({ data, title, ordered = false }: RecipeItemCardProps) {
  return (
    <div className="border rounded flex-grow p-4 min-w-60">
      <span className="text-lg">{title}</span>
      <ul className="text-sm mt-4 flex flex-col gap-2">
        {data.map((x, i) => (
          <li key={i} className="mb-1">
            {ordered ? `${i + 1}. ${x}` : `- ${x}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
