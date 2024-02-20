import styled from "styled-components";
import NavItem from "../../../bootstrap/NavItem";
import Ul from "../../../bootstrap/Ul";

export const Facilities = styled.div`
  padding-bottom: 30px;
  font-size: 14px;
  @media (max-width: 768px) {
    padding: 0;
  }
`;
export const FacilitiesHeader = styled.div`
  font-size: 16px;
  margin: 0px;
  padding: 20px 0px 10px;
  font-weight: 500;
  color: #172839;
`;

export const FacilitiesUl = styled(Ul)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;
export const SingleFacilities = styled(NavItem)`
  margin-right: auto;
  display: flex;
  align-items: center;
`;
export const FacilitiesText = styled.p`
  font-size: 14px;
`;
export const CheckboxIcon = styled.img`
  width: 20px;
  height: 20px;
  display: block;
  margin-right: 10px;
`;
