import React from "react";
import { Photo } from "./SinglePhoto.styles.js";

const SinglePhoto = ({ img, alt, ...styles }) => {
  return (
    <>
      <Photo src={img} alt={alt} {...styles} />
    </>
  );
};

export default SinglePhoto;
