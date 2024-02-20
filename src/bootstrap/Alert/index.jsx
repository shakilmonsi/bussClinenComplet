import React from "react";
import "./Alert.styles.css";

const Alert = ({ className = "", children, message, type, role, ...rest }) => {
  const alertType =
    type === "primary"
      ? "alert-primary"
      : type === "secondary"
      ? "alert-secondary"
      : type === "info"
      ? "alert-info"
      : type === "warning"
      ? "alert-warning"
      : type === "danger"
      ? "alert-danger"
      : type === "light"
      ? "alert-light"
      : type === "dark"
      ? "alert-dark"
      : "alert-success";

  const alertRole = role ? role : "alert";

  const displayAlert = () => {
    if (children) {
      return (
        <div
          className={`alert ${alertType} ${className}`}
          role={alertRole}
          {...rest}
        >
          {children}
        </div>
      );
    } else {
      return (
        <div
          className={`alert ${alertType} ${className}`}
          role={alertRole}
          dangerouslySetInnerHTML={{ __html: message }}
          {...rest}
        />
      );
    }
  };

  return displayAlert();
};

export default Alert;
