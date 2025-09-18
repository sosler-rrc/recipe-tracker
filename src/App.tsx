import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout/Layout";
import { Recipes } from "./components/Pages/Recipes";
import { Landing } from "./components/Pages/Landing";
import { NotFound } from "./components/Pages/NotFound";
import { useState } from "react";
import type { Recipe } from "./types/Recipe";
import { mockRecipes } from "./data/mockRecipes";
import { MyRecipes } from "./components/Pages/MyRecipes";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);

  return (
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
                recipes={recipes}
                setRecipes={setRecipes}
              />
            }
          />
          <Route
            path="my-recipes"
            element={
              <MyRecipes
                recipes={recipes.filter((x) => x.recipeSaved)}
                setRecipes={setRecipes}
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
  );
}

export default App;
