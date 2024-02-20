import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../bootstrap/Button";

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`;
export const FormArea = styled.div`
  font-size: 14px;
  padding: 100px 0px;
  @media (max-width: 576px) {
    padding: 50px 0px;
  }
`;
export const InnerFormArea = styled.div`
  max-width: 400px;
  width: 100%;
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
export const SocialLink = styled.div`
  display: grid;
  grid-template-columns: 45% 45%;
  grid-gap: 10%;
  align-items: flex-start;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 20%;
  }
`;
export const FacebookButton = styled.button`
  text-transform: capitalize;
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  color: #fff;
  background: #425993;
  cursor: pointer;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
export const GoogleButton = styled.button`
  text-transform: capitalize;
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  color: #9b9b9b;
  background: white;
  cursor: pointer;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
export const Or = styled.h5`
  text-transform: capitalize;
  margin: 0;
  padding: 20px 0px 10px;
  color: #9b9b9b;
  font-weight: 500;

  &:before {
    display: inline-block;
    content: "";
    border-top: 0.1rem solid #c1c1c1;
    width: 11.45555rem;
    margin-right: 0.5rem;
    transform: translateY(0rem);
  }
  &:after {
    display: inline-block;
    content: "";
    border-top: 0.1rem solid #c1c1c1;
    width: 11.4555rem;
    margin-left: 0.5rem;
    transform: translateY(0rem);
  }
  @media (max-width: 576px) {
    margin-top: 20px;
    &:before {
      width: 8rem;
    }
    &:after {
      width: 8rem;
    }
  }
  @media (max-width: 420px) {
    margin-top: 20px;
    &:before {
      width: 6.5rem;
    }
    &:after {
      width: 6.5rem;
    }
  }
`;
export const Form = styled.form``;
export const FormHeader = styled.h5`
  text-align: left;
  color: #363636;
  font-size: 16px;
  text-transform: capitalize;
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
  flex-wrap: wrap;
`;
export const CheckBox = styled.div`
  input {
    cursor: pointer;
  }
`;
export const RememberMe = styled.label`
  margin-left: 10px;
  cursor: pointer;
  text-transform: capitalize;
`;

export const ForgetPasswordLink = styled(Link)`
  text-decoration: none;
  text-transform: capitalize;
  color: ${(props) => props.textcolor};
`;

export const SubmitButton = styled(Button)`
  text-transform: capitalize;
  ${(props) => ` 
border: none;
  padding: 12px 0px;
  background: ${props.btnbgcolor};
  color: ${props.btntextcolor};
  transition: 0.4s;
  &&:hover {
    background: ${props.btnbghvcolor};
  }
  width: 100%;
  fontsize: 18px;
`}
`;

export const TempBtn = styled.a`
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
  margin-top: 20px;
`;
