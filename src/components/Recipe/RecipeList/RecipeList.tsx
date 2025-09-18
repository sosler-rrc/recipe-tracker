import React, { useEffect, useState } from "react";
import type { Recipe } from "../../../types/Recipe";
import { RecipeType } from "../../../types/RecipeType";
import { RecipeItem } from "../RecipeItem/RecipeItem";
import { Select } from "../../ui/Select";
import { Input } from "../../ui/Input";
import { mockRecipes } from "../../../data/mockRecipes";

interface RecipeListProps {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

export function RecipeList({ recipes, setRecipes }: RecipeListProps) {
  const [filterOptions, setFilterOptions] = useState<string[]>([]);

  const setupFilters = () => {
    const recipeTypes = [...Object.values(RecipeType)].filter((filter) => recipes.findIndex((x) => x.type == filter) != -1) as string[];

    setFilterOptions(["All", ...recipeTypes]);
  };

  const onFilterChange = (filterValue: string) => {
    const data = [...mockRecipes];
    const filteredRecipes = filterValue == "All" ? data : data.filter((x) => x.type.includes(filterValue));

    setRecipes(filteredRecipes);
  };

  const onSearchUpdate = (searchTerm: string) => {
    const data = [...mockRecipes];
    const st = searchTerm.toLowerCase();
    const filteredRecipes = data.filter((x) => x.name.toLowerCase().includes(st) || x.type.toLowerCase().includes(st));

    setRecipes(filteredRecipes);
  };

  const onRecipeSaved = (id: string, saved: boolean) => {
    const data = [...mockRecipes];
    const index = data.findIndex((x) => x.id == id);
    if (index > -1) {
      const recipe = data[index];
      recipe.recipeSaved = saved;
      data.splice(index, 1, recipe);
    }

    setRecipes(data);
  };

  useEffect(() => {
    setupFilters();
  }, []);

  return (
    <section className="recipe-list">
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
      <span>{recipes.length} results</span>
      {recipes.map((x) => (
        <RecipeItem
          recipe={x}
          key={x.id}
          onRecipeSaved={onRecipeSaved}
        />
      ))}
    </section>
  );
}
