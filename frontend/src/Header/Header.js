import React from "react";
import "./Header.css";
import print_icon from "../imgs/print_icon.png";

const Header = ({ setOnAdmin, onAdmin }) => (
  <div className="header">
    <div className="logo">
      <span>REPORTS</span>
    </div>
    <div className="title">Downline Passenger And Count</div>
    <button className="text-white p-2 rounde w-32" style={{ position: 'relative', right: '20px' }} onClick={() => setOnAdmin(!onAdmin)}>
      {onAdmin ? 'Overview' : 'Admin'}
    </button>
    <div className="print-icon">
      <img src={print_icon} alt="print icon" />
      <span>Print (Ctrl+P)</span>
    </div>
  </div>
);

export default Header;
