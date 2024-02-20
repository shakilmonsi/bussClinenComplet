import React from "react";
import SinglePhoto from "../SinglePhoto/index.jsx";
import { BusPhotoWrapper } from "./BusPhoto.styles.js";

const BusPhoto = ({ singleBusPhoto }) => {
  return (
    <BusPhotoWrapper>
      {singleBusPhoto.map((item) => (
        <SinglePhoto img={item.img_path} key={item.id} />
      ))}
    </BusPhotoWrapper>
  );
};

export default BusPhoto;
