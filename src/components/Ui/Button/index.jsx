import React from "react";
import { SingleButton } from "./Button.styles.js";

const Button = ({ text, ...styles }) => {
  return (
    <>
      <SingleButton {...styles}>{text}</SingleButton>
    </>
  );
};

export default Button;
