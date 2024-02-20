import styled from "styled-components";
import NavItem from "../../../bootstrap/NavItem";
import Ul from "../../../bootstrap/Ul";

export const CheckBoxUl = styled(Ul)`
  flex-direction: column;
  text-align: left;
  margin: 0;
  padding: 0;
`;

export const Card = styled.div`
  font-size: 12px;
  @media (max-width: 922px) {
    padding-right: 0px;
  }
`;
export const InnerCard = styled.div`
  border-bottom: 1px solid #c9c9c9;
  padding-bottom: 20px;
`;
export const CommonNavItem = styled(NavItem)`
  display: flex;
  align-items: center;
  padding: 5px 0px;
`;
export const CommonLabel = styled.label`
  margin-left: 10px;
  cursor: pointer;
`;
export const Header = styled.h5`
  text-align: left;
  text-transform: uppercase;
  font-size: 14px;
`;

export const Input = styled.input`
  cursor: pointer;
`;
