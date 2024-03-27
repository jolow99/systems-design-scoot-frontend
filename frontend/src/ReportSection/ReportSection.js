import React, {useState} from "react";
import "./ReportSection.css";
import Modal from '../components/modal';

const ReportSection = ({rows, className}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedJustification, setSelectedJustification] = useState(null);

  const BUTTONS = {
    displayValue1: "actual label 1",
    displayValue2: "actual label 2",
    displayValue3: "actual label 3",
    displayValue4: "actual label 4",
  }

  // TODO: on submit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!selectedJustification) {
      return;
    }
  }

  return (
    <div className={`w-full ${className}`}>
    Report Section

    <div className='w-full m-10 flex flex-col items-center justify-center overflow-y-auto shadow-md sm:rounded-lg'>
      {
        rows.map((row, index) => (
          <Row key={index} row={row} onClick={()=>setSelectedRow(row)}/>
        ))
      }
    </div>

    <Modal isOpen={selectedRow} onClose={()=>setSelectedRow(null)}>
      <div className="p-8 flex flex-col w-full">

        {/* TODO: graph */} 
        <div className='flex flex-row w-full justify-center items-center mt-8 mb-4'>
          <div className="w-[300px] h-[100px] border-2 flex flex-col justify-center items-center">
            GRAPH
          </div>
        </div>

        {/* TODO: display data */} 
        <div className='flex flex-row justify-between items-center w-full mt-8'>
          <div className='flex-1'>DATA 1</div>
          <div className='flex-1'>DATA 2</div>
        </div>

        <div className='mt-8'>
          <div className='text-xl flex flex-row justify-start mt-5'>Justification</div>
          <div className='flex flex-row justify-between items-center flex-wrap w-full mt-2 gap-2'>
            {
              Object.keys(BUTTONS).map((key) => (
                <button key={key} onClick={()=>setSelectedJustification(BUTTONS[key])} className={` text-white px-4 py-2 rounded ${BUTTONS[key] === selectedJustification ? "bg-blue-500" : "bg-gray-500"}`}>{key}</button>
              ))
            }
          </div>
        </div>

        <div className='mt-8'>
          <button className='bg-green-500 text-white px-4 py-3 rounded' onClick={handleOnSubmit}>Submit</button>
        </div>

      </div>
    </Modal>
    </div>
  )
};

const Row = ({row, onClick}) => {
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
  )
}

export default ReportSection;
