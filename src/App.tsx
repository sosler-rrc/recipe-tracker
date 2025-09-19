import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout/Layout";
import { Recipes } from "./components/Pages/Recipes";
import { Landing } from "./components/Pages/Landing";
import { NotFound } from "./components/Pages/NotFound";
import { useState } from "react";
import type { Recipe } from "./types/Recipe";
import { mockRecipes } from "./data/mockRecipes";
import { MyRecipes } from "./components/Pages/MyRecipes";
import { CreateRecipe } from "./components/Pages/CreateRecipe";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const onLogin = () => {
    setLoggedIn(!loggedIn);
  };

  const onCreateRecipe = (recipe: Recipe) => {
    setRecipes([...recipes, recipe]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            isLoggedIn={loggedIn}
            onLogin={onLogin}
          />
        }>
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
            path="create"
            element={<CreateRecipe onCreateRecipe={onCreateRecipe} />}
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
