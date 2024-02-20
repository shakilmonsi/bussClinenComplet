import React from "react";
import "./Ratio.styles.css";

const Ratio = ({ video }) => {
  return (
    <div className="ratio ratio-16x9">
      <iframe
        src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
        title="YouTube video"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Ratio;
