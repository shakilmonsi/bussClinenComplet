import { Link } from "react-router-dom";
import styled from "styled-components";

export const List = styled.li`
  list-style: none;
  transition: 0.4s;
  &:hover {
    background: ${(props) => props.hoverbg};
  }
`;

export const ListLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: 200;
`;
