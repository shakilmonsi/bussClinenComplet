import styled from "styled-components";

export const Container = styled.div``;
export const TravelarInformation = styled.div`
  font-size: 14px;
`;
export const InformationHeader = styled.h4`
  text-transform: capitalize;
  text-align: left;
  font-size: 20px;
  font-weight: 700;
  color: #2b2b2b;
  padding-bottom: 15px;
`;

export const Select = styled.select`
  padding: 0.575rem 0.75rem;
  border: none;
  border-right: 1px solid #eaeaea;
  &&:focus-visible {
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
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
    margin-bottom: 20px;
  }
  label {
    text-transform: capitalize;
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
    margin-bottom: 20px;
  }
  label {
    text-transform: capitalize;
  }
`;
export const CheckboxWrapper = styled.div`
  text-align: left;
  margin-top: 20px;
`;
export const Label = styled.label`
  margin-left: 5px;
  cursor: pointer;
`;

export const SingleTravellerInformationWrapper = styled.div`
  margin-top: 40px;
`;
export const Input = styled.input`
  cursor: pointer;
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
  }
`;

export const Password = styled.div`
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
    margin-bottom: 20px;
  }
`;
export const PasswordLabel = styled.label`
  cursor: pointer;
  margin-left: 5px;
`;
export const PayPalWrapper = styled.div`
  z-index: 3;
  margin-top: 30px;
`;
