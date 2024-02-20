import styled from "styled-components";

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`;
export const HeroArea = styled.div`
  position: relative;
`;
export const SearchFromArea = styled.div`
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 5px 8px 0px;
  background: white;
  max-width: 900px;
  width: 100%;
  left: 50%;
  position: absolute;
  bottom: -37%;
  transform: translate(-50%, -50%);
  @media (max-width: 1024px) {
    width: 90%;
    bottom: -2%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media (max-width: 425px) {
    bottom: -32%;
  }
`;
