import styled from "styled-components";
import Button from "../../../bootstrap/Button";
import TextField from "../../../bootstrap/TextField";
import { Color } from "../../../color/index.js";

export const Wrapper = styled.div`
  text-align: center;
  padding: 0px;
  margin-bottom: 40px;
`;
export const SubscribeWrapper = styled.div`
  position: relative;
  background: url(${(props) => props.img});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;
  box-shadow: 10px 10px 5px 200px rgba(0, 0, 0, 0.55) inset;
  -webkit-box-shadow: 10px 10px 5px 200px rgba(0, 0, 0, 0.55) inset;
  -moz-box-shadow: 10px 10px 5px 200px rgba(0, 0, 0, 0.55) inset;
`;
export const Header = styled.h3`
  margin: 0;
  font-size: 36px;
  color: white;
  font-weight: 400;
  text-transform: capitalize;
  @media (max-width: 922px) {
    font-size: 26px;
  }
  @media (max-width: 576px) {
    font-size: 20px;
  }
`;
export const SubHeader = styled.p`
  margin: 0;
  font-size: 16px;
  color: white;
  @media (max-width: 922px) {
    font-size: 14px;
  }
  @media (max-width: 576px) {
    font-size: 12px;
  }
`;
export const Form = styled.form`
  .input-group {
    border: none;
    background: white;
  }
  display: grid;
  width: 60%;
  grid-template-columns: 80% 20%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 576px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 15px;
    margin: 0 auto;
  }
`;
export const FormArea = styled.div`
  margin-top: 20px;
`;
export const Input = styled(TextField)`
  width: 90%;
  border: none;
  padding: 0px 0px 0px 10%;
  @media (max-width: 500px) {
    width: 98%;
    padding: 12px 0px 12px 2%;
  }
`;
export const SubmitButton = styled(Button)`
  text-transform: capitalize;
  ${(props) => ` 
background: ${props.btnbgcolor};
  color: ${props.btntextcolor};
  border: none;
  padding: 15px 0px;
  width: 100%;
  border-radius: 0px;
  transition: 0.4s;
  &&:hover {
    background: ${props.btnbghvcolor};
  }
`}
  @media (max-width: 500px) {
    background: ${Color};
    border: none;
    color: white;
    padding: 12px 0px;
    width: 50%;
    margin: 0 auto;
  }
`;
