import Navbar from './Component/Navbar';
import Home from './Pages/Home';
import BookDetails from './Pages/BookDetails';
import Favorites from './Pages/Favorites';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
