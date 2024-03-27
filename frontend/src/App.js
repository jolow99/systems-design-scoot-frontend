import React, { useState } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import ReportSection from "./ReportSection";
import "./App.css";

function App() {

  const [searchResults, setSearchResults] = useState([]);

  const onSearch = (flightNumber, includeIATCIFlights, showPassengerNames) => {
    //TODO: put ur on search logic here
    //TODO: after hit api, setSearchResults with the response
  };

  return (
    <div className="App w-screen h-screen">
      <Header />
      <div className="flex flex-row justify-center w-full mt-4 max-h-full">
        <div className="max-w-[1200px] w-full flex flex-row">
          <FilterBar className="flex-1 h-full" onSearch={onSearch}/>
          <ReportSection 
            className="flex-2 max-h-full overflow-auto"
            rows={[ //TODO: replace array with searchResults
              {
                "connectedTime": 10,
              },
              {
                "connectedTime": 61,
              },
              {
                "connectedTime": 10,
              },
              {
                "connectedTime": 61,
              },
            ]} 
          />
          </div>
      </div>
    </div>

  );
}

export default App;
