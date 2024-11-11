// Layout Component
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Cart from "../Components/Cart";
import FoodCategory from "../Pages/FoodCategory";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function Layout() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart([...cart, item]); // Add item to cart state
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/category/:category"
          element={<FoodCategory onAddToCart={handleAddToCart} />}
        />
      </Routes>
      <Cart items={cart} />
    </BrowserRouter>
  );
}

export default Layout;
