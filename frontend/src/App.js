import React from "react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import ReportSection from "./ReportSection";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <FilterBar />
      <ReportSection />
    </div>
  );
}

export default App;
