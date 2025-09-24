import { useEffect, useState } from "react";
import type { Recipe } from "../../types/Recipe";
import { RecipeType } from "../../types/RecipeType";
import { RecipeList } from "../Recipe/RecipeList/RecipeList";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

interface RecipeProps {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

export function Recipes({ recipes, setRecipes }: RecipeProps) {
  const [data, setData] = useState<Recipe[]>(recipes);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);

  const setupFilters = () => {
    const recipeTypes = [...Object.values(RecipeType)].filter((filter) => recipes.findIndex((x) => x.type == filter) != -1) as string[];

    setFilterOptions(["All", ...recipeTypes]);
  };

  const onFilterChange = (filterValue: string) => {
    const data = [...recipes];
    const filteredRecipes = filterValue == "All" ? data : data.filter((x) => x.type.includes(filterValue));

    setData(filteredRecipes);
  };

  const onSearchUpdate = (searchTerm: string) => {
    const data = [...recipes];
    const st = searchTerm.toLowerCase();
    const filteredRecipes = data.filter((x) => x.name.toLowerCase().includes(st) || x.type.toLowerCase().includes(st));

    setData(filteredRecipes);
  };

  useEffect(() => {
    setData(recipes);
    setupFilters();
  }, []);

  return (
    <div className="p-16">
      <div className="flex justify-between gap-6">
        <Input
          className="w-full"
          onChange={(e) => onSearchUpdate(e.target.value)}
          placeholder="Find a recipe"
        />
        <Select
          className="w-40"
          onChange={(e) => onFilterChange(e.target.value)}>
          {filterOptions.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </Select>
      </div>
      <span>{data.length} results</span>
      <RecipeList
        recipes={data}
        setRecipes={setData}
      />
    </div>
  );
}
