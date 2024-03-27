import React, { useState } from "react";
import "./FilterBar.css";

const FilterBar = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [includeIATCIFlights, setIncludeIATCIFlights] = useState(true);
  const [showPassengerNames, setShowPassengerNames] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission logic here
    console.log(flightNumber, includeIATCIFlights, showPassengerNames);
  };

  return (
    <div className="filter-bar">
      <form onSubmit={handleSubmit}>
        <label>
          Flight:
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder="Enter flight number"
          />
        </label>

        <label>
          Include IATCI Flights?
          <label>
            Yes
            <input
              type="radio"
              name="includeIATCIFlights"
              checked={includeIATCIFlights === true}
              onChange={() => setIncludeIATCIFlights(true)}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="includeIATCIFlights"
              checked={includeIATCIFlights === false}
              onChange={() => setIncludeIATCIFlights(false)}
            />
          </label>
        </label>

        <label>
          Show Passenger Names
          <label>
            Yes
            <input
              type="radio"
              name="showPassengerNames"
              checked={showPassengerNames === true}
              onChange={() => setShowPassengerNames(true)}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="showPassengerNames"
              checked={showPassengerNames === false}
              onChange={() => setShowPassengerNames(false)}
            />
          </label>
        </label>

        <button type="submit">Go</button>
        <button
          type="button"
          onClick={() => {
            /* logic for print only */
          }}
        >
          Print Only
        </button>
      </form>
    </div>
  );
};

export default FilterBar;
