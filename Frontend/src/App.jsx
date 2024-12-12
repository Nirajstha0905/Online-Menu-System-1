import React, { createContext, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./Pages/Home.jsx";
import FoodCategory from "./Pages/FoodCategory";
import SearchItem from "./Pages/SearchItem.jsx"
import Login from "./Pages/Login";
import Welcome from "./Pages/Welcome";
import Navbar from "./Components/Navbar/index";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart/Cart.jsx";
import Table from "./Pages/Table.jsx";

export const CartContext = createContext();

function Layout() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("CartItems")) || []
  );
  const [itemQuantity, setItemQuantity] = useState(1);
  const location = useLocation();

  const [count, setCount] = useState(
    Number(localStorage.getItem("count")) || 0
  );

  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    localStorage.setItem("count", count);
    localStorage.setItem("CartItems", JSON.stringify(cartItems));
  }, [count, cartItems]);

  const addToCart = (item) => {
    const updatedItems = Array.isArray(item)
      ? item.map((ele) => ({
          ...ele,
          quantity: itemQuantity,
        }))
      : [{ ...item, quantity: itemQuantity }];

    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];

      updatedItems.forEach((newItem) => {
        const existingItemIndex = updatedCart.findIndex(
          (cartItem) => cartItem._id === newItem._id
        );

        if (existingItemIndex > -1) {
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + 1,
          };
        } else {
          updatedCart.push(newItem);
        }
      });

      const newCount = updatedCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setCount(newCount);
      return updatedCart;
    });
  };

  function handleSearchItem(item){
    console.log(item)
  }

  const hideNavbarFooter = ["/", "/login"];
  const hideCart = ["/", "/login", "/table"];

  return (
    <>
      {!hideNavbarFooter.includes(location.pathname) && <Navbar searchFunction={handleSearchItem} searchItem={searchItem} setSearchItem={setSearchItem}/>}
      <CartContext.Provider value={{ count, setCount }}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
        <Route
          path="/category/:category"
          element={<FoodCategory onAddToCart={addToCart} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/SearchItem" element={<SearchItem searchItem={searchItem} setSearchItem={setSearchItem} onAddToCart={addToCart}/>} />
        <Route
          path="/table"
          element={
            <Cart
              items={cartItems}
              setItems={setCartItems}
              setItemQuantity={setItemQuantity}
            />
          }
        />
      </Routes>
      {!hideNavbarFooter.includes(location.pathname) && <Footer/>}
      {!hideCart.includes(location.pathname) && (
        <Link to="/table">
          <Table value={count} />
        </Link>
      )}
      </CartContext.Provider>
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
