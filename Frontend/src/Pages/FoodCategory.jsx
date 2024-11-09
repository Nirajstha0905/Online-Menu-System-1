import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FoodCategory() {
  const { category } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((response) => {
        console.log("Fetched items: ", response.data);
        const filteredItems =
          category === "All"
            ? response.data
            : response.data.filter((item) => item.category === category);

        setItems(filteredItems);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [category]);

  return (
    <div>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item._id} style={{ marginBottom: "15px" }}>
              <div>{item.name}</div>
              <div>{item.description}</div>
              <div style={{ marginTop: "5px" }}>Rs. {item.price}</div>
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
