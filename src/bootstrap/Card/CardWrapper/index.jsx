import React from "react";
import "./card.styles.css";

const Card = ({ className, children, ...rest }) => {
  return (
    <div className={`card ${className ? className : ""}`} {...rest}>
      {children}
    </div>
  );
};

export default Card;
