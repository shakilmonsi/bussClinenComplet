import React from "react";
import "./grid.styles.css";

const Grid = ({ spinStyles, spnningRole, className, position, ...rest }) => {
  const classes = [`ra-grid ${spinStyles} ${className}`];

  return (
    <>
      {position ? (
        <div className={position}>
          <div className={classes} {...rest} role={spnningRole}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className={classes} {...rest} role={spnningRole}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default Grid;
