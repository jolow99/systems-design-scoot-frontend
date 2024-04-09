import React from "react";
import "./Header.css";
import print_icon from "../imgs/print_icon.png";


const Header = ({setOnAdmin}) => (
  <div className="header">
    <div className="logo">
        <span>REPORTS</span>
    </div>
    <div className="title">Downline Passenger And Count</div>
    <button onClick={() => setOnAdmin(false)}>Overview</button>
    <button onClick={() => setOnAdmin(true)}>Admin</button>
    <div className="print-icon">
        <img src={print_icon} alt="print icon" />
        <span>Print (Ctrl+P)</span>
    </div>
  </div>
);
// add button to go to admin dashboard
export default Header;
