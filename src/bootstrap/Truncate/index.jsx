import React from "react";
import { Descriptation, Header } from "./Truncate.styles.js";

const Truncate = ({ header, headerLength, str, number, ...rest }) => {
  return (
    <>
      {header && <Header {...rest}>{header.length > 10 ? header.substring(0, headerLength) + "..." : header}</Header>}

      {str && <Descriptation {...rest} dangerouslySetInnerHTML={{ __html: str.length > 10 ? str.substring(0, number) + "..." : str }} />}
    </>
  );
};

export default Truncate;
