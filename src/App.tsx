import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "@/components/Layout/Layout";
import { Recipes } from "@/pages/Recipe/AllRecipes";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}>
          <Route
            index
            element={<Recipes />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
