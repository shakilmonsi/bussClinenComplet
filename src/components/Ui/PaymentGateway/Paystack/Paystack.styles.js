import { PaystackButton } from "react-paystack";
import styled from "styled-components";

export const PayStackWrapper = styled.div``;
export const InputWrapper = styled.div`
  text-align: left;
  display: grid;
  grid-template-columns: 18% 79%;
  grid-gap: 3%;
  margin-top: 20px;
  @media (max-width: 576px) {
    text-align: left;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 10px;
    margin-bottom: 20px;
  }
`;

export const PaymentButton = styled(PaystackButton)`
  padding: 10px 20px;
  cursor: pointer;
  display: block;
  border: none;
  border-radius: 3px;

  background: ${(props) => props.btnBgColor};
  transition: 0.4s;
  color: ${(props) => props.btnTextColor};
  &&:hover {
    background: ${(props) => props.btnBgHvColor};
  }
`;
