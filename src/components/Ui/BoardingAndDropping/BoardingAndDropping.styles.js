import styled from "styled-components";
import NavItem from "../../../bootstrap/NavItem";
import Ul from "../../../bootstrap/Ul";
import { Color } from "../../../color/index.js";

export const Point = styled.div`
  padding: 0px;
  border-bottom: 1px solid #d1d1d1;
  padding-bottom: 20px;
`;
export const CommonHeader = styled.h4`
  font-size: 16px;
  text-transform: uppercase;
  color: #172839;
  font-weight: 500;
`;
export const BoardingAndDroppingPointUl = styled(Ul)`
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
`;
export const CommonNavItem = styled(NavItem)`
  padding: 10px 0px;
  display: flex;
  align-items: flex-start;
`;
export const PointLabel = styled.label`
  display: flex;
  cursor: pointer;
`;
export const Time = styled.div`
  padding: 0px 20px 0px 10px;
  font-weight: 500;
`;
export const LocationName = styled.div`
  font-size: 14px;
`;
export const LocationRoadName = styled.div`
  font-size: 12px;
`;

//mobile view //

export const Select = styled.select`
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid #eee;
  width: 100%;
  margin-bottom: 20px;
  outline-color: ${Color};
  option &:hover {
    background: red;
  }
`;

export const Input = styled.input`
  cursor: pointer;
`;
