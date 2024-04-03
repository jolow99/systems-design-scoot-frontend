
import React, { useEffect, useState } from 'react';
import './style.css';

const ChartDelayCost = ({ onSelectColumnData, connectingFlightNumber, tableData }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);

  
  const handleSelect = (option) => {
    setSelectedOption(option); 
  };

  const selectColumn = (col) => {
    setSelectedColumn(col); 
  };  

  const data = {
    rows: [
      { name: 'Satisfaction', noDelay: 10000, delay: 10000 },
      { name: 'Labour', noDelay: 10000, delay: 10000 },
      { name: 'Reimbursement', noDelay: 10000, delay: 10000 },
      { name: 'Downstream', noDelay: 0, delay: 10000 },
      { name: 'Total', noDelay: 30000, delay: 40000}
    ],
  };

  return (
    <div className="chart-component">
      <table>
        <thead>
          <tr>
            <th>Cost($)</th>
            <th style={{color: '#EE5757'}}>No Delay</th>
            <th style={{color: '#1679DB'}}>Delay</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td className={selectedColumn === 'noDelay' ? 'highlight' : ''}>
                {row.noDelay.toLocaleString()}
              </td>
              <td className={selectedColumn === 'delay' ? 'highlight' : ''}>
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
                   onClick={() => {
                    handleSelect('noDelay');
                    selectColumn('noDelay');
                  }}
                  className={`${selectedOption === 'noDelay' ? 'selected' : ''} ${selectedColumn === 'noDelay' ? 'highlight' : ''}`}
                >
                  Select
                </button>
              </td>
              <td>
                <button 
                  onClick={() => {
                    handleSelect('delay');
                    selectColumn('delay');
                  }}
                  className={`${selectedOption === 'delay' ? 'selected' : ''} ${selectedColumn === 'delay' ? 'highlight' : ''}`}
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