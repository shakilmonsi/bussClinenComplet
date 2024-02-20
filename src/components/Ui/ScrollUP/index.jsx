import React from "react";
// import arrowIcon from "../../../../assets/images/arrowIcon.png";
import arrowIcon from "../../../assets/images/arrowIcon.png";
import { ArrowIcon } from "./ScrollUP.syles.js";

const ScrollUp = () => {
  const handleScrollUp = (e) => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <ArrowIcon src={arrowIcon} alt="arrowIcon" onClick={handleScrollUp} />
    </>
  );
};

export default ScrollUp;
