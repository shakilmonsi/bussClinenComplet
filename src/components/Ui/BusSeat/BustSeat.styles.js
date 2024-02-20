import styled from "styled-components";
import Button from "../../../bootstrap/Button";
import NavItem from "../../../bootstrap/NavItem";

export const BusSeatWrapper = styled.div`
  text-align: left;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 20px;
  @media (max-width: 320px) {
    padding: 10px;
  }
`;

export const SeatNo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 0px;
  border-bottom: 1px solid #d1d1d1;
  font-size: 14px;
  font-weight: 500;
`;
export const FareDetails = styled.div`
  font-size: 16px;
  padding: 20px 0px 0px 0px;
`;
export const FareHeader = styled.div`
  text-transform: capitalize;
  padding: 10px 0px;
  font-weight: 500;
`;
export const PriceItem = styled(NavItem)`
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px 0px;
`;
export const Amount = styled.div`
  font-weight: 500;
  padding-top: 10px;
  text-transform: capitalize;
`;
export const TaxText = styled.div`
  padding-bottom: 20px;
  font-size: 12px;
`;

export const BookingBtn = styled(Button)`
  text-transform: capitalize;
  ${(props) => ` 
background: ${props.btnbgcolor};
  color: ${props.btntextcolor};
  width: 100%;
  font-size: 14px;
  transition: 0.4s;
  &&:hover {
    background: ${props.btnbghvcolor};
  }

`}
`;
