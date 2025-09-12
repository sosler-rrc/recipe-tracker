import { useState } from "react";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { RecipeList } from "./components/Recipe/RecipeList/RecipeList";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const onLogin = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <div className="p-8 flex flex-col min-h-screen bg-stone-200">
      <Navbar onLogin={onLogin} isLoggedIn={loggedIn} />
      <main className="p-16">
        <RecipeList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
