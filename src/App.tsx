import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./components/Layout/Layout";
import { MyRecipes } from "./components/Pages/MyRecipes";
import { Landing } from "./components/Pages/Landing";
import { NotFound } from "./components/Pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "my-recipes",
        element: <MyRecipes />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
