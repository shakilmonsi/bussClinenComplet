import React from "react";
import Grid from "./Grid";
import "./loader.styles.css";
import Roller from "./Roller";
import Spin from "./Spin";
import SpinGrow from "./SpinGrow";
// import Roller from "./Roller";

const Loader = ({
  className,
  type,
  color,
  border,
  position,
  role,
  ...rest
}) => {
  const spinStyles =
    color === "primary"
      ? "primary"
      : color === "secondary"
      ? "secondary"
      : color === "success"
      ? "success"
      : color === "danger"
      ? "danger"
      : color === "warning"
      ? "warning"
      : color === "info"
      ? "info"
      : color === "light"
      ? "light"
      : color === "dark"
      ? "dark"
      : color === "black"
      ? "black"
      : color === "white"
      ? "white"
      : "primary";

  const borderSize =
    border === "sm"
      ? "border-sm"
      : border === "md"
      ? "border-md"
      : border === "lg"
      ? "border-lg"
      : "";

  const spnningRole = role ? role : "status";
  const extraClassNames = className ? className : "";

  const loaderPosition =
    position === "left"
      ? "text-start"
      : position === "center"
      ? "text-center"
      : position === "right"
      ? "text-end"
      : "";

  const displaySpinner = () => {
    if (type === "grow") {
      return (
        <SpinGrow
          spinStyles={spinStyles}
          borderSize={borderSize}
          spnningRole={spnningRole}
          className={extraClassNames}
          position={loaderPosition}
          {...rest}
        />
      );
    } else if (type === "roller") {
      return (
        <Roller
          spinStyles={spinStyles}
          borderSize={borderSize}
          spnningRole={spnningRole}
          className={extraClassNames}
          position={loaderPosition}
          {...rest}
        />
      );
    } else if (type === "grid") {
      return (
        <Grid
          spinStyles={spinStyles}
          spnningRole={spnningRole}
          className={extraClassNames}
          position={loaderPosition}
          {...rest}
        />
      );
    } else if (type === "ripple") {
      return (
        <Grid
          spinStyles={spinStyles}
          spnningRole={spnningRole}
          className={extraClassNames}
          position={loaderPosition}
          {...rest}
        />
      );
    } else {
      return (
        <Spin
          spinStyles={spinStyles}
          borderSize={borderSize}
          spnningRole={spnningRole}
          className={extraClassNames}
          position={loaderPosition}
          {...rest}
        />
      );
    }
  };

  return displaySpinner();
};

export default Loader;
