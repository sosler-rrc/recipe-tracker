import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { RecipeList } from "./components/Recipe/RecipeList/RecipeList";

function App() {
  return (
    <div className="p-8 flex flex-col min-h-screen bg-stone-200">
      <Navbar />
      <main className="p-16">
        <RecipeList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
