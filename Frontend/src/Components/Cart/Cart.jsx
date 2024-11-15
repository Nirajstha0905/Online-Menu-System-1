import React from "react";
import "./Cart.css"; // Create a separate CSS file for styling the cart modal

function Cart({ items }) {
  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <h2>Your Cart</h2>
        {items.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.name} - Rs. {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        <button className="close-btn" onClick={() => setCartVisible(false)}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Cart;
