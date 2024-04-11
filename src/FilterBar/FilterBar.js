import React, { useState, useEffect } from "react";
import "./FilterBar.css";

const FilterBar = ({
  className,
  onSearch,
  flightsData,
  fixedDate,
}) => {
  const [flightNumber, setFlightNumber] = useState("");
  const [includeIATCIFlights, setIncludeIATCIFlights] = useState(true);
  const [showPassengerNames, setShowPassengerNames] = useState(false);
  const [newArrivalTime, setNewArrivalTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(flightNumber, includeIATCIFlights, showPassengerNames);

    if (!newArrivalTime.match(/^\d{2}:\d{2}$/)) {
      console.error("Invalid newArrivalTime format");
      setErrorMessage("Invalid time format");
      return;
    }

    const [hours, minutes] = newArrivalTime.split(':').map(Number);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        console.error("Invalid time. Hours should be between 00 and 23, and minutes should be between 00 and 59.");
        setErrorMessage("Invalid time");
        return;
    }

    console.log(flightNumber);
    if (flightNumber.trim().length === 0) {
      console.error("Flight number is required");
      setErrorMessage("Flight number is required");
      return;
    }

    setErrorMessage("");

    onSearch(
      flightNumber,
      newArrivalTime,
      includeIATCIFlights,
      showPassengerNames,
    );
  };

  const handleTimeChange = (e) => {
    const { value } = e.target;
    let newValue = value.replace(/[^\d:]/g, ''); 
    if (newValue.startsWith(':')) {
      newValue = newValue.slice(1);
    }
  
    if (newArrivalTime.length === 3 && value.length === 2) {
      newValue = newValue.slice(0, 1); 
    } else if (newValue.length === 2 && !newArrivalTime.endsWith(":")) {
      newValue += ':';
    } else if (newValue.length > 2) {
      newValue = newValue.slice(0, 2) + ':' + newValue.slice(2).replace(/:/g, '');
    }
    
    setNewArrivalTime(newValue.substring(0, 5)); 
  };
  

  return (
    <div
      className={`filter-bar bg-gray-50 p-4 rounded-lg shadow-md w-1/2 ${className}`}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 text-lg">Flight:</label>
          <label className="font-semibold text-gray-700 text-left text-lg">Parameters</label>
          <select onChange={(e) => { setFlightNumber(e.target.value) }}>
            <option value="">Select a flight</option>
            {Object.keys(flightsData).map((flightNumber) => (
              <option key={flightNumber} value={flightNumber}>
                TR{flightNumber} {fixedDate}JAN
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">
            New Arrival Time:
          </label>
          <input
            type="text"
            value={newArrivalTime}
            // onChange={(e) => setNewArrivalTime(e.target.value)}
            onChange={handleTimeChange}
            placeholder="HH:MM"
            maxLength="5"
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <fieldset className="space-y-1">
          <legend className="font-semibold text-gray-700">
            Include IATCI Flights?
          </legend>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="includeIATCIFlights"
                checked={includeIATCIFlights === true}
                onChange={() => setIncludeIATCIFlights(true)}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="includeIATCIFlights"
                checked={includeIATCIFlights === false}
                onChange={() => setIncludeIATCIFlights(false)}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              />
              <span>No</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-1">
          <legend className="font-semibold text-gray-700">
            Show Passenger Names
          </legend>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="showPassengerNames"
                checked={showPassengerNames === true}
                onChange={() => setShowPassengerNames(true)}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="showPassengerNames"
                checked={showPassengerNames === false}
                onChange={() => setShowPassengerNames(false)}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              />
              <span>No</span>
            </label>
          </div>
        </fieldset>

        <div className="flex justify-start space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Go
          </button>
          <button
            type="button"
            onClick={() => {
              /* logic for print only */
            }}
            className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            Print Only
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
