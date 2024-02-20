import React from "react";
import "./NavItem.styles.css";

function NavItem({ children, ...rest }) {
  return <li {...rest}>{children}</li>;
}

export default NavItem;
