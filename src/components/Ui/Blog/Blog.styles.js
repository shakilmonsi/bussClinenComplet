import Slider from "react-slick";
import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 40px;
`;
export const InnerBlogCard = styled.div`
  margin: 10px;
`;
export const StyledSlider = styled(Slider)`
  margin: -10px;

  .slick-track {
    display: flex;
  }
  .slick-slide {
    height: inherit;
  }
  .slick-slide > div {
    height: 100%;
  }

  .slick-prev {
    width: 25px;
    height: 25px;
    padding: 3px;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 25%;
    background: white;
    z-index: 1;
    left: 16px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    img {
      width: 8px;
      transform: rotate(180deg);
      display: block;
    }
  }
  .slick-next {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    padding: 3px;
    cursor: pointer;
    position: absolute;
    top: 25%;
    background: white;
    z-index: 1;
    right: 15px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    img {
      width: 8px;
      display: block;
    }
  }
`;
