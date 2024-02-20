import DatePicker from "react-date-picker";
import Select from "react-select";
import styled from "styled-components";
import Button from "../../../bootstrap/Button";
import TextField from "../../../bootstrap/TextField";

export const Form = styled.form`
  padding: 20px 20px;
`;
export const InnerForm = styled.div`
  .react-date-picker__inputGroup__input:invalid {
    background: transparent;
  }
  .input-group {
    border: none;
  }
  display: flex;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;
export const Location = styled.div`
  display: flex;
  flex: 1;
  @media (max-width: 425px) {
    gap: 10px;
    flex-direction: column;
  }
`;
export const LocationInput = styled(TextField)`
  background: white;
  width: 100%;
  border: 1px solid #d9d9d9;
  padding: 17px 15px;
`;
export const Date = styled.div`
  display: flex;
  flex: 1;
  @media (max-width: 425px) {
    gap: 10px;
    flex-direction: column;
  }
`;
export const Calendar = styled(DatePicker)`
  display: block;
  .react-date-picker__inputGroup {
    font-size: 14px;
  }
  .react-date-picker__inputGroup__divider {
    font-size: 0;
  }

  .react-date-picker__inputGroup__divider:before {
    content: "-";
    font-size: 12px;
  }
`;

export const JourneyDate = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #d9d9d9;
  padding: 2px 2px 2px 15px;
  .react-date-picker__wrapper {
    border: none;
  }
`;

export const ReturnDate = styled.div`
  flex: 1;
  padding: 2px 2px 2px 15px;
  background: white;
  border: 1px solid #d9d9d9;
  .react-date-picker__wrapper {
    border: none;
  }
`;

export const DateText = styled.div`
  font-size: 10px;
  text-transform: capitalize;
`;

export const SearchBtnArea = styled.div`
  text-align: right;
  margin-top: 10px;
  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;
export const SearchBtn = styled(Button)`
  text-transform: capitalize;
  ${(props) =>
    `background: ${props.searchbtnbgcolor};
  color: ${props.btntextcolor};
  border: none;
  padding: 10px 30px;
  margin-left: auto;
  font-size: 14px;
  transition: 0.4s;
  &&:hover {
    background: ${props.searchbtnbghvcolor};
  }`}
`;

export const ExchangePhoto = styled.svg`
  border: 1px solid #d9d9d9;
  padding: 5px;
  border-radius: 50%;
  position: absolute;
  left: 24.3%;
  top: 23%;
  background: white;
  z-index: 2;
  width: 15px;
  height: 15px;
  ${(props) => `
  color: ${props.headercolor};
  
  `}
  @media (max-width: 1024px) {
    left: 48.5%;
    top: 15%;
  }
  @media (max-width: 992px) {
    left: 48.38%;
    top: 15%;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

// start booking page

export const BookingPageExchangePhoto = styled.img`
  border: 1px solid #d9d9d9;
  padding: 5px;
  border-radius: 50%;
  position: absolute;
  left: 18.9%;
  top: 35%;
  background: white;
  z-index: 2;
  @media (max-width: 1024px) {
    left: 48.6%;
    top: 16%;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const BookingPageInnerForm = styled.div`
  .input-group {
    border: none;
  }
  display: grid;
  grid-template-columns: 38% 38% auto;
  grid-gap: 10px;
  @media (max-width: 1024px) {
    grid-template-columns: 100%;
  }
`;
export const BookingPageLocation = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
    grid-gap: 10px;
  }
`;

export const BookingLocationInput = styled(TextField)`
  width: 100%;
  border: 1px solid #d9d9d9;
  padding: 15px;
`;
export const BookingPageDate = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
    grid-gap: 10px;
  }
`;
export const BookingPageJourneyDate = styled.div`
  background: white;
  border: 1px solid #d9d9d9;
  padding: 2px 2px 2px 15px;
  .react-date-picker__wrapper {
    border: none;
  }
`;
export const BookingPageReturnDate = styled.div`
  background: white;
  border: 1px solid #d9d9d9;
  padding: 2px 2px 2px 15px;
  .react-date-picker__wrapper {
    border: none;
  }
`;
export const BookingPageSearchBtn = styled(Button)`
  text-transform: capitalize;
  ${(props) => ` 
  border: none;
  background: ${props.searchbtnbgcolor};
  padding: 14.5px 35px;
  text-align: center;
  color: ${props.btntextcolor};
  width: 100%;
  font-size: 14px;
  transition: 0.4s;
  &&:hover {
    background: ${props.searchbtnbghvcolor};
  }
  `}
`;
export const SearchLocation = styled(Select)`
  font-size: 14px;
  text-transform: capitalize;
  flex: 1;
  > div {
    border-radius: 0%;
    border: 1px solid #d9d9d9;
    padding-left: 12px;
    min-height: 50px;
    cursor: pointer;
  }
  input {
    padding: 11px 0px;
  }

  > div > div:last-child {
  }

  > div > div:last-child > div {
  }
`;
