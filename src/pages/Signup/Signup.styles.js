import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../bootstrap/Button";

export const Container = styled.div`
  font-size: 14px;
`;
export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`;
export const FormWrapper = styled.div`
  padding: 100px 50px;
  @media (max-width: 576px) {
    padding: 50px 0px;
  }
`;
export const FormLogo = styled.img`
  width: 145px;
  height: 66px;
  @media (max-width: 576px) {
    width: 110px;
    height: 50px;
  }
`;
export const InnerFormWrapper = styled.div`
  width: 400px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin: 0 auto;
  padding: 40px;
  @media (max-width: 576px) {
    padding: 20px;
    width: 300px;
  }
  @media (max-width: 420px) {
    padding: 20px;
    width: 250px;
  }
`;
export const LogoArea = styled.div`
  text-align: left;
`;
export const Form = styled.form``;
export const FormHeader = styled.h5`
  text-align: left;
  text-transform: capitalize;
  color: #363636;
  font-size: 18px;
  padding-top: 15px;
  margin: 0;
`;
export const SubHeader = styled.p`
  text-align: left;
  padding: 10px 0px;
  font-size: 14px;
`;
export const InputField = styled.div`
  width: 100%;
  margin-bottom: 15px;
  background: #f7fafc;
  position: relative;
  svg {
    width: 20px;
    position: absolute;
    top: 29%;
    right: 4%;
    cursor: pointer;
    z-index: 1;
  }
`;

export const SingupLink = styled(Link)`
  text-transform: capitalize;
  text-decoration: none;
  color: ${(props) => props.textcolor};
  margin-left: 5px;
`;
export const Extra = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
`;
export const CheckBox = styled.div`
  display: flex;
  align-items: flex-start;
  input {
    cursor: pointer;
  }
`;
export const Account = styled.label`
  font-size: 12px;
  margin-left: 5px;
  cursor: pointer;
`;
export const ConditionLink = styled(Link)`
  margin-left: 5px;
  text-transform: capitalize;
  text-decoration: none;
  font-size: 13px;
  color: ${(props) => props.textcolor};
`;
export const SignupButton = styled(Button)`
  text-transform: capitalize;
  ${(props) => ` 
 border: none;
  padding: 12px 0px;
  width: 100%;
  fontsize: 18px;
  background: ${props.btnbgcolor};
  color: ${props.btntextcolor};
  transition: 0.4s;

  &&:hover {
    background: ${props.btnbghvcolor};
  }
`}
`;
export const NameWrapper = styled.div`
  display: grid;
  grid-template-columns: 49% 49%;
  gap: 2%;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;
export const FirstNameAndNid = styled.div`
  display: flex;
  margin-bottom: 15px;
`;
export const Select = styled.select`
  padding: 0.575rem 0.75rem;
  border: none;
  border: 1px solid #eaeaea;
  border-right: 0px solid transparent;
  outline: none;
  &&:focus-visible {
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }
`;
export const PasswordWrapper = styled.div`
  display: grid;
  grid-template-columns: 49% 49%;
  gap: 2%;

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;
export const PhoneWrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;

  Select {
    padding: 11.5px;
  }
`;
export const ErrrorMsg = styled.div`
  color: red;
`;
export const CountrySelect = styled(Select)`
  padding: 0;
  padding: 10px;
  width: 100%;
  border-right: 1px solid #eaeaea;
`;
