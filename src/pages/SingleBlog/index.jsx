import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import calendarIcon from "../../../src/assets/images/calender.svg";
import searchIcon from "../../assets/images/search_white_24dp.svg";
import personImage from "../../assets/images/user.jpg";
import Col from "../../bootstrap/Col";
import Container from "../../bootstrap/Container";
import Layout from "../../bootstrap/Layout";
import Row from "../../bootstrap/Row";
import TextField from "../../bootstrap/TextField";
import { Color } from "../../color";
import Card from "../../components/Ui/Card";
import SocialMedia from "../../components/Ui/SocialMedia";
import {
  BlogImage,
  BlogPageHeaderWrapper,
  BlogWrapper,
  CalendarImage,
  CalendarWrapper,
  Date,
  PersonDetails,
  PersonImage,
  PersonInformation,
  PersonWrapper,
  PopularCalendarImage,
  PopularCalendarWrapper,
  PopularDate,
  PopularHeader,
  PopularImage,
  PopularTextWrapper,
  PopularTitle,
  PopularWrapper,
  RelatedPostTitle,
  RelatedPostWrapper,
  RightSideTop,
  RightSideUl,
  RightSideUlLi,
  SearchButton,
  SearchWrapper,
  SingleBlogDescription,
  SingleBlogHeader,
  SingleRelatedPost,
  Socialmedia,
  SocialmediaShareText,
} from "./SingleBlog.styles";

const SingleBlog = () => {
  const { webSettingData } = useSelector((state) => state.busLists);
  const [blogs, setBlogs] = useState([]);
  const [singleBlog, setSingleBlog] = useState([]);
  const [width, setWidth] = useState();
  const innerWidth = window.innerWidth;
  const { id } = useParams();
  const history = useHistory();
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);

  useEffect(() => {
    setWidth(innerWidth);
  }, [width]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setSingleBlog(data.data));
  }, [id]);
console.log(singleBlog);
  const clickHandelar = (singleId) => {
    history.push(`/blog/details/${singleId}`);
    fetch(`${process.env.REACT_APP_API_DOMAIN}/blogs/${singleId}`)
      .then((res) => res.json())
      .then((data) => setSingleBlog(data.data));
  };
  const relatedHandelar = (relatedId) => {
    history.push(`/blog/details/${relatedId}`);
    fetch(`${process.env.REACT_APP_API_DOMAIN}/blogs/${relatedId}`)
      .then((res) => res.json())
      .then((data) => setSingleBlog(data.data));
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data.data));
  }, [id]);

  return (
    <Layout title={`blog ${id}`} userProfileInfo={userProfileInfo}>
      <BlogPageHeaderWrapper>
        <h2>BLOG</h2>
        <p>Home - Blog Details</p>
      </BlogPageHeaderWrapper>
      <Container>
        <BlogWrapper>
          <Row>
            <Col lg="8" md="12" sm="12">
              <BlogImage src={singleBlog?.image} alt="blogImage" />
              <CalendarWrapper>
                <CalendarImage src={calendarIcon} alt="calendarIcon" />
                <Date>{singleBlog?.created_at}</Date>
              </CalendarWrapper>
              <SingleBlogHeader>{singleBlog?.title}</SingleBlogHeader>
              <SingleBlogDescription
                dangerouslySetInnerHTML={{ __html: singleBlog?.description }}
              ></SingleBlogDescription>

              <PersonWrapper>
                {/* <PersonInformation>
                  <PersonImage src={personImage} alt="personImage" />
                  <PersonDetails>
                    <h5>By Nove</h5>
                    <p>March 25, 2021</p>
                  </PersonDetails>
                </PersonInformation> */}
                <Socialmedia>
                  <SocialmediaShareText>Share : </SocialmediaShareText>
                  <SocialMedia />
                </Socialmedia>
              </PersonWrapper>
              <RelatedPostWrapper>
                <RelatedPostTitle>Related Post</RelatedPostTitle>
                <SingleRelatedPost>
                  {blogs.slice(0, 2).map((item) => (
                    <Card
                      item={item}
                      key={item.id}
                      descriptaionLength="60"
                      headerLength="25"
                      onClick={() => relatedHandelar(item.id)}
                      icon={calendarIcon}
                      hvColor={Color}
                      style={{
                        borderRadius: "10px 10px 0px 0px",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </SingleRelatedPost>
              </RelatedPostWrapper>
            </Col>
            <Col lg="4" md="12" sm="12">
              <RightSideTop>
                {/* <SearchWrapper>
                  <TextField placeholder="search.." />
                  <SearchButton
                    btnbgcolor={webSettingData?.buttoncolor}
                    btnhvcolor={webSettingData?.buttoncolorhover}
                  >
                    <img src={searchIcon} alt="searchIcon" />
                  </SearchButton>
                </SearchWrapper> */}
                <PopularHeader>Popular Post</PopularHeader>
              </RightSideTop>
              <RightSideUl>
                {blogs.slice(0, 5).map((item) => (
                  <RightSideUlLi
                    onClick={() => clickHandelar(item.id)}
                    key={item?.id}
                  >
                    <PopularWrapper>
                      <PopularImage src={item.image} alt="blogImage" />
                      <PopularTextWrapper>
                        <PopularTitle
                          header={item.title}
                          headerLength={width > 1250 ? "40" : "30"}
                        />
                        <PopularCalendarWrapper>
                          <PopularCalendarImage
                            src={calendarIcon}
                            alt="calendarIcon"
                          />
                          <PopularDate>{singleBlog?.created_at}</PopularDate>
                        </PopularCalendarWrapper>
                      </PopularTextWrapper>
                    </PopularWrapper>
                  </RightSideUlLi>
                ))}
              </RightSideUl>
            </Col>
          </Row>
        </BlogWrapper>
      </Container>
    </Layout>
  );
};

export default SingleBlog;
