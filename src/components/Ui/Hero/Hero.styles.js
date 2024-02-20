import styled from "styled-components";
import Button from "../../../bootstrap/Button";

export const HeroWrapper = styled.div`
  background: url(${(props) => props.img});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 400px;
  position: relative;
  margin-bottom: 100px;
  box-shadow: 10px 10px 5px 200px rgba(0, 0, 0, 0.5) inset;
  -webkit-box-shadow: 10px 10px 5px 200px rgba(0, 0, 0, 0.5) inset;
  -moz-box-shadow: 10px 10px 5px 200px rgba(0, 0, 0, 0.5) inset;
  @media (max-width: 1024px) {
    margin-bottom: 0px;
  }
`;
export const HeroTextWrapper = styled.div`
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const HeroHeader = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 45px;
  text-align: center;
  @media (max-width: 1200px) {
    font-size: 35px;
  }
  @media (max-width: 922px) {
    font-size: 30px;
  }
`;
export const HeroSubHeader = styled.p`
  margin: 0;
  padding: 0;
  text-align: center;
  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
`;
export const HeroBtn = styled(Button)`
  text-transform: capitalize;
  ${(props) => ` 
 background: ${props.btnbgcolor};
  color: ${props.btntextcolor};
  border: none;
  border-radius: 0px;
  padding: 10px 28px;
  margin: 20px auto;
  font-size: 14px;
  border-radius: 3px;
  transition: 0.4s;
  &&:hover {
    background: ${props.btnhvcolor};
  }
`}
`;
