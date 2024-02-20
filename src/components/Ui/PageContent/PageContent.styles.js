import styled from "styled-components";
import Hero from "../Hero";

export const ContentWrapper = styled.div`
  .accordion__heading {
    padding: 18px;
    background-color: #f4f4f4;
  }
  .accordion__button:before {
  }
  .accordion__button {
    border-radius: 3px;
    padding: 0;
  }
  .accordion__button:hover {
    background-color: #f4f4f4;
  }
  .accordion__item {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    &:first-child {
      border-top: none;
    }
  }
`;
export const HeroComponent = styled(Hero)`
  margin-bottom: 50px;
  height: 300px;
`;
export const Description = styled.p`
  margin-bottom: 30px;
  color: #716c80;
  text-align: left;
`;

export const Answer = styled.p`
  margin: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
export const FAQWrapper = styled.div`
  margin-bottom: 20px;
`;
export const InnerWrapper = styled.div`
  min-height: calc(100vh - 712px);
`;
