import React from "react";
import { SelectWrapper } from "./Select.styles.js";

const Select = ({ option, selectedOption }) => {
  return (
    <SelectWrapper aria-label="Default select example">
      <option selected> {selectedOption}</option>
      {option?.map((item) => (
        <option key={item.id} value={item.first_name}>
          {item.first_name}
        </option>
      ))}
    </SelectWrapper>
  );
};

export default Select;
