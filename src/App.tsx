import { BrowserRouter, Route, Routes } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Layout } from "@/components/Layout/Layout";
import { Recipes } from "@/pages/Recipe/AllRecipes";
import { Landing } from "@/pages/Landing";
import { NotFound } from "@/pages/NotFound";
import { CreateRecipe } from "@/pages/Recipe/CreateRecipe";
import { UpdateRecipe } from "@/pages/Recipe/UpdateRecipe";
import { ViewRecipe } from "@/pages/Recipe/ViewRecipe";
import { SavedRecipes } from "@/pages/Recipe/SavedRecipes";
import { useEffect, useState } from "react";
import type { RecipeType } from "./types/RecipeType";
import { deleteRecipe, getRecipes, getRecipesTypes, updateSavedRecipe } from "./data/mockData";
import type { Recipe } from "./types/Recipe";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [recipesError, setRecipesError] = useState<string | null>(null);
  const [recipeTypes, setRecipeTypes] = useState<RecipeType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeTypeId, setRecipeTypeId] = useState("All");

  const fetchRecipeTypes = async () => {
    setRecipeTypes([...getRecipesTypes()]);
  };

  useEffect(() => {
    fetchRecipeTypes();
  }, []);

  const fetchRecipes = async () => {
    setLoadingRecipes(true);
    setRecipesError(null);
    try {
      const recipesData = await getRecipes();
      setRecipes(recipesData);
    } catch (errorObject) {
      setRecipesError("Unable to fetch recipes due to an unexpected error");
    } finally {
      setLoadingRecipes(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const removeRecipe = async (recipeId: string) => {
    try {
      const res = window.confirm("Are you sure you'd like to delete this recipe? This cannot be undone.");

      if (res) {
        await deleteRecipe(recipeId);
        setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
        toast("Recipe has been deleted", {
          position: "bottom-center",
          theme: "light",
          hideProgressBar: true,
          closeButton: false,
          autoClose: 2500,
        });
      }
    } catch (errorObject) {
      toast("Unable to delete recipe due to an unexpected error", {
        position: "bottom-center",
        theme: "light",
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2500,
      });
    }
    await fetchRecipes();
  };

  const toggleSaved = async (recipe: Recipe) => {
    try {
      const isSaved = recipe.recipeSaved;
      await updateSavedRecipe(recipe.id);
      toast(`${isSaved ? "Removed item from saved recipes" : "Added new item to saved recipes"}`, {
        position: "bottom-center",
        theme: "light",
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2500,
      });
    } catch (errorObject) {
      toast("Unable to save recipe due to an unexpected error", {
        position: "bottom-center",
        theme: "light",
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2500,
      });
    }
    await fetchRecipes();
  };

  const getSortedRecipes = () => {
    return [...recipes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  };

  const getRecipeTypeMap = () => {
    const map = new Map<string, string>();
    recipeTypes.forEach((type) => map.set(type.id, type.name.toLowerCase()));
    return map;
  };

  const getFilteredRecipes = (filterFn?: (recipe: Recipe) => boolean) => {
    const sortedRecipes = getSortedRecipes();
    const recipeTypeMap = getRecipeTypeMap();
    let result = [...sortedRecipes];

    if (filterFn) {
      result = result.filter(filterFn);
    }

    if (recipeTypeId !== "All") {
      result = result.filter((r) => r.recipeTypeId === recipeTypeId);
    }

    if (searchTerm) {
      const st = searchTerm.toLowerCase();
      result = result.filter((recipe) => {
        const recipeTypeName = recipeTypeMap.get(recipe.recipeTypeId) || "";
        return recipe.name.toLowerCase().includes(st) || recipeTypeName.includes(st);
      });
    }

    return result;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}>
          <Route
            index
            element={<Landing />}
          />
          <Route path="recipes">
            <Route
              index
              element={
                <Recipes
                  recipes={getFilteredRecipes()}
                  recipeTypes={recipeTypes}
                  loadingRecipes={loadingRecipes}
                  recipesError={recipesError}
                  onRecipeDelete={removeRecipe}
                  onRecipeSaved={toggleSaved}
                  setSearchTerm={setSearchTerm}
                  setRecipeType={setRecipeTypeId}
                />
              }
            />
            <Route
              path="saved-recipes"
              element={
                <SavedRecipes
                  recipes={getFilteredRecipes((recipe) => recipe.recipeSaved)}
                  recipeTypes={recipeTypes}
                  loadingRecipes={loadingRecipes}
                  recipesError={recipesError}
                  onRecipeDelete={removeRecipe}
                  onRecipeSaved={toggleSaved}
                  setSearchTerm={setSearchTerm}
                  setRecipeType={setRecipeTypeId}
                />
              }
            />
            <Route
              path=":id"
              element={
                <ViewRecipe
                  recipes={getSortedRecipes()}
                  recipeTypes={recipeTypes}
                  onRecipeDelete={removeRecipe}
                  onRecipeSaved={toggleSaved}
                />
              }
            />
            <Route
              path=":id/edit"
              element={
                <UpdateRecipe
                  recipes={getSortedRecipes()}
                  recipeTypes={recipeTypes}
                  onRecipesFetch={fetchRecipes}
                />
              }
            />
            <Route
              path="create"
              element={
                <CreateRecipe
                  recipes={[]}
                  recipeTypes={recipeTypes}
                  onRecipesFetch={fetchRecipes}
                />
              }
            />
          </Route>
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
