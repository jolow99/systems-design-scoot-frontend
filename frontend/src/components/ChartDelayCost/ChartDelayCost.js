import React, { useEffect, useState } from "react";
import "./style.css";

// export const Chart_DelayCost = () => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedColumn, setSelectedColumn] = useState(null);

// Expecting the entire Table object as prop to allow dynamic access to different connecting flight numbers
export const Chart_DelayCost = ({ tableData }) => {
  const [selectedColumn, setSelectedColumn] = useState(null);

  // Accessing the specific flight number data from the Table object
  const rows =
    tableData?.rows.map((row) => ({
      name: row.name.replace(/_/g, " "), // Replace underscores with spaces for better readability
      noDelay: row.noDelay, // Assume there's a way to calculate or fetch 'noDelay' data if it's not directly provided
      delay: row.delay,
    })) || [];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const selectColumn = (col) => {
    setSelectedColumn(col);
  };

  // const data = {
  //   rows: [
  //     { name: 'Satisfaction', noDelay: 10000, delay: 10000 },
  //     { name: 'Labour', noDelay: 10000, delay: 10000 },
  //     { name: 'Reimbursement', noDelay: 10000, delay: 10000 },
  //     { name: 'Downstream', noDelay: 0, delay: 10000 },
  //     { name: 'Total', noDelay: 30000, delay: 40000}
  //   ],
  // };

  return (
    <div className="chart-component">
      <table>
        <thead>
          <tr>
            <th>Cost($)</th>
            <th style={{ color: "#EE5757" }}>No Delay</th>
            <th style={{ color: "#1679DB" }}>Delay</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td className={selectedColumn === "noDelay" ? "highlight" : ""}>
                {row.noDelay.toLocaleString() || "0"}
              </td>
              <td className={selectedColumn === "delay" ? "highlight" : ""}>
                {row.delay.toLocaleString() || "0"}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <button
                onClick={() => {
                  handleSelect("noDelay");
                  selectColumn("noDelay");
                }}
                className={`${selectedOption === "noDelay" ? "selected" : ""} ${
                  selectedColumn === "noDelay" ? "highlight" : ""
                }`}
              >
                Select
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  handleSelect("delay");
                  selectColumn("delay");
                }}
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
