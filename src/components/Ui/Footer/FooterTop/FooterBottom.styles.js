import styled from "styled-components";
import NavItem from "../../../../bootstrap/NavItem";
import Ul from "../../../../bootstrap/Ul";
import SinglePhoto from "../../SinglePhoto";

export const Wrapper = styled.div`
  background: ${(props) => props.bgColor};
  color: white;
  line-height: 1.7;
  @media (max-width: 576px) {
    padding-bottom: 130px;
  }
`;
export const FooterBottomWrapper = styled.div`
  padding: 50px 0px;
  display: grid;
  grid-template-columns: 30% 20% 20% 25%;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 28% 18% 18% 23%;
    grid-gap: 2.66%;
  }
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 90%;
    grid-gap: 10%;
  }
`;

export const Address = styled.address`
  align-self: flex-start;
  font-size: 14px;
  font-weight: 200;
  font-style: normal;
  padding-right: 42px;
`;
export const About = styled.div`
  align-self: flex-start;
`;
export const InnerAbout = styled(Ul)`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 200;
  flex-direction: column;
`;
export const CommonNavItem = styled(NavItem)`
  list-style: none;
  text-transform: capitalize;
  a {
    text-decoration: none;
    color: white;
    transition: 0.4s;
    border-bottom: 1px solid transparent;
    &:hover {
      ${(props) => ` 
       color: ${props.hvcolor};
      border-bottom: 1px solid ${props.hvcolor};
      `}
    }
  }
`;
export const Privacy = styled.div`
  align-self: flex-start;
  font-size: 14px;
`;
export const InnerPrivacy = styled(Ul)`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 200;
  flex-direction: column;
`;
export const Download = styled.div`
  align-self: flex-start;
  position: relative;
`;

export const FooterIcon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  a {
    cursor: pointer;
    width: 100px;
    height: 35px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
export const DownloadHeader = styled.h5`
  font-size: 16px;
  margin-top: 0;
  font-weight: 400;
`;

export const SocialImage = styled(SinglePhoto)`
  width: 100px;
  display: block;
  margin-bottom: 10px;
`;
