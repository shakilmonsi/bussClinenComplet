import styled from "styled-components";
import Col from "../../bootstrap/Col";
import { Color } from "../../color/index";

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 3;
`;
export const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const CheckoutBody = styled.div`
  padding: 50px 0px;
  z-index: 2;
  @media (max-width: 768px) {
    padding: 50px 0px;
  }
`;
export const LeftSide = styled(Col)`
  @media (max-width: 768px) {
    padding-bottom: 20px;
  }
`;
export const RightSide = styled(Col)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const LeftSideWrapper = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 20px;
  @media (max-width: 922px) {
    margin-bottom: 20px;
  }
`;

export const LeftSideHeader = styled.div`
  text-transform: capitalize;
  display: flex;
  padding: 20px 0px 30px 0px;
  font-size: 16px;
  img {
    background: ${Color};
    width: 15px;
    height: 15px;
    padding: 3px;
    border-radius: 5px;
    margin-right: 10px;
  }
`;
