import styled from "styled-components";

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
    margin-bottom: 20px;
  }
  label {
    text-transform: capitalize;
  }
`;
export const PassengerName = styled.div`
  text-align: left;
  display: grid;
  grid-template-columns: 48% 48%;
  grid-gap: 4%;
  @media (max-width: 768px) {
    text-align: left;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 4%;
  }
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
    margin-bottom: 20px;
  }
  label {
    text-transform: capitalize;
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
  }
`;
export const FirstNameAndNid = styled.div`
  display: flex;
`;
