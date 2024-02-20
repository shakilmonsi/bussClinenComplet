import styled from "styled-components";
import Button from "../../../bootstrap/Button";
import NavItem from "../../../bootstrap/NavItem";
import Ul from "../../../bootstrap/Ul";

export const PaymentAndButton = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  align-items: center;
  margin-top: 20px;
  justify-content: flex-end;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;
export const PaymentUl = styled(Ul)`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  list-style: none;
  font-size: 16px;
`;
export const SinglePayment = styled(NavItem)`
  margin-right: 20px;
  display: flex;
  align-items: center;
`;
export const PaymentInput = styled.input`
  background: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  text-align: right;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 576px) {
    margin-top: 20px;
    justify-content: flex-start;
  }
`;
export const CancelButton = styled(Button)`
  margin-right: 10px;
  text-transform: capitalize;
`;
export const PaymentButton = styled(Button)`
  text-transform: capitalize;
  ${(props) => ` 
background: ${props.btnbgcolor};
transition: 0.4s;
color: ${props.btntextcolor};
&&:hover {
  background: ${props.btnbghvcolor};
}
`}
`;
export const Label = styled.label`
  cursor: pointer;
`;
export const PaymentMethod = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: left;
  margin-top: 30px;
`;
