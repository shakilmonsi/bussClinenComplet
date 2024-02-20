import styled from "styled-components";

export const ArrowIcon = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: absolute;
  content: "";
  bottom: 10px;
  right: 0%;
  @media (max-width: 992px) {
    display: none;
  }
`;
