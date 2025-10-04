import Navbar from './Component/Navbar';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import { Routes, Route } from "react-router-dom";
import React, { Suspense } from 'react';

const BookDetails = React.lazy(() => import('./Pages/BookDetails'));

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/book/:id"
          element={
            <Suspense fallback={<div className="p-6">Loading details...</div>}>
              <BookDetails />
            </Suspense>
          }
        />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
