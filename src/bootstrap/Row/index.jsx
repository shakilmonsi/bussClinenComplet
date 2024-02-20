import React from "react";
import "./Row.styles.css";

const Row = ({ children, className, ...rest }) => {
  return (
    <div className={`row ${className ? className : ""}`} {...rest}>
      {children}
    </div>
  );
};

export default Row;
