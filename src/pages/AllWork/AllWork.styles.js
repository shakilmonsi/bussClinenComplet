import styled from "styled-components";
import Card from "../../components/Ui/Card";

export const Container = styled.div``;
export const BodyWrapper = styled.div`
  padding-bottom: 50px;
`;
export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
`;
export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 32% 32% 32%;
  column-gap: 2%;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 48% 48%;
    grid-gap: 2%;
  }
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 48% 48%;
    grid-gap: 2%;
  }
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 100%;
  }
`;

export const SingleCard = styled(Card)`
  border-radius: 10px 10px 0px 0px;
`;
export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 360px);
  width: 100%;
`;
