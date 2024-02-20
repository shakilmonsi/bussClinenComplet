import styled from "styled-components";
import Button from "../../../../bootstrap/Button";
import NavItem from "../../../../bootstrap/NavItem";
import Ul from "../../../../bootstrap/Ul";

export const MobileView = styled.div`
  margin-bottom: 20px;
`;
export const MobileCard = styled.div`
  border: 1px solid #eee;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
`;
export const MobileCardFirstRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  h4 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
  p {
    margin: 0;
    font-size: 12px;
  }
  @media (max-width: 420px) {
    h4 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
    }
    p {
      margin: 0;
      font-size: 10px;
    }
  }
`;
export const MobileViewTicketPrice = styled.div`
  ${(props) => ` 
  color: ${props.color};
  `}
  font-size: 20px;
  font-weight: 600;
  @media (max-width: 420px) {
    font-size: 14px;
  }
`;
export const MobileCardSecondRow = styled(Ul)`
  margin: 0;
  padding: 0px 20px 20px 20px;
  list-style: none;
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  align-items: flex-start;
  h4 {
    margin: 0;
    font-size: 14px;
  }
  p {
    margin: 0;
    font-size: 14px;
  }
  @media (max-width: 420px) {
    h4 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
    }
    p {
      margin: 0;
      font-size: 10px;
    }
  }
`;
export const JourneyTimeList = styled(NavItem)`
  position: relative;
  text-align: center;
  &:nth-child(1) {
    text-align: left;
  }
  &:nth-child(3) {
    text-align: right;
  }
  &:after {
    position: absolute;
    content: "";
    background-color: #eee;
    width: 2px;
    height: 30px;
    top: 0%;
    right: 0%;
  }
  &:nth-child(3):after {
    display: none;
  }
`;
export const MobileCardThirdRow = styled(Ul)`
  font-size: 14px;
  margin: 0;
  padding: 0px 0px 0px 20px;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #eee;
  @media (max-width: 420px) {
    font-size: 12px;
  }
  @media (max-width: 320px) {
    font-size: 10px;
  }
`;
export const MobileCardThirdRowListItem = styled(NavItem)`
  ${(props) => ` 
  color: ${props.btncolor};
  `}
  position: relative;
  cursor: pointer;
  &:after {
    position: absolute;
    content: "";
    width: 2px;
    height: 30px;
    background: #eee;
    top: 0%;
    right: -72%;
  }
  @media (max-width: 425px) {
    &:after {
      position: absolute;
      content: "";
      width: 2px;
      height: 20px;
      background: #eee;
      top: 0%;
      right: -25%;
    }
  }
  @media (max-width: 375px) {
    &:after {
      position: absolute;
      content: "";
      width: 2px;
      height: 20px;
      background: #eee;
      top: 0%;
      right: -13%;
    }
  }
  @media (max-width: 320px) {
    &:after {
      position: absolute;
      content: "";
      width: 2px;
      height: 20px;
      background: #eee;
      top: 0%;
      right: -22%;
    }
  }
  &:nth-child(1):after {
    display: none;
  }
  &:nth-child(3):after {
    display: none;
  }
  &:nth-child(4):after {
    display: none;
  }
`;
export const BookNowBtn = styled(Button)`
  ${(props) => ` 
  background: ${props.btnbgcolor};
  `}
  font-size: 14px;
  text-transform: capitalize;
  border-radius: 0px 0px 10px 0px;
  padding: 20px 40px;
  cursor: pointer;
  @media (max-width: 576px) {
    padding: 10px 20px;
  }
  @media (max-width: 420px) {
    font-size: 12px;
  }
`;
