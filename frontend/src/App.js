import React, { useState, useEffect } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar/FilterBar";
import ReportSection from "./ReportSection/ReportSection";
import "./App.css";
import AdminSection from "./adminSection/adminSection";
import { useReadyState } from './ReadyStateContext';

function App() {
  const { makeReady, resetReady } = useReadyState();
  const [onAdmin, setOnAdmin] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [flightsData, setFlightsData] = useState({});
  const [selectedConnectingFlightNumber, setSelectedConnectingFlightNumber] =
    useState("");
  const handleSelectConnectingFlight = (flightNum) => {
    setSelectedConnectingFlightNumber(flightNum);
  };
  const [flightSchedules, setFlightSchedules] = useState({});
  const [newArrivalTime, setNewArrivalTime] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedJustification, setSelectedJustification] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [tableData, setTableData] = useState([]);
  
  const onSearch = async (
    flightNumber,
    newTime,
    includeIATCIFlights,
    showPassengerNames,
  ) => {
    resetReady();
    const fixedDate = "01"; // Ensure this is dynamically updated if necessary
    setNewArrivalTime(newTime);
    setFlightNumber(flightNumber);
    // console.log(newTime);
    const apiURL = `https://systems-design-scoot-backend.vercel.app/flight/${flightNumber}/2023-04-${fixedDate}/${newTime}/False`;
    console.log(apiURL);
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      console.log("Ready state: ", makeReady());
      setSearchResults(data);
      makeReady();
      console.log("Ready state: ", makeReady());
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]); 
    }
  };

  const FIXED_DATE = "01";

  useEffect(() => {
    fetch("/connecting_flights_dict.json")
      .then((response) => response.json())
      .then((data) => {
        setFlightsData(data[FIXED_DATE]);
      })
      .catch((error) => console.error("Error fetching flights data:", error));
    fetch("/flights_schedule.json")
      .then((response) => response.json())
      .then((data) => {
        setFlightSchedules(data[FIXED_DATE]);
      })
      .catch((error) =>
        console.error("Error fetching flight schedules data:", error)
      );
  }, []);

  // console.log("on Amdin")
  // console.log(onAdmin)
  // console.log(setOnAdmin)

  return (
    <div className="App w-screen h-screen">
      <Header setOnAdmin={setOnAdmin} onAdmin={onAdmin} />
      {onAdmin ? <AdminSection /> : 
      <div className="flex flex-row justify-center w-full mt-4 max-h-full">
      <div className="max-w-[1200px] w-full flex flex-row">
        <FilterBar
          onSearch={onSearch}
          searchResults={searchResults}
          flightsData={flightsData}
          fixedDate={FIXED_DATE}
          newArrivalTime={newArrivalTime}
          flightNumber={flightNumber}
        />
        <ReportSection
          newArrivalTime={newArrivalTime}
          searchResults={searchResults}
          fixedDate={FIXED_DATE}
          flightSchedules={flightSchedules}
          connectingFlightData={searchResults}
          selectedConnectingFlightNumber={selectedConnectingFlightNumber}
          setSelectedConnectingFlightNumber={
            setSelectedConnectingFlightNumber
          }
          flightNumber={flightNumber}
          connectingFlightsData={
            flightNumber ? flightsData[flightNumber]?.connecting_flights : {}
          }
          selectedColumn={selectedColumn}
          selectedJustification={selectedJustification}
          remarks={remarks}
          tableData={tableData}
        />
      </div>
    </div>
      } 
    </div>
  );
}

export default App;
