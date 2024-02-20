import React from "react";
import "./spin.styles.css";

const Spin = ({
  borderSize,
  spinStyles,
  spnningRole,
  className,
  position,
  ...rest
}) => {
  const classes = [`spinner-border ${spinStyles} ${borderSize} ${className}`];

  return (
    <>
      {position ? (
        <div className={position}>
          <div className={classes} role={spnningRole} {...rest}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className={classes} role={spnningRole} {...rest}>
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
};

export default Spin;
