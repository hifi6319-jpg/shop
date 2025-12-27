import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ProductDetails from './pages/ProductDetails';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <CartSidebar />
        </Router>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
