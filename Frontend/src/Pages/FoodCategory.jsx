import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Styles/FoodCategory.css";

function FoodCategory({ onAddToCart }) {
  const { category } = useParams(); // Get the category from the URL params
  const [items, setItems] = useState([]); // Items state to hold menu items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Set loading to true before starting the fetch
    setLoading(true);
    setError(null); // Reset any previous error

    // Fetch data from the API
    axios
      .get("http://localhost:5000/api/menu")
      .then((response) => {
        // Filter items based on category
        const filteredItems =
          category === "All"
            ? response.data
            : response.data.filter((item) => item.category === category);

        // Update items and loading state
        setItems(filteredItems);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError("Failed to load menu items.");
        setLoading(false); // Set loading to false if there's an error
      });
  }, [category]); // Dependency on category, so fetch again when category changes

  if (loading) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }

  if (error) {
    return <p>{error}</p>; // Show error message if data fetching fails
  }

  return (
    <div className="food-category">
      <h2 className="category-title">{category}</h2>
      <ul className="item-list">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item._id} className="item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Rs. {item.price.toFixed(2)}</p>
              </div>
              <button
                className="add-button"
                onClick={() => onAddToCart(item)} // Add item to cart on button click
              >
                Add
              </button>
            </li>
          ))
        ) : (
          <p>No items found in this category.</p> // If no items, display this message
        )}
      </ul>
    </div>
  );
}

export default FoodCategory;
