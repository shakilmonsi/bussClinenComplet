import React from "react";
import BoardingAndDropping from "../BoardingAndDropping/";
import SelectedBoardingAndDropping from "../SelectedBoardingAndDropping/";
import { Container } from "./BoardingAndDroppingPoint.styles.js";

const BoardingAndDroppingPoint = () => {
  return (
    <Container>
      <BoardingAndDropping />
      <SelectedBoardingAndDropping />
    </Container>
  );
};

export default BoardingAndDroppingPoint;
