import styled from "styled-components";
import SinglePhoto from "../SinglePhoto";

export const Wrapper = styled.div`
  padding: 0px;
  margin-top: 20px;
  background: #f8f8f8;
`;
export const MobileWrapper = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-template-columns: 49% 49%;
  column-gap: 2%;
  align-items: center;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 100%;
    align-items: center;
  }
`;
export const LeftSide = styled.div`
  text-align: center;
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;
export const Photo = styled(SinglePhoto)`
  width: 450px;
  height: 420px;
  display: block;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 350px;
    height: 300px;
    display: block;
  }
  @media (max-width: 576px) {
    width: 200px;
    height: 220px;
  }
`;
export const RightSide = styled.div`
  @media (max-width: 768px) {
    text-align: center;
  }
`;
export const Details = styled.p`
  font-size: 14px;
  padding: 10px 0px;
  color: rgb(113, 108, 128);
`;
export const Header = styled.h3`
  font-size: 30px;
  font-weight: 600;
  margin: 0;
  @media (max-width: 576px) {
    font-size: 20px;
    font-weight: 600;
  }
`;

export const SocialMedia = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
export const SocialMediaImage = styled(SinglePhoto)`
  width: 120px;
  margin-right: 10px;
  border-radius: 5px;
`;
