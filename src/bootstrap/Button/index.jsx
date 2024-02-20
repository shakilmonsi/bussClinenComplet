import React from "react";
import "./Button.styles.css";

export const Button = ({ type, bg, className, spacing, children, ...rest }) => {
  const btnType = type ? type : "submit";
  const btnClass = className ? `btn btn-${className}` : "";

  return (
    <>
      <button type={btnType} className={btnClass} {...rest}>
        {children}
      </button>
    </>
  );
};
export default Button;
