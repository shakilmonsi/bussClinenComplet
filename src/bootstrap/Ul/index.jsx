import React from "react";
import "./Ul.styles.css";

function Ul({ children, ...styles }) {
  return (
    <ul className="navbar-nav ms-auto " {...styles}>
      {children}
    </ul>
  );
}

export default Ul;
