import styled from "styled-components";
import NavItem from "../../../bootstrap/NavItem";
import Ul from "../../../bootstrap/Ul";
import { Color } from "../../../color";

export const Container = styled.div`
  padding-right: 40px;
`;

export const CheckBoxUl = styled(Ul)`
  flex-direction: column;
  text-align: left;
  margin: 0;
  padding: 0;
  font-size: 14px;
`;

// start range
export const Range = styled.div`
  text-align: left;
  @media (max-width: 922px) {
    padding-right: 0px;
  }
`;
export const Form = styled.form`
  border-bottom: 1px solid #c9c9c9;
  padding: 50px 0px 20px 0px;
  .input-range__slider {
    background: white;
    border: 1px solid ${Color};
  }
  .input-range__track--active {
    background: ${Color};
  }
  .input-range__label-container {
    background: ${Color};
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
  }
  .input-range__label--max {
    display: none;
  }
  .input-range__label--min {
    display: none;
  }
`;
// end range

export const Text = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;
export const Card = styled.div`
  font-size: 12px;
  @media (max-width: 922px) {
    padding-right: 0px;
  }
`;
export const InnerCard = styled.div`
  border-bottom: 1px solid #c9c9c9;
  padding-bottom: 20px;
  font-size: 14px;
`;
export const CommonNavItem = styled(NavItem)`
  display: flex;
  align-items: center;
  padding: 5px 0px;
`;
export const CommonLabel = styled.label`
  margin-left: 10px;
  cursor: pointer;
`;
export const Header = styled.h5`
  text-align: left;
  text-transform: uppercase;
  font-size: 14px;
`;
export const Advertisement = styled.div`
  padding: 60px 40px 0px 0px;
  position: relative;
  @media (max-width: 922px) {
    padding: 60px 0px 20px 0px;
    display: none;
  }
  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
`;
export const AdvertisementText = styled.div`
  color: white;
  width: 70%;
  position: absolute;
  content: "";
  top: 80%;
  left: 44%;
  transform: translate(-50%, -50%);
`;
export const TextNumber = styled.div`
  color: #1fba30;
  padding: 5px;
  font-weight: 800;
  font-size: 26px;
`;
export const AdvertisementHeader = styled.div`
  font-size: 20px;
`;
export const AdvertisementSubHeader = styled.div`
  font-size: 12px;
`;
export const RightWrapper = styled.div`
  margin-left: 15px;
  @media (max-width: 768px) {
    margin: 0;
  }
`;
export const Input = styled.input`
  cursor: pointer;
`;
