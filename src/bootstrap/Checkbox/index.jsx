import React from "react";
import { FormCheck, Label } from "./Checkbox.style.js";

const Checkbox = () => {
  return (
    <FormCheck>
      <input type="checkbox" value="" id="flexCheckChecked" />
      <Label for="flexCheckChecked">Checked checkbox</Label>
    </FormCheck>
  );
};

export default Checkbox;
