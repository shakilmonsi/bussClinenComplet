import styled from "styled-components";
import NavItem from "../../../bootstrap/NavItem";

export const CheckListWrapper = styled.div`
  padding: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-top: 20px;
  ${(items) =>
    items.shadow &&
    `
   box-shadow:none;
   padding:0px
   `};
`;
export const CheckListHeader = styled.div`
  font-size: 20px;
  text-align: left;
  padding: 30px 0px;
`;

export const SingleNavItem = styled(NavItem)`
  padding-bottom: 10px;
  font-size: 14px;

  &:before {
    content: "- ";
  }
`;
