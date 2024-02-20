import styled from "styled-components";
import NavItem from "../../bootstrap/NavItem";
import Ul from "../../bootstrap/Ul";
import { Color } from "../../color";
import Hero from "../../components/Ui/Hero";

export const PageLoaderContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`;
export const HeroWrapper = styled.div`
  position: relative;
  @media (max-width: 922px) {
    margin-bottom: 20px;
  }
`;
export const HeroComponent = styled(Hero)`
  margin: 0px;
  height: 200px;
  @media (max-width: 1024px) {
    height: 350px;
  }
`;
export const SearchFormWrapper = styled.div`
  z-index: 1;
  border-radius: 5px;
  background: #ffffff26;
  max-width: 1000px;
  width: 100%;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  @media (max-width: 1200px) {
    width: 90%;
  }
`;
export const BookingBody = styled.div`
  padding: 40px 0px;
  display: grid;
  grid-template-columns: 25% 75%;
  align-items: flex-start;
  @media (max-width: 922px) {
    display: grid;
    grid-template-columns: 100%;
    align-items: flex-start;
  }
`;
export const RightSide = styled.div`
  position: relative;
  height: 100%;
  @media (max-width: 922px) {
    margin-top: 20px;
  }
`;
export const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const CardHeaderListUl = styled(Ul)`
  font-size: 12px;
  margin: 0px;
  padding: 0px;
  list-style: none;
  display: grid;
  grid-template-columns: 17% 13% 16% 13% 15% 13% 14% 10%;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
  @media (max-width: 1200px) {
    display: gird;
    grid-template-columns: 17% 13% 15% 13% 16% 15% 10% 10%; 
  }
  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: 17% 13% 15% 13% 15% 14% 18% 10%;
  }
  @media (max-width: 922px) {
    display: grid;
    grid-template-columns: 17% 13% 15% 13% 15% 14% 18% 10%;
  }
`;
export const CardHeaderList = styled(NavItem)`
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 600;
  @media (max-width: 1024px) {
    font-size: 10px;
  }
`;
export const NotFound = styled.p`
  text-align: center;
  font-size: 18px;
  margin: 20px;
  font-weight: 600;
`;
export const ErrorMsg = styled.p`
  text-align: center;
`;
export const TripHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
  margin-top: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;
export const TripHeaderLeft = styled.div`
  flex: 1;
  padding-right: 20px;
`;
export const Depature = styled.div`
  font-size: 14px;
  text-transform: capitalize;
`;

export const TripHeaderRight = styled.div`
  flex: 1;
  padding-left: 20px;
  border-left: 1px solid #d9d9d9;
`;
export const ReturnBtnWraper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
export const Return = styled.div`
  text-transform: capitalize;
  font-size: 12px;
  margin-bottom: 10px;
`;
export const LocationAndDate = styled.div``;

export const Location = styled.h4`
  margin: 0;
  font-size: 20px;
`;
export const Date = styled.p`
  margin: 0;
  font-size: 15px;
`;

export const TestBtn = styled.button`
  border-radius: 3px;
  border: none;
  background: ${Color};
  padding: 10px 20px;
  color: white;
`;
export const InnerContainer = styled.div`
  min-height: calc(100vh - 577px);
`;
