import React from "react";
import "./Col.styles.css";

const Col = (props) => {
  const {
    children,
    sm = "",
    md = "",
    lg = "",
    xl = "",
    xxl = "",
    className = "",
    ...rest
  } = props;

  const classes = xxl
    ? `col-xxl-${xxl}`
    : xl
    ? `col-xl-${xl}`
    : lg
    ? `col-lg-${lg}`
    : md
    ? `col-md-${md}`
    : sm
    ? `col-sm-${sm}`
    : "";

  return (
    <div className={`${classes} ${className ? className : ""}`} {...rest}>
      {children}
    </div>
  );
};

export default Col;
