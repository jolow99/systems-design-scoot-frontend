import React, { useState, useEffect } from "react";
import "./ReportSection.css";
import Modal from "../components/modal";
import { LineChart_FlightCost } from "../components/LineChartFlightCost";
import { Chart_DelayCost } from "../components/ChartDelayCost";

const ReportSection = ({ rows, className, connectingFlightsData }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedJustification, setSelectedJustification] = useState(null);
  const [remarks, setRemarks] = useState("");

  const BUTTONS = {
    displayValue1: "actual label 1",
    displayValue2: "actual label 2",
    displayValue3: "actual label 3",
    displayValue4: "actual label 4",
  };

  // TODO: on submit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!selectedJustification) {
      return;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="report-header">
        <div className="report-title">View</div>
        <div className="report-subtitle">Scoot</div>
        <div className="report-details">
          <div>06FEB24 16</div>
          <div>Downline Passenger Report</div>
          <div>By: SHQIUB</div>
        </div>
      </div>
      <div className="report-metadata">
        <div>Origin City: UPG</div>
        <div>Flight No.: 235</div>
        <div>Flight Date: 06FEB24</div>
      </div>
      <div className="w-[90%] m-8 flex flex-col items-center justify-center overflow-y-auto shadow-md sm:rounded-lg">
        {connectingFlightsData &&
          Object.entries(connectingFlightsData).map(([flightNum, details]) => (
            <div
              key={flightNum}
              onClick={() => setSelectedRow(details)}
              className="w-full border-b px-6 py-4 hover:cursor-pointer"
            >
              <p>Flight Number: {flightNum}</p>
              <p>P2P: {details.p2p}</p>
              <p>CP: {details.cp}</p>
              {/* Insert additional details as needed */}
            </div>
          ))}
      </div>

      <div className="end-of-report">End of report</div>
      <Modal isOpen={selectedRow} onClose={() => setSelectedRow(null)}>
        <div className="p-8 flex flex-col w-full">
          {/* TODO: graph */}
          <div className="flex flex-row w-full justify-center items-center">
            <div className="w-[500px] h-[350px] border-2 flex flex-col justify-center items-center">
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Flight: XXX
              </span>
              <LineChart_FlightCost />
            </div>
          </div>

          {/* TODO: display data */}
          <div className="flex flex-row justify-between items-center w-full">
            <Chart_DelayCost />
          </div>

          <div className="mt-3">
            <div className="text-xl flex flex-row justify-start">
              Justification
            </div>
            <div className="flex flex-row justify-between items-center flex-wrap w-full gap-2">
              {Object.keys(BUTTONS).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedJustification(BUTTONS[key])}
                  className="text-white px-4 py-2 rounded"
                  style={{
                    backgroundColor:
                      BUTTONS[key] === selectedJustification
                        ? "#82de85"
                        : "#f9f9f9",
                    color:
                      BUTTONS[key] === selectedJustification ? "#fff" : "#000",
                  }}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* TODO: remark text box */}
          <div className="mt-8">
            <textarea
              className="w-full p-4 text-black border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Remarks..."
              rows="2"
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
          </div>

          <div className="mt-8">
            <button
              style={{ backgroundColor: "#9c9c9c" }}
              className="text-white px-4 py-3 rounded"
              onClick={handleOnSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const Row = ({ row, onClick }) => {
  const isDecided = row.connectedTime > 60;

  const baseClasses = "w-full border-b px-6 py-4 hover:cursor-pointer";
  const conditionalClasses = isDecided
    ? "bg-red-300 hover:bg-red-500"
    : "bg-white hover:bg-gray-400";

  const className = `${baseClasses} ${conditionalClasses}`;

  return (
    <div onClick={onClick} className={className}>
      {row.connectedTime}
    </div>
  );
};

export default ReportSection;
