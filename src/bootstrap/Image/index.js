import React from "react";
import { SingleImage } from "./Image.styles.js";

const Image = ({ img, alt }) => {
  return (
    <>
      <SingleImage src={img} alt={alt} />
    </>
  );
};

export default Image;
