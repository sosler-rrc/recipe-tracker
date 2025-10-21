import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/Layout/Layout";
import { Recipes } from "./pages/Recipe/AllRecipes";
import { Landing } from "./pages/Landing";
import { NotFound } from "./pages/NotFound";
import { MyRecipes } from "./pages/Recipe/MyRecipes";
import { CreateRecipe } from "./pages/Recipe/CreateRecipe";
import { ToastContainer } from "react-toastify";
import { UpdateRecipe } from "./pages/Recipe/UpdateRecipe";
import { ViewRecipe } from "./pages/Recipe/ViewRecipe";
import { useLogin } from "./hooks/useLogin";

function App() {
  const { loggedIn, onLogin } = useLogin();
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
                  recipeFilterFn={(recipe) => recipe.saved}
                />
              }
            />
            <Route
              path=":id"
              element={<ViewRecipe />}
            />
            <Route
              path=":id/edit"
              element={<UpdateRecipe />}
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
