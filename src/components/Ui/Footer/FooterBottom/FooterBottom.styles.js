import styled from "styled-components";
import SinglePhoto from "../../SinglePhoto";

export const Wrapper = styled.div`
  background: ${(props) => props.bgColor};
  color: white;
  font-size: 14px;
`;
export const InnerFooterBottom = styled.div`
  padding: 15px 0px;
  display: grid;
  grid-template-columns: 78% 22%;
  @media (max-width: 1200px) {
    padding: 6px 0px;
    display: grid;
    grid-template-columns: 70% 30%;
  }
  @media (max-width: 922px) {
    padding: 0px 0px;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 20px;
  }
`;
export const FooterBottomLeft = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
  @media (max-width: 922px) {
    padding-top: 15px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 100%;
    align-items: center;
  }
`;
export const FooterLogo = styled(SinglePhoto)`
  cursor: pointer;
  width: 80px;
  height: 36px;
  @media (max-width: 922px) {
    margin: 0 auto;
  }
`;
export const CopyRight = styled.div`
  text-transform: capitalize;
  @media (max-width: 922px) {
    margin: 0 auto;
    padding-top: 15px;
  }
`;
export const FooterBottomRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 922px) {
    width: 250px;
    margin: 0 auto;
    padding-bottom: 15px;
  }
`;
export const SocialMedia = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    padding: 0px 0px 0px 15px;
  }
`;

export const SocialImage = styled(SinglePhoto)`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: block;
`;
export const FollowTitle = styled.h4`
  margin: 0px;
  text-transform: capitalize;
`;
export const SocialMediaLink = styled.a``;
