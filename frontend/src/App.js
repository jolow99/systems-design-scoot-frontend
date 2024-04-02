import React, { useState, useEffect } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import ReportSection from "./ReportSection";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  //add---
  const [flightsData, setFlightsData] = useState({});
  const [selectedFlightNumber, setSelectedFlightNumber] = useState("");

  const onSearch = (flightNumber, includeIATCIFlights, showPassengerNames) => {
    //TODO: put ur on search logic here
    //TODO: after hit api, setSearchResults with the response
  };

  const FIXED_DATE = "01";

  //add---
  useEffect(() => {
    // Simulate fetching flight data
    fetch("/connecting_flights_dictionary.json")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the structure is "01": {"flightNumber": {"connecting_flights": {...}}}
        // and you want to use the fixed date "01"
        setFlightsData(data[FIXED_DATE]);
      })
      .catch((error) => console.error("Error fetching flights data:", error));
  }, []);

  const handleFlightSelect = (flightNumber) => {
    setSelectedFlightNumber(flightNumber);
  };

  return (
    <div className="App w-screen h-screen">
      <Header />
      <div className="flex flex-row justify-center w-full mt-4 max-h-full">
        <div className="max-w-[1200px] w-full flex flex-row">
          <FilterBar
            flightsData={flightsData}
            onFlightSelect={handleFlightSelect}
            fixedDate={FIXED_DATE}
          />
          <ReportSection
            connectingFlightsData={
              selectedFlightNumber
                ? flightsData[selectedFlightNumber]?.connecting_flights
                : {}
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
