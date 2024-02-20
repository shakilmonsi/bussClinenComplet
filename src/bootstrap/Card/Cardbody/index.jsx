import React from "react";
import "./cardbody.styles.css";

const Cardbody = ({ className, children, ...rest }) => {
  return (
    <div className={`card-body ${className ? className : ""}`} {...rest}>
      {children}
    </div>
  );
};

export default Cardbody;
