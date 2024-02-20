import Slider from "react-slick";
import styled from "styled-components";
import Truncate from "../../../bootstrap/Truncate";
import { Link } from "react-router-dom";

export const Descreption = styled(Truncate)`
  color: rgb(113, 108, 128);
`;
export const Card = styled.div`
  display: flex !important;
  height: 100%;
`;
export const TestimonialCard = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 30px;
  margin: 10px;
`;
export const CardIcon = styled.svg`
  width: 50px;
  transform: rotate(180deg);
  margin-bottom: 10px;
`;

export const Person = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
`;

export const Name = styled.h5`
  margin: 0;
  font-size: 16px;
`;
export const CompanyStatus = styled.p`
  font-size: 14px;
  margin: 0;
  color: rgb(113, 108, 128);
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

  .slick-dots {
    margin: 20px 0px 0px 0px;
    padding: 0;
    display: flex !important;
    list-style: none;
    justify-content: center;
    align-items: center;
    button {
      ${(props) => `
        border: 1px solid ${props.bodercolor};
      margin-right: 5px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      text-indent: -9999px;
      background: transparent;
      cursor: pointer;
      `}
    }
    .slick-active button {
      ${(props) => ` 
       border: 1px solid ${props.bodercolor};
      margin-right: 5px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      text-indent: -9999px;
      background: ${props.bodercolor};
      `}
    }
  }
`;
export const ImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  margin-right: 20px;
`;
export const PersonImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
  object-fit: cover;
`;

export const ReadMoreBtn = styled(Link)`
  ${(props) => ` 
cursor: pointer;
border: none;
padding: 8px 20px;
background: ${props.btnbgcolor};
color: ${props.btntextcolor};
transition: 0.4s;
border-radius: 3px;
font-size: 14px;
margin-left:auto;
&&:hover {
  background: ${props.btnbghvcolor};
}
`}
`;
