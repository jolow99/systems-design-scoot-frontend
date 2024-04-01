import React from "react";
import "./Header.css";
import print_icon from "../imgs/print_icon.png";

const Header = () => (
  <div className="header">
    <div className="logo">
        <span>REPORTS</span>
    </div>
    <div className="title">Downline Passenger And Count</div>
    <div className="print-icon">
        <img src={print_icon} alt="print icon" />
        <span>Print (Ctrl+P)</span>
    </div>
  </div>
);

export default Header;
