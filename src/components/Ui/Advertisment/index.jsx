import React from "react";
import { AdvertisementWrapper } from "./Advertisment.styles";

const Advertisment = ({ advertisement }) => {
  return (
    <AdvertisementWrapper>
      <a href={advertisement?.link}>
        <img src={advertisement?.image_path} alt="add" />
      </a>
    </AdvertisementWrapper>
  );
};

export default Advertisment;
