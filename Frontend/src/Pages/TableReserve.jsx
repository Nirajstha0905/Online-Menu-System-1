import React, { useContext } from "react";
import Table from "../Components/assets/OrderTable.png";
import "./Styles/TableReserve.css";
import { CartContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../App.css";

function TableReserve({ noOfTables }) {
  const { tableNumber, setTableNumber } = useContext(CartContext);
  const navigate = useNavigate();

  const bookTable = (TableNumber) => {
    if (tableNumber !== null) {
      navigate("/Home");
    } else {
      setTableNumber(TableNumber);
      localStorage.setItem("TableNumber", TableNumber);
      navigate("/Home");
    }
  };

  return (
    <>
      <center>
        <h1>welcome {localStorage.getItem("userName")}</h1>
        <h1 className="my-heading">Reserve Your Table:</h1>

        <div className="table-warning">
          Alert! Please check your Table no. carefully before selecting table.
          In case you choose wrong table no. then your food may not reach you.
        </div>
      </center>
      <div className="table-collection">
        {[...Array(noOfTables)].map((element, i) => {
          const TableNumber = i + 1;
          return (
            <div
              className="booking-table"
              onClick={() => bookTable(TableNumber)}
              key={i}
            >
              <img src={Table} alt="" />
              <p>Table No. {TableNumber}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TableReserve;
