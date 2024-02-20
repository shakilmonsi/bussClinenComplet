import styled from "styled-components";

export const InnerBody = styled.div`
  max-width: 800px;
  ${(props) =>
    props.maxWidth &&
    `max-width: 100%;
     background: #EEEEF0;
     padding: 0px;
    `}
  border: 1px solid #d9d9d9;
  margin: 20px auto;
  border-radius: 5px;
`;
export const TicketHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 50px;
  border-bottom: 1px solid #d9d9d9;
`;

export const LeftSide = styled.div``;
export const CompanyName = styled.h4`
  padding: 0px;
  margin: 0px;
`;
export const Logo = styled.img`
  width: 88px;
  height: 44px;
  margin-bottom: 5px;
`;
export const RightSide = styled.ul`
  padding: 0px;
  margin: 0px;
  list-style: none;
`;
export const RightSideProperty = styled.span`
  text-transform: capitalize;
`;
export const LocationName = styled.div``;
export const BookingId = styled.h4`
  padding: 0px;
  margin: 0px;
`;
export const PaymentStatus = styled.div``;

export const TermAndConditionWrapper = styled.div`
  border-top: 1px solid #d9d9d9;
`;
export const DownloadButtonWrapper = styled.div`
  text-align: right;
  display: flex;
  justify-content: flex-end;
  flex: wrap;
  gap: 10px;
  margin-bottom: 50px;
  margin-right: 50px;
`;
export const DownloadButton = styled.button`
  text-transform: capitalize;
  background: ${(props) => props.btnBgColor};
  color: ${(props) => props.btnTextColor};
  transition: 0.4s;
  &&:hover {
    background: ${(props) => props.btnBgHvColor};
  }
  border: none;
  margin-top: 30px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const PaymentButton = styled.button`
  text-transform: capitalize;
  background: ${(props) => props.btnBgColor};
  color: ${(props) => props.btnTextColor};
  transition: 0.4s;
  &&:hover {
    background: ${(props) => props.btnBgHvColor};
  }
  border: none;
  margin-top: 30px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const CustomerBookingId = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;