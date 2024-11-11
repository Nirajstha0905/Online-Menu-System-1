import React from "react";
import tableImage from "../Components/assets/Table.png"; // Add the image path
import "./Styles/Table.css";
function Table({ toggleCart }) {
  return (
    <div className="table-container">
      <img
        src={tableImage}
        alt="Table"
        className="table-image"
        onClick={toggleCart} // Toggle cart visibility on image click
      />
    </div>
  );
}

export default Table;
