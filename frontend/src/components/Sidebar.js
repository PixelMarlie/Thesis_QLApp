import React, { useState } from "react";
import "../styles/sidebar.css";

function Sidebar({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const openIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 700 960" width="20px" fill="#e8eaed"><path d="M288-88.35 212.35-164l316-316-316-316L288-871.65 679.65-480 288-88.35Z"/></svg>);
  const closeIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 700 960" width="20px" fill="#e8eaed"><path d="M391.65-88.35 0-480l391.65-391.65L467.3-796l-316 316 316 316-75.65 75.65Z"/></svg>);

  const logoutIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log("Sidebar open state: ", !isOpen);
  };

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          {isOpen ? closeIcon : openIcon}
        </button>
  
        <nav className="sidebar-links">
          <ul>
            <li>
              <a href="#">Forums</a>
            </li>
            <li>
              <a href="#">Account</a>
            </li>
            <li>
              <a href="#">Q-Learning Settings</a>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}> {logoutIcon} Logout</button> 
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
  
}

export default Sidebar;
