import React from "react";

export const NextArrow = (props) => {
  const { className, onClick, img, alt } = props;

  return (
    <div className={className} onClick={onClick}>
      <img src={img} alt={alt} />
    </div>
  );
};

export const PrevArrow = (props) => {
  const { className, onClick, img, alt } = props;

  return (
    <div className={className} onClick={onClick}>
      <img src={img} alt={alt} />
    </div>
  );
};
