import styled from "styled-components";
import SinglePhoto from "./../SinglePhoto/index";

export const SocialMediaUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    padding: 0px 15px 0px 0px;
  }
`;

export const SocialMediaLink = styled.a``;

export const SocialImage = styled(SinglePhoto)`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: block;
  background: grey;
`;
