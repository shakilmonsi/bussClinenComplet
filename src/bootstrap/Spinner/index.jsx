import React from "react";
import { SpinnerWrapper, SingleSpinner } from "./Spinner.styles.js";

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <SingleSpinner role="status"></SingleSpinner>
    </SpinnerWrapper>
  );
};

export default Spinner;
