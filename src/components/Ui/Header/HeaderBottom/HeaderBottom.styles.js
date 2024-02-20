import { Link } from "react-router-dom";
import styled from "styled-components";
import NavItem from "../../../../bootstrap/NavItem";
import Ul from "../../../../bootstrap/Ul";

export const Wrapper = styled.div`
  background: ${(props) => props.bg};
  text-align: center;
  height: auto;
`;
export const HeaderBottomWrapper = styled.div`
  display: flex;
  grid-template-columns: 20% 80%;
  align-items: center;
  @media (max-width: 992px) {
    padding: 0px;
    display: grid;
    grid-template-columns: 100%;
    align-items: center;
  }
`;
export const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  img {
    padding: 5px 0px;
  }
`;
export const NavigationWrapper = styled.div`
  margin-left: auto;
  @media (max-width: 992px) {
    margin: 0;
  }
`;
export const NavigationUl = styled(Ul)`
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  display: none;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
  }
`;
export const NavigationWithOutRes = styled(Ul)`
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;

  @media (max-width: 992px) {
    display: none;
  }
`;
export const SingleNavItem = styled(NavItem)`
  list-style: none;
`;
export const NavLink = styled(Link)`
  text-transform: capitalize;
  text-decoration: none;
  color: #fff;
  padding: 16px 15px;
  font-weight: 300;
  font-size: 16px;
  border-bottom: 3px solid transparent;
  transition: 0.4s;
  display: block;
  &&:hover {
    border-bottom: 3px solid #fff;
    padding: 16px 15px;
  }
`;
export const NavLinkId = styled.a`
  text-decoration: none;
  color: #fff;
  padding: 16px 15px;
  font-weight: 300;
  font-size: 16px;
  border-bottom: 3px solid transparent;
  transition: 0.4s;
  display: block;
  &&:hover {
    border-bottom: 3px solid #fff;
    padding: 16px 15px;
  }
`;
export const NavigationBar = styled.div`
  display: none;
  text-align: left;
  @media (max-width: 992px) {
    display: inline-block;
    align-items: center;
  }
`;
export const NavigationBarIcon = styled.img`
  width: 35px;
  height: 40px;
`;
