import styled from "styled-components";
import Button from "../../../bootstrap/Button";

export const FormWrapper = styled.form`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 20px;
  @media (max-width: 1024px) {
    margin-bottom: 50px;
  }
`;
export const Passenger = styled.div`
  text-align: left;
  display: grid;
  grid-template-columns: 18% 79%;
  grid-gap: 3%;
  margin-top: 20px;
  .input-group-text {
    padding: 0;
    border-right: 1px solid #eee;
  }
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 10px;
    margin-bottom: 30px;
  }
`;
export const UserContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  grid-gap: 4%;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  @media (max-width: 576px) {
    grid-template-columns: 100%;
    grid-gap: 10px;
  }
`;
export const FirstNameAndNid = styled.div`
  display: flex;
`;
export const FirstNameGender = styled.div``;
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
export const Nid = styled.div`
  text-align: left;
  display: grid;
  grid-template-columns: 18% 79%;
  grid-gap: 3%;
  margin-top: 20px;
  .input-group-text {
    padding: 0;
    border-right: 1px solid #eee;
  }
  @media (max-width: 576px) {
    text-align: left;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 10px;
    margin-bottom: 30px;
  }
`;
export const Country = styled.div`
  text-align: left;
  display: grid;
  grid-template-columns: 18% 38%;
  grid-gap: 3%;
  margin-top: 20px;
  @media (max-width: 576px) {
    text-align: left;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 10px;
    margin-bottom: 30px;
  }
`;
export const CityAndZip = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  grid-gap: 4%;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  @media (max-width: 576px) {
    grid-template-columns: 100%;
    grid-gap: 10px;
  }
`;

export const Address = styled.div`
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
    margin-bottom: 30px;
  }
`;
export const UpdatedButton = styled(Button)`
  ${(props) => ` 
  background: ${props.btnbgcolor};
  color: ${props.btntextcolor};
  transition: 0.4s;
  &&:hover {
    background: ${props.btnbghvcolor};
  }
  margin-top: 20px;
 `}
`;
