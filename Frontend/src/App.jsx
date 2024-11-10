import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import FoodCategory from "./Pages/FoodCategory";
import Login from "./Pages/Login";
import Table from "./Pages/Table";
import Welcome from "./Pages/Welcome";
import Navbar from "./Components/Navbar/index";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import { GoogleOAuthProvider } from "@react-oauth/google";

//adding google client ID here

function Layout() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" || location.pathname === "/login" ? null : (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/category/:category" element={<FoodCategory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/table" element={<Table />} />
      </Routes>
      {location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/table" ? null : (
        <Cart />
      )}
      {location.pathname === "/" || location.pathname === "/login" ? null : (
        <Footer />
      )}
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
