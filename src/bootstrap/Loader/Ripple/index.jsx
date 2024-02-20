import React from "react";
import "./ripple.styles.css";

const Ripple = ({ spinStyles, spnningRole, className, position, ...rest }) => {
  const classes = [`ra-ripple ${spinStyles} ${className}`];

  return (
    <>
      {position ? (
        <div className={position}>
          <div className={classes} {...rest} role={spnningRole}>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className={classes} {...rest} role={spnningRole}>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default Ripple;
