import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./pages/Home";

function App() {
  return (
    <div className="p-8 flex flex-col h-screen bg-stone-200">
      <Navbar />
      <main className="flex-grow">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
