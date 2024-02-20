import React from "react";

const Input = ({ placeholder, type, value, ...styles }) => {
  return (
    <div>
      <input type={type} placeholder={placeholder} value={value} {...styles} />
    </div>
  );
};

export default Input;
