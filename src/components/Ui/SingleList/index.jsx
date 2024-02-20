import React from "react";
import { List, ListLink } from "./Single.styles.js";

const SingleList = ({ text, hoverbg, ...styles }) => {
  return (
    <List hoverbg={hoverbg} {...styles}>
      <ListLink to="/">{text}</ListLink>
    </List>
  );
};

export default SingleList;
