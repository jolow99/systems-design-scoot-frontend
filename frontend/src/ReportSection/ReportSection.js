import React, { useState } from "react";
import "./delayCostChartStyle.css";
import "./ReportSection.css";
import Modal from "../components/modal";
import { LineChart_FlightCost } from "../components/LineChartFlightCost";

const Chart_DelayCost = ({ onSelectColumnData }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSelectedColumn(option);
    onSelectColumnData(option);
  };

  const data = {
    rows: [
      { name: "Satisfaction", noDelay: 10000, delay: 10000 },
      { name: "Labour", noDelay: 10000, delay: 10000 },
      { name: "Reimbursement", noDelay: 10000, delay: 10000 },
      { name: "Downstream", noDelay: 0, delay: 10000 },
      { name: "Total", noDelay: 30000, delay: 40000 },
    ],
  };

  return (
    <div className="chart-component">
      <table>
        <thead>
          <tr>
            <th>Cost($)</th>
            <th
              style={{ color: "rgb(238, 87, 87)", backgroundColor: "#f4f4f4" }}
              // style={{ color: 'rgb(238, 87, 87)', backgroundColor: selectedColumn === 'noDelay' ? '#ffbf75' : '#f4f4f4' }}
            >
              No Delay
            </th>
            <th
              style={{ color: "rgb(22, 121, 219)", backgroundColor: "#f4f4f4" }}
              // style={{ color: 'rgb(22, 121, 219)', backgroundColor: selectedColumn === 'delay' ? '#ffbf75' : '#f4f4f4' }}
            >
              Delay
            </th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
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
  selectedFlightNumber,
  flightSchedules,
  fixedDate,
  selectedConnectingFlightNumber,
  newArrivalTime, 
  searchResults,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedJustification, setSelectedJustification] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(null);
  const scheduleInfo = flightSchedules[selectedFlightNumber];

  // console.log(newArrivalTime);

  const BUTTONS = {
    displayValue1: "Reurn Sector Issues",
    displayValue2: "FDP Issues",
    displayValue3: "Airport Curfew",
    displayValue4: "Others",
  };

  const handleSelectColumnData = (column) => {
    setSelectedColumn(column);
    console.log(`Selected Column: ${column}`);
  };

  // TODO: on submit generate csv file
  const handleOnSubmit = () => {
    const formData = {
      rows: [
        { name: "Satisfaction", noDelay: 10000, delay: 10000 },
        { name: "Labour", noDelay: 10000, delay: 10000 },
        { name: "Reimbursement", noDelay: 10000, delay: 10000 },
        { name: "Downstream", noDelay: 0, delay: 10000 },
        { name: "Total", noDelay: 30000, delay: 40000 },
      ],
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

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "delayReport.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="report-header">
        <div className="report-title">View</div>
        <div className="report-subtitle">Scoot</div>
        <div className="report-details">
          <div>01JAN24 16</div>
          <div>Downline Passenger Report</div>
          <div>By: SHQIUB</div>
        </div>
      </div>
      <div className="report-metadata">
        <div>Origin City: {scheduleInfo?.departure}</div>
        <div>Flight No:{selectedFlightNumber}</div>
        <div>Flight Date: {fixedDate}JAN24</div>
      </div>
      <div className="w-[90%] m-8 flex flex-col items-center justify-center overflow-y-auto shadow-md sm:rounded-lg">
        {connectingFlightsData &&
          Object.entries(connectingFlightsData).map(([flightNum, details]) => (
            // <div
            //   key={flightNum}
            //   onClick={() => setSelectedRow(details)}
            //   className="w-full border-b px-6 py-4 hover:cursor-pointer"
            // >
            //   <p>TR {flightNum}</p>
            //   <p>Point to point passengers: {details.p2p}</p>
            //   <p>Connecting passengers: {details.cp}</p>
            //   <p>
            //     Departure Time: {flightSchedules[flightNum]?.departure_time}
            //   </p>
            //   <p>Arrival City: {flightSchedules[flightNum]?.arrival}</p>
            //   {/* Insert additional details as needed */}
            // </div>
            <Row
              key={flightNum}
              flightNum={flightNum}
              details={{
                ...details,
                departure_time: flightSchedules[flightNum]?.departure_time,
                arrival: flightSchedules[flightNum]?.arrival,
              }}
              newArrivalTime={newArrivalTime}
              onClick={setSelectedRow} // Pass the setSelectedRow function directly
            />
          ))}
      </div>

      <div className="end-of-report">End of report</div>
      <Modal isOpen={selectedRow} onClose={() => setSelectedRow(null)}>
        <div className="p-8 flex flex-col w-full">
          {/* TODO: graph */}
          <div className="flex flex-row w-full justify-center items-center">
            <div className="w-[500px] h-[350px] border-2 flex flex-col justify-center items-center">
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Flight: {selectedFlightNumber} //this should be the connecting flight
                number
              </span>
              <LineChart_FlightCost
                // connectingFlightNumber={selectedConnectingFlightNumber} // Pass the connecting flight number to the chart
                // data={
                //   searchResults["Line"][selectedConnectingFlightNumber]?.sum ||
                //   []
                // }
              />
            </div>
          </div>

          {/* TODO: display data */}
          <div className="flex flex-row justify-between items-center w-full">
            <Chart_DelayCost onSelectColumnData={handleSelectColumnData} />
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
                  {BUTTONS[key]}
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

// const Row = ({ row, onClick }) => {
//   const isDecided = row.connectedTime > 60;

//   const baseClasses = "w-full border-b px-6 py-4 hover:cursor-pointer";
//   const conditionalClasses = isDecided
//     ? "bg-red-300 hover:bg-red-500"
//     : "bg-white hover:bg-gray-400";

//   const className = `${baseClasses} ${conditionalClasses}`;

//   return (
//     <div onClick={onClick} className={className}>
//       {row.connectedTime}
//     </div>
//   );
// };

const Row = ({ flightNum, details, onClick, newArrivalTime }) => {
  console.log(`newArrivalTime: ${newArrivalTime}, departure_time: ${details.departure_time}`);
  const timeToMinutes = (time) => {
    if (typeof time !== 'string') {
      // console.error('Invalid time format:', time);
      return null; // Return null to indicate an error
    }
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const departureTimeMinutes = timeToMinutes(details.departure_time);
  const newArrivalTimeMinutes = timeToMinutes(newArrivalTime);
  
  console.log(`Converted departureTime: ${departureTimeMinutes}, Converted newArrivalTime: ${newArrivalTimeMinutes}`);

  const isAfterNewArrival = departureTimeMinutes > newArrivalTimeMinutes;

  // Conditional styling based on time comparison
  const rowClasses = `w-full border-b px-6 py-4 hover:cursor-pointer ${isAfterNewArrival ? "bg-red-200" : ""}`;

  return (
    <div
      onClick={() => onClick(details)} 
      className={rowClasses}
    >
      <p>TR {flightNum}</p>
      <p>Point to point passengers: {details.p2p}</p>
      <p>Connecting passengers: {details.cp}</p>
      <p>Departure Time: {details.departure_time}</p>
      <p>Arrival City: {details.arrival}</p>
      {isAfterNewArrival && <p className="text-red-500">Departs after new arrival time</p>}
    </div>
  );
};


export default ReportSection;