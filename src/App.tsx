import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/Layout/Layout";
import { Recipes } from "./pages/Recipe/AllRecipes";
import { Landing } from "./pages/Landing";
import { NotFound } from "./pages/NotFound";
import { useState } from "react";
import { MyRecipes } from "./pages/Recipe/MyRecipes";
import { CreateRecipe } from "./pages/Recipe/CreateRecipe";
import { ToastContainer } from "react-toastify";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const onLogin = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <BrowserRouter>
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
            <Route
              path="create"
              element={<CreateRecipe />}
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
