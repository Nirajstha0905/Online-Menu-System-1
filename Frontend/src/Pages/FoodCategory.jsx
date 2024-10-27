import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FoodCategory() {
  const { category } = useParams(); // Get the category from the URL
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch all items from the database
    axios
      .get("http://localhost:5000/api/menu")
      .then((response) => {
        console.log("Fetched items: ", response.data);
        // Filter items based on the category
        const filteredItems =
          category === "All"
            ? response.data
            : response.data.filter((item) => item.category === category);

        setItems(filteredItems);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [category]); // Add category to the dependency array

  return (
    <div>
      <ul>
        {items.length > 0 ? (
          items.map((item) => <ul key={item._id}>{item.name}</ul>)
        ) : (
          <p>No items found in this category.</p>
        )}
      </ul>
    </div>
  );
}

export default FoodCategory;
