import React, { useLayoutEffect, useRef, useState } from "react";
import { CheckMark, Close } from "./Icons";
import { CircleProgress, ProgressBtn } from "./ProgressBar.styles";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const articleRef = useRef();

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (!articleRef.current) return;

      const { height } = articleRef.current.getBoundingClientRect();

      setProgress(window.scrollY / (height - window.innerHeight));
    };

    updateHeight();

    window.addEventListener("scroll", updateHeight);
    return () => {
      window.removeEventListener("scroll", updateHeight);
    };
  }, []);

  const position = Math.max(1 - progress, 0);
  const complete = position === 0;
  const notMoved = position === 1;

  // Radius is derived from our desired strokeWidth
  // If radius is exactly half diameter then the stroke will sit right on the edge and expand in both directions
  // We want it to sit on the inside so we need to do some offset. So half the stroke width we need to subtract from the radius
  // If we wanted it on the outside we could add the stroke width but then you'll need to adjust your circle size to be that much larger
  const DIAMETER = 50;
  const STROKE_WIDTH = 6;
  const RADIUS = DIAMETER / 2 - STROKE_WIDTH / 2;
  const CIRCUMFERENCE = Math.PI * RADIUS * 2;

  return (
    <div ref={articleRef}>
      <ProgressBtn
        style={{
          backgroundColor: complete ? "tomato" : "#FFF",
        }}
      >
        {complete ? <CheckMark /> : <Close />}
        {!notMoved && (
          <CircleProgress viewBox="0 0 50 50" width="50px" height="50px">
            <circle
              cx={DIAMETER / 2}
              cy={DIAMETER / 2}
              r={RADIUS}
              stroke="tomato"
              fill="transparent"
              strokeWidth={STROKE_WIDTH}
              style={{
                strokeDasharray: CIRCUMFERENCE,
                strokeDashoffset: CIRCUMFERENCE * position,
              }}
            />
          </CircleProgress>
        )}
      </ProgressBtn>
    </div>
  );
};

export default ProgressBar;
