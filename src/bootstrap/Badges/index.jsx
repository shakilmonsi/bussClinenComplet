import React from "react";
import "./Badges.styles.css";

const Badges = ({ text, img, upperText }) => {
  return (
    <button type="button" className="Butuon">
      {img ? (
        <>
          <img src="" alt="" />
        </>
      ) : (
        <>inbox {text}</>
      )}
      <span className="upperText">99+{upperText}</span>
    </button>
  );
};

export default Badges;
