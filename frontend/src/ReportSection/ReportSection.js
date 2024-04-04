import React, { useState } from "react";
import "./delayCostChartStyle.css";
import "./ReportSection.css";
import Modal from "../components/modal";
import { LineChart_FlightCost } from "../components/LineChartFlightCost";

const Chart_DelayCost = ({ onSelectColumnData, tableData }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSelectedColumn(option);
    onSelectColumnData(option);
  };

  return (
    <div className="chart-component">
      <table>
        <thead>
          <tr>
            <th>Cost($)</th>
            <th
              style={{ color: "rgb(238, 87, 87)", backgroundColor: "#f4f4f4" }}
            >
              No Delay
            </th>
            <th
              style={{ color: "rgb(22, 121, 219)", backgroundColor: "#f4f4f4" }}
            >
              Delay
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td className={selectedColumn === "noDelay" ? "highlight" : ""}>
                {row.noDelay.toLocaleString()}
              </td>
              <td className={selectedColumn === "delay" ? "highlight" : ""}>
                {row.delay.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <button
                onClick={() => handleSelect("noDelay")}
                className={`${selectedOption === "noDelay" ? "selected" : ""} ${
                  selectedColumn === "noDelay" ? "highlight" : ""
                }`}
              >
                Select
              </button>
            </td>
            <td>
              <button
                onClick={() => handleSelect("delay")}
                className={`${selectedOption === "delay" ? "selected" : ""} ${
                  selectedColumn === "delay" ? "highlight" : ""
                }`}
              >
                Select
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const ReportSection = ({
  rows,
  className,
  connectingFlightsData,
  flightNumber,
  flightSchedules,
  fixedDate,
  selectedConnectingFlightNumber,
  setSelectedConnectingFlightNumber,
  newArrivalTime,
  searchResults,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedJustification, setSelectedJustification] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(null);
  const scheduleInfo = flightSchedules[flightNumber];

  // console.log(newArrivalTime);
  // console.log(flightNumber);
  // console.log(searchResults);
  // console.log(selectedConnectingFlightNumber);

  const BUTTONS = {
    displayValue1: "Return Sector Issues",
    displayValue2: "FDP Issues",
    displayValue3: "Airport Curfew",
    displayValue4: "Others",
  };

  const handleSelectColumnData = (column) => {
    setSelectedColumn(column);
    console.log(`Selected Column: ${column}`);
  };

  const handleOnSubmit = () => {
    const formData = {
      rows: searchResults["Table"]?.[selectedConnectingFlightNumber]?.rows || []
    };

    const highlightColumn = selectedColumn;
    const formJustification = selectedJustification;
    const formRemarks = remarks;
    const headers = [
      "Cost Category",
      highlightColumn === "noDelay" ? "No Delay ($)**" : "No Delay ($)",
      highlightColumn === "delay" ? "Delay ($)**" : "Delay ($)",
    ];

    const rowsCsv = formData.rows.map((row) =>
      [
        row.name,
        highlightColumn === "noDelay" ? `${row.noDelay}**` : row.noDelay,
        highlightColumn === "delay" ? `${row.delay}**` : row.delay,
      ].join(",")
    );

    const selectedDecisionNote = `"** indicates the selected decision"`;

    const csvContent = [
      headers.join(","),
      ...rowsCsv,
      "",
      "Justification," + formJustification,
      "Remarks," + formRemarks,
      "",
      selectedDecisionNote,
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const filename = `delayReport_TR${selectedConnectingFlightNumber}.csv`;

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="report-header">
        <div className="report-title">View</div>
        <div className="report-subtitle text-bold">Scoot</div>
        <div className="report-details">
          <div>01JAN24 16:04</div>
          <div>Downline Passenger Report</div>
          <div>By: SHQIUB</div>
        </div>
      </div>
      <div className="report-metadata">
        <div>Origin City: {scheduleInfo?.departure}</div>
        <div>Flight No: TR{flightNumber}</div>
        <div>Flight Date: {fixedDate}JAN24</div>
      </div>
      <div className="w-[90%] m-8 flex flex-col items-center justify-center overflow-y-auto shadow-md sm:rounded-lg">
        {connectingFlightsData &&
          Object.entries(connectingFlightsData).map(([flightNum, details]) => (
            <Row
              key={flightNum}
              flightNum={flightNum}
              details={{
                ...details,
                departure_time: flightSchedules[flightNum]?.departure_time,
                arrival: flightSchedules[flightNum]?.arrival,
              }}
              newArrivalTime={newArrivalTime}
              onClick={() => {
                setSelectedConnectingFlightNumber(flightNum);
                setSelectedRow(details);
              }}
            />
          ))}
      </div>

      <div className="end-of-report">End of report</div>
      <Modal isOpen={selectedRow} onClose={() => setSelectedRow(null)}>
        <div className="p-8 flex flex-col w-full">
          <div className="text-xl flex flex-row justify-start">
            Delay Cost Graph
          </div>
          <div className="flex flex-row w-full justify-center items-center">
            <div className="w-[500px] h-[370px] border-2 flex flex-col justify-center items-center">
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Flight: TR{selectedConnectingFlightNumber}
              </span>
              <LineChart_FlightCost
                connectingFlightNumber={selectedConnectingFlightNumber}
                costData={
                  searchResults["Line"]?.[selectedConnectingFlightNumber]
                    ?.sum || []
                }
              />
            </div>
          </div>

          {/* TODO: display data */}
          <div className="text-xl flex flex-row justify-start">
            Minimum Cost Chart
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <Chart_DelayCost
              onSelectColumnData={handleSelectColumnData}
              connectingFlightNumber={selectedConnectingFlightNumber}
              tableData={
                searchResults["Table"]?.[selectedConnectingFlightNumber]
                  ?.rows || []
              }
            />
            {console.log(searchResults["Table"]?.[selectedConnectingFlightNumber]
                ?.rows || [])}
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
                    fontWeight: BUTTONS[key] === selectedJustification ? "bold" : "normal",
                  }}
                >
                  {BUTTONS[key]}
                </button>
              ))}
            </div>
          </div>

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

const Row = ({ flightNum, details, onClick, newArrivalTime }) => {
  // console.log(
  //   `newArrivalTime: ${newArrivalTime}, departure_time: ${details.departure_time}`
  // );
  const timeToMinutes = (time) => {
    if (typeof time !== "string") {
      return null; 
    }
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const departureTimeMinutes = timeToMinutes(details.departure_time);
  const newArrivalTimeMinutes = timeToMinutes(newArrivalTime);

  // console.log(
  //   `Converted departureTime: ${departureTimeMinutes}, Converted newArrivalTime: ${newArrivalTimeMinutes}`
  // );

  // const isAfterNewArrival = departureTimeMinutes < newArrivalTimeMinutes;
  const isAfterNewArrival = newArrivalTimeMinutes > departureTimeMinutes;
  const isWithinMCT = departureTimeMinutes - newArrivalTimeMinutes  >= 60;

  const rowStyle = isAfterNewArrival || !isWithinMCT ? { backgroundColor: '#ff5050', color: 'white' } : {};

  return (
    <div onClick={() => onClick(details)} className="w-full border-b px-6 py-4 hover:cursor-pointer rounded-lg" style={rowStyle}>
      <p className="font-bold">TR{flightNum}</p>
      <p>Point to point passengers: {details.p2p}</p>
      <p>Connecting passengers: {details.cp}</p>
      <p>Departure Time: {details.departure_time}</p>
      <p>Arrival City: {details.arrival}</p>
      {/* {(isAfterNewArrival || !isWithinMCT) && (
        <p className="text-red-500">Delay decision required</p>
      )} */}
    </div>
  );
};

export default ReportSection;
