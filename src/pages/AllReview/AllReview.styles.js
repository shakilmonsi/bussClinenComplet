import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 50px 0px;
  min-height: calc(100vh - 460px);
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 20px;
  @media (max-width: 1024px) {
    grid-template-columns: auto auto;
    gap: 20px;
  }
  @media (max-width: 576px) {
    grid-template-columns: 100%;
    margin-bottom: 100px;
  }
`;
export const LinkWrapper = styled.div`
  min-height: calc(100vh - 410px);
  margin-top: 50px;
`;
export const GobackLink = styled(Link)`
  color: black;
  text-transform: capitalize;
`;
