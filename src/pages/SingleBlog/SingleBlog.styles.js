import styled from "styled-components";
import Button from "../../bootstrap/Button";
import Col from "../../bootstrap/Col";
import NavItem from "../../bootstrap/NavItem";
import Row from "../../bootstrap/Row";
import Truncate from "../../bootstrap/Truncate";
import Ul from "../../bootstrap/Ul";
import { Color } from "../../color";

export const BlogWrapper = styled.div`
  padding: 50px 0px;
  @media (max-width: 992px) {
    padding: 50px 0px;
  }
`;
export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`;
export const CalendarWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 15px 0px;
`;
export const CalendarImage = styled.img`
  margin-right: 10px;
`;
export const Date = styled.p`
  padding: 0;
  margin: 0;
`;
export const PopularCalendarWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 5px 0px;
`;
export const PopularCalendarImage = styled.img`
  margin-right: 10px;
  width: 15px;
  height: 15px;
`;
export const PopularDate = styled.p`
  font-size: 12px;
  padding: 0;
  margin: 0;
`; //
export const SingleBlogHeader = styled.h4`
  font-size: 22px;
  line-height: 1.5;
  padding: 0;
  margin: 0;
  font-weight: 600;
  padding-bottom: 15px;
`;
export const SingleBlogDescription = styled.p`
  color: #716c80;
  padding: 0;
  margin: 0;
  font-size: 14px;
  line-height: 2;
  padding-bottom: 40px;
`;
export const BlogPageHeaderWrapper = styled.div`
  background: #f7f7f7;
  color: #262a37;
  text-align: center;
  padding: 20px 0px;
  h2 {
    margin: 0;
    padding: 0;
    font-size: 35px;
    letter-spacing: 5px;
  }
  p {
    margin: 0;
    padding: 0;
  }
`;
export const BlogImage = styled.img`
  width: 100%;
  max-height: 400px;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;
export const RightSideUl = styled(Ul)`
  flex-direction: column;
  margin: 0;
  @media (max-width: 992px) {
    padding: 0;
  }
`;
export const RightSideUlLi = styled(NavItem)`
  cursor: pointer;
  list-style: none;
`;
export const PopularWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;
export const PopularTextWrapper = styled.div`
  margin-left: 10px;
`;
export const PopularImage = styled.img`
  width: 100px;
  height: 70px;
  border-radius: 3px;
`;
export const PopularTitle = styled(Truncate)`
  padding: 0px 5px;
  margin: 0;
  font-weight: 600;
  transition: 0.3s;
  font-size: 15px;
  &:hover {
    color: ${Color};
  }
`;
export const PopularHeader = styled.h3`
  font-size: 20px;
  color: #262a37;
  font-weight: 700;
  margin: 0;
  margin-bottom: 25px;
  line-height: 1;
`;
export const PersonWrapper = styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 20px 0px;
  margin-bottom: 30px;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 20px;
  }
`;
export const PersonInformation = styled.div`
  display: flex;
  align-items: center;
`;
export const PersonImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
export const PersonDetails = styled.div`
  padding-left: 20px;
  h5 {
    margin: 0;
    font-size: 16px;
  }
  p {
    margin: 0;
    font-size: 14px;
    color: #716c80;
  }
`;
export const Socialmedia = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  @media (max-width: 576px) {
    margin-left: 0;
  }
`;
export const SocialmediaShareText = styled.div`
  font-weight: 600;
  margin-right: 10px;
`;
export const SocialmediaLi = styled(NavItem)`
  list-style: none;
  padding-left: 10px;
`;
export const SocialmediaImage = styled.img`
  width: 30px;
  height: 30px;
`;
export const RelatedPostWrapper = styled.div`
  @media (max-width: 1000px) {
    margin-bottom: 30px;
  }
`;
export const RelatedPostTitle = styled.h3`
  font-size: 20px;
  color: #262a37;
  font-weight: 700;
  margin: 0;
  margin-bottom: 25px;
  line-height: 1;
`;
export const SingleRelatedPost = styled(Row)`
  display: grid;
  grid-template-columns: 48% 48%;
  grid-gap: 4%;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 100%;
    padding-bottom: 20px;
  }
`;
export const RightSideTop = styled(Col)`
  padding-left: 40px;
  @media (max-width: 1000px) {
    padding-left: 0px;
  }
  @media (max-width: 425px) {
    margin: 170px 0px 50px 0px;
  }
  @media (max-width: 375px) {
    margin: 210px 0px 50px 0px;
  }
  @media (max-width: 320px) {
    margin: 240px 0px 50px 0px;
  }
`;
export const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
`;
export const SearchButton = styled(Button)`
  ${(props) => ` 
 background: ${props.btnbgcolor};
  transition: 0.4s;
  &&:hover {
    background: ${props.btnhvcolor};
  }
  img {
    margin: 0px;
    width: 20px;
    height: 20px;
  }
`}
`;
