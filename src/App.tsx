import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout/Layout";
import { Recipes } from "./components/Pages/Recipes";
import { Landing } from "./components/Pages/Landing";
import { NotFound } from "./components/Pages/NotFound";
import { useState } from "react";
import { MyRecipes } from "./components/Pages/MyRecipes";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const onLogin = () => {
    setLoggedIn(!loggedIn);
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
                recipeDependencies={[]}
                recipeFilterFn={null}
              />
            }
          />
          <Route
            path="my-recipes"
            element={
              <MyRecipes
                recipeDependencies={[]}
                recipeFilterFn={(recipe) => recipe.recipeSaved === true}
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
