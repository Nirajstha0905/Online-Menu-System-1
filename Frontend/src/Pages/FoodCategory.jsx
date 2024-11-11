import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Styles/FoodCategory.css";

function FoodCategory({ onAddToCart }) {
  const { category } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((response) => {
        const filteredItems =
          category === "All"
            ? response.data
            : response.data.filter((item) => item.category === category);
        setItems(filteredItems);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [category]);

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
              <button className="add-button" onClick={() => onAddToCart(item)}>
                Add
              </button>
            </li>
          ))
        ) : (
          <p>No items found in this category.</p>
        )}
      </ul>
    </div>
  );
}

export default FoodCategory;
