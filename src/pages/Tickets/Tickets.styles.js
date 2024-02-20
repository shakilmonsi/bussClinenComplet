import { Accordion } from "react-accessible-accordion";
import styled from "styled-components";
import backgroundImg from "../../assets/images/bus.jpg";

export const Accordions = styled(Accordion)`
  border: none;
  .accordion__panel {
    padding: 0;
  }
  .accordion__button {
    background: white;
    border-radius: 3px;
    padding: 0px;
  }

  .accordion__button:before {
    display: none;
  }
  .accordion__item {
    border-top: none;
  }
`;

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`;
export const BackgroundImg = styled.div`
  background: url(${backgroundImg});
  box-shadow: 10px 10px 5px 200px rgb(0 0 0 / 50%) inset;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 300px;
  width: 100%;
  object-fit: cover;
  @media (max-width: 992px) {
    background: white;
    box-shadow: none;
  }
`;

export const PageBody = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 50px;
  @media (max-width: 992px) {
    grid-template-columns: 100%;
  }
`;

export const TicketList = styled.div``;
export const SingleTicket = styled.div``;

export const PaginationWrapper = styled.div`
  margin-bottom: 20px;
  .paginationBttn {
    list-style: none;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    padding-top: 20px;
  }
  .active a {
    background: ${(props) => props?.btnAndBorderColor};
    transition: 0.4s;
    color: white;
  }

  .paginationBttn a {
    padding: 3px 10px;
    border: 1px solid ${(props) => props?.btnAndBorderColor};
    margin-right: 10px;
    border-radius: 5px;
    transition: 0.4s;
    cursor: pointer;
    @media (max-width: 576px) {
      padding: 1px 7px;
      margin-right: 5px;
    }
  }
`;

export const SpinnerWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 360px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
