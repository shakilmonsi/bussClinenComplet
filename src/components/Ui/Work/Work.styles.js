import styled from "styled-components";
import Card from "../Card";

export const InnerWrapper = styled.div`
  padding: 0px 0px 40px;
`;
export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 32% 32% 32%;
  grid-gap: 2%;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 48% 48%;
    grid-gap: 4%;
  }

  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 100%;
  }
`;
export const SingleCard = styled(Card)`
  border-radius: 10px 10px 0px 0px;
`;
