import styled from "styled-components";
import Button from "../../../../bootstrap/Button";
import Col from "../../../../bootstrap/Col";
import NavItem from "../../../../bootstrap/NavItem";
import Row from "../../../../bootstrap/Row";
import Ul from "../../../../bootstrap/Ul";

export const CardWrapper = styled.div`
  margin-bottom: 20px;
`;
export const SingleCard = styled.div`
  border: 0.5px solid #989898;
  padding: 28px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;
export const InnerRow = styled(Row)`
  display: grid;
  grid-template-columns: 70% 20%;
  grid-gap: 10%;
  align-items: center;
`;
export const InnerHeader = styled(Ul)`
  display: grid;
  grid-template-columns: 10% 10% 10% 10% 10% 10% 10%;
  gap: 5%;
  list-style: none;
  flex-direction: row;
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
`;
export const SingleList = styled(NavItem)`
  font-size: 20px;
  font-weight: 600;
  &:nth-child(7) {
    padding: 0;
  }
  h5 {
    padding: 0;
    margin: 0;
  }
  span {
    font-size: 12px;
  }
`;
export const InnerRowLeft = styled(Col)`
  padding-right: 40px;
`;
export const InnerRowright = styled(Col)`
  margin-left: auto;
`;
export const BusDetailsLinkWrapper = styled(Ul)`
  display: grid;
  grid-template-columns: 22% 23% 30% 25%;
  align-items: flex-start;
  list-style: none;
  margin: 0;
  padding: 0;
`;
export const BusDetailsLink = styled(NavItem)`
  text-transform: capitalize;
  font-size: 16px;
  position: relative;
  transition: 0.3s;
  cursor: pointer;
  border-right: 1px solid #707070;
  text-align: center;
  &:nth-child(1) {
    text-align: left;
  }
  &:nth-child(4) {
    border-right: none;
  }

  ${(props) => ` 
  color: ${props.btncolor};
  &&:hover {
    color: ${props.btnhvcolor}
  }
`}
`;
export const BookingBtn = styled(Button)`
  text-transform: capitalize;
  ${(props) => ` 
  color: ${props.btntextcolor};
  padding: 11px 34px;
  border: none;
  background: ${props.btnbgcolor};
  transition: 0.4s;
  &&:hover {
    background: ${props.btnbghvcolor};
  }
`}
`;
