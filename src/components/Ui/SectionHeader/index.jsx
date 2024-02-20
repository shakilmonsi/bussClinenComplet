import React from "react";
import { Container, Header, SubHeader } from "./SectionHeader.styles.js";

const SectionHeader = ({ header, subHeader }) => {
  return (
    <Container>
      <Header>{header}</Header>
      <SubHeader>{subHeader}</SubHeader>
    </Container>
  );
};

export default SectionHeader;
