import styled from "styled-components";
import NavItem from "../../../bootstrap/NavItem";
import Ul from "../../../bootstrap/Ul";

export const BusSeatMapWrapper = styled.div`
  display: grid;
  grid-template-columns: 38% 58%;
  grid-gap: 2%;
  align-items: flex-start;
  padding-bottom: 20px;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 20px;
    align-items: flex-start;
    padding: 0;
  }
`;
export const LeftSideWrapper = styled.div``;
export const LeftSide = styled.div`
  border-top: 8px solid #777777;
  border-left: 8px solid #eeeded;
  border-right: 8px solid #eeeded;
  border-bottom: 8px solid #eeeded;
  max-width: 220px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
export const Steering = styled.div`
  text-align: right;
  padding: 10px;
  border-bottom: 1px solid #eeeded;
  img {
    max-width: 24px;
    height: 24px;
    width: 100%;
  }
  @media (max-width: 375px) {
    max-width: 18px;
    height: 20px;
    width: 100%;
  }
`;
export const SeatWrapper = styled.div``;
export const SeatUl = styled(Ul)`
  display: grid;
  /* grid-template-columns: 20% 20% 20% 20% 20%; */
  ${(props) => ` 
  grid-template-columns: repeat(${props.nmb}, 1fr);
`}
  align-items: flex-start;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  padding-top: 5px;
  padding-bottom: 5px;
`;
export const SingleSeat = styled(NavItem)`
  cursor: pointer;
  margin: auto;
  position: relative;
  img {
    width: 35px;
    display: block;
    transition: 0.4s;
  }
  p {
    padding: 0;
    margin: 0;
    position: absolute;
    content: "";
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    transition: 0.4s;
    font-size: 10px;
    color: #444;
    font-weight: 600;
  }
`;

export const RightSide = styled.div``;

export const SeatType = styled(NavItem)`
  text-transform: capitalize;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 10px 0px;
  margin-right: 50px;
  img {
    padding-right: 10px;
    width: 20px;
    height: 20px;
  }
`;
export const SeatTypeHeader = styled.div`
  text-transform: uppercase;
  font-size: 16px;
  margin: 0 px;
  padding: 20px 0px 10px;
  font-weight: 500;
  color: #172839;
`;

export const SeatCoutWrapper = styled.div`
  margin: 20px 0px;
`;
export const BusFacilitiesWrapper = styled.div`
  margin: 20px 0px;
`;
export const SeatLegend = styled(Ul)`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;
