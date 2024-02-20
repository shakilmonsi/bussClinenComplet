import React from "react";
import ScrollToTop from "react-scroll-up";
import { Text } from "./BottomToTop.styles";

const BottomToTop = () => {
  return (
    <div>
      <ScrollToTop showUnder={160} duration={5}>
        <Text>UP</Text>
      </ScrollToTop>
    </div>
  );
};

export default BottomToTop;
