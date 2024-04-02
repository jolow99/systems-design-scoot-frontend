import React, { useState, useEffect } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import ReportSection from "./ReportSection";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [flightsData, setFlightsData] = useState({});
  const [selectedFlightNumber, setSelectedFlightNumber] = useState("");
  const [flightSchedules, setFlightSchedules] = useState({});
  const [newArrivalTime, setNewArrivalTime] = useState("");
  const onSearch = (flightNumber, newTime, includeIATCIFlights, showPassengerNames) => {
    //TODO: put ur on search logic here
    //TODO: after hit api, setSearchResults with the response
    setNewArrivalTime(newTime);
    // console log newTime
    console.log(newTime);
  };

  const FIXED_DATE = "01";

  useEffect(() => {
    fetch("/connecting_flights_dictionary.json")
      .then((response) => response.json())
      .then((data) => {
        setFlightsData(data[FIXED_DATE]);
      })
      .catch((error) => console.error("Error fetching flights data:", error));
    fetch("/flights_schedule_dict.json")
      .then((response) => response.json())
      .then((data) => {
        setFlightSchedules(data[FIXED_DATE]);
      })
      .catch((error) =>
        console.error("Error fetching flight schedules data:", error)
      );
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
            onSearch={onSearch}
            flightsData={flightsData}
            onFlightSelect={handleFlightSelect}
            fixedDate={FIXED_DATE}
            newArrivalTime={newArrivalTime}
          />
          <ReportSection
            newArrivalTime={newArrivalTime}
            selectedFlightNumber={selectedFlightNumber}
            fixedDate={FIXED_DATE}
            flightSchedules={flightSchedules}
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
