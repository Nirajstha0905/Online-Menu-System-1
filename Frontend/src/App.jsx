import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import FoodCategory from "./Pages/FoodCategory";
import Login from "./Pages/Login";
import Table from "./Pages/Table";
import Welcome from "./Pages/Welcome";
import Navbar from "./Components/Navbar/index";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart/Cart";
import { GoogleOAuthProvider } from "@react-oauth/google";

function Layout() {
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false); // State for toggling cart visibility

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const toggleCart = () => {
    setCartVisible((prev) => !prev); // Toggle cart visibility
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
        <Route
          path="/category/:category"
          element={<FoodCategory onAddToCart={addToCart} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/table" element={<Table toggleCart={toggleCart} />} />
      </Routes>
      {cartVisible && <Cart items={cartItems} />}{" "}
      {/* Show cart if cartVisible is true */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId="244499214878-ski0knaamlp5gra4dlivu1lr9c5k1b17.apps.googleusercontent.com">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
