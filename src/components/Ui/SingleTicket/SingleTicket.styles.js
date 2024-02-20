import Popup from "reactjs-popup";
import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px solid #d9d9d9;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
`;

export const FirstRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 10px;
`;
export const TicketBookingIdTitle = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weight: 500;
`;
export const SecondRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
export const Location = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
export const TicketId = styled.div`
  font-size: 14px;
`;
export const DateAndTime = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  flex-wrap: wrap;
  @media (max-width: 375px) {
    margin-bottom: 10px;
  }
`;
export const Date = styled.div`
  margin-right: 20px;
`;
export const Time = styled.div``;
export const ButtonWrapper = styled.div`
  display: flex;
  flex: wrap;
`;
export const Btn = styled.button`
  ${(props) => ` 
  padding: 10px 20px;
  background: ${props.btnbgcolor};
  transition: 0.4s;
  &&:hover {
    background: ${props.btnbghvcolor};
  }
  color: ${props.btntextcolor};
  border: none;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
  `}
`;

// test start

export const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.7) !important;
    z-index: 0 !important ;
  }

  &-content {
    background-color: #fff !important;
    border:none;
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) !important;
    width:35% !important;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
    padding: 20px;
    z-index: 1 !important ;

    @media (max-width: 576px) {
      width: 400px !important;
    }
    @media (max-width: 480px) {
      width: 300px !important;
    }
    @media (max-width: 380px) {
      width: 250px !important;
      padding: 10px;import { Label } from './../TrackOrder/TrackOrder.styles';

    }

    .popup-arrow {
      display: none;
    }
  }
`;

export const Modal = styled.div`
  font-size: 12px;
`;

export const Content = styled.div`
  width: 100%;
  padding: 10px 5px;
`;
export const BookingId = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;
export const Close = styled.button`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: -10px;
  top: -10px;
  font-size: 24px;
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #cfcece;
`;

export const RatingWrapper = styled.div`
  display: grid;
  grid-template-columns: 30% 60%;
  gap: 10%;
  align-items: center;
  margin-bottom: 20px;
`;
export const CommentWrapper = styled.div`
  display: grid;
  grid-template-columns: 30% 60%;
  gap: 10%;
  align-items: center;
  margin-bottom: 20px;
`;

export const SubmitBtn = styled.button`
  ${(props) => ` 
  padding: 10px 20px;
  background: ${props.btnbgcolor};
  transition: 0.4s;
  &&:hover {
    background: ${props.btnbghvcolor};
  }
  color: ${props.btntextcolor};
  border: none;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
  `}
`;

export const PaymentBtns = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
`;

export const SinglePayment = styled.li`
  margin-bottom: 10px;
`;
export const PaymentList = styled.ul`
  display: flex;
  align-items: center;
  margin: 0px;
  padding: 0px;
  margin-top: 20px;
  li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    label {
      cursor: pointer;
    }
  }
`;
export const Input = styled.input`
  background: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
`;
export const PaymentBtn = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  border: none;
  cursor: pointer;
`;
export const PaymentWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 96%;
  ::placeholder {
    font-size: 14px;
  }
  :focus {
    outline: none;
  }
`;
export const PaymentTitle = styled.label`
  color: #000;
`;
