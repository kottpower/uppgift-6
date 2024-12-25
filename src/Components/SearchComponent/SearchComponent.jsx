import React, { useRef, useState } from "react";
import "./SearchComponent.css";

/* api */
import Api from "../../api/api.js";

/* Icons */
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const SearchComponent = ({date,setDate, setNameDay}) => {


  const getNameDay = async (date) => {

    const nameDayResponse = await Api.getNameDay(date);

    setNameDay(() => nameDayResponse);
  };

  const incrementDecrementDate = (value) => {
    const updateDate = new Date(date);
    updateDate.setDate(updateDate.getDate() + value);

    // Hook
    setDate(() => updateDate.toISOString().split("T")[0]);
  };

  const handleButtonClick = (date) => {
      getNameDay(date);
  }

  return (
    <div className="search-component">

    <div>
      <h1>Namnsdag och ålder</h1>
      <hr />
      <div className="search-date">

        <div className="left-arrow" >
          <div className='container-arrow' onClick={() => incrementDecrementDate(-1)}>
            <FaArrowLeft />
          </div>
        </div>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="right-arrow" >
          <div className='container-arrow' onClick={() => incrementDecrementDate(1)}>
            <FaArrowRight />
          </div>
          
        </div>
      </div>
    </div>

      <div className="information-div">
        <p>
          Sidans syfte är att söka på ett datum och se vilka som har namnsdag
          angivet datum. Detta kombineras med ett API där du kan se personens
          uppskattade ålder. Visar endast ett namn per land.
        </p>
      </div>

      <button className="btn" onClick={(e) => handleButtonClick(date)}>
        Sök namnsdagar
      </button>
    </div>
  );
};

export default SearchComponent;
