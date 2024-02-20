import { Link } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import { CustomBtn } from "../../../createGlobalStyle";
import SinglePhoto from "../SinglePhoto";

export const StyledSlider = styled(Slider)`
  position: relative;
  margin: -10px;
  .slick-active {
    &:first-child {
      margin-left: 0px;
    }
  }
  .slick-prev {
    width: 25px;
    height: 25px;
    padding: 3px;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 34%;
    background: white;
    z-index: 1;
    left: 16px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    img {
      width: 8px;
      transform: rotate(180deg);
    }
  }
  .slick-next {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    padding: 3px;
    cursor: pointer;
    position: absolute;
    top: 34%;
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

export const SliderWrapper = styled.div`
  background: #f8f8f8;
  padding-bottom: 30px;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;
export const InnerJournyCard = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin: 10px;
`;
export const PhotoAndLocation = styled.div`
  position: relative;
  height: 180px;
  width: 100%;
`;
export const Location = styled.p`
  text-transform: uppercase;
  background: #0000006b;
  padding: 7px 0px;
  color: white;
  position: absolute;
  content: "";
  bottom: -16px;
  width: 100%;
  text-align: center;
`;
export const Text = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;
export const Trip = styled.p`
  margin: 0;
  font-size: 12px;
`;
export const Price = styled.h4`
  text-transform: capitalize;
  ${(props) => ` 
 color: ${props.textcolor};
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`}
`;
export const Image = styled(SinglePhoto)`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;
export const BookingBtn = styled(Link)`
  text-transform: capitalize;
  ${(props) => ` 
 background: ${props.btnbgcolor};
  color: ${props.btntextcolor};
  padding: 8px 20px;
  border-radius: 3px;
  font-size: 14px;
  transition: 0.4s;
  &&:hover {
    background: ${props.btnbghvcolor};
  }
`}
`;

export const TestBtn = styled(CustomBtn)`
  background: red;
`;
