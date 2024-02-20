import styled from "styled-components";

export const SideBar = styled.div`
  padding-right: 40px;
`;

export const SideBarNavItemWrapper = styled.div`
  @media (max-width: 992px) {
    margin-bottom: 20px;
  }
`;
export const SingleNavItem = styled.li`
  text-transform: capitalize;
  color: #000;
  ${(props) => ` 
  font: 16px;
  margin-bottom: 10px;
  transition: 0.4s;
  color: ${props.textcolor};
  &:hover {
    color: ${props.hvcolor};
    cursor: pointer;
  }
`}
`;
export const AdvertismentWrapper = styled.div`
  @media (max-width: 992px) {
    display: none;
  }
`;
