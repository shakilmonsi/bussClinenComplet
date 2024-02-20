import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import Col from "../../bootstrap/Col";
import Container from "../../bootstrap/Container";
import Layout from "../../bootstrap/Layout";
import Row from "../../bootstrap/Row";
import Spinner from "../../bootstrap/Spinner";

import {
  BlogPageHeaderWrapper,
  BlogPageSubTitle,
  BlogPageTitle,
  BlogWarning,
  BlogWrapper,
  InnerBlogCard,
  PaginationWrapper,
  SingleCard,
  SpinnerWrapper,
} from "./AllBlog.styles";

const AllBlog = () => {
  const { webSettingData,languageData } = useSelector((state) => state.busLists);
  const [blogData, setBlogData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const blogsPerPage = 6;
  const pageVisited = pageNumber * blogsPerPage;
  const displayUsers = blogData?.slice(pageVisited, pageVisited + blogsPerPage);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  // const [languageData, setLanguageData] = useState();


  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        setBlogData(data?.data);
      });
  }, []);
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);
  
  const pageCount = Math.ceil(blogData?.length / blogsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Layout title={languageData?.blog_tab_title[webSettingData?.language]} userProfileInfo={userProfileInfo}>
      {displayUsers?.length ? (
        <>
          <BlogPageHeaderWrapper>
            <BlogPageTitle>
              {languageData?.blog_page_title[webSettingData?.language]}
            </BlogPageTitle>
            <BlogPageSubTitle>
              {languageData?.blog_page_sub_title[webSettingData?.language]}
            </BlogPageSubTitle>
          </BlogPageHeaderWrapper>

          <Container>
            <BlogWrapper>
              <Row>
                {displayUsers?.map((item) => (
                  <Col key={item.id} lg="4" md="6" sm="12">
                    <InnerBlogCard>
                      <SingleCard
                        item={item}
                        headerLength="25"
                        descriptaionLength="60"
                        url={`/blog/details/${item?.id}`}
                        id={item?.id}
                      />
                    </InnerBlogCard>
                  </Col>
                ))}
              </Row>
              <PaginationWrapper
                btnAndBorderColor={webSettingData?.buttoncolor}
                btnColor={webSettingData?.buttontextcolor}
              >
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttn"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                />
              </PaginationWrapper>
            </BlogWrapper>
          </Container>
        </>
      ) : (
        <>
          <SpinnerWrapper>
            <BlogWarning>There are no blog to show </BlogWarning>
          </SpinnerWrapper>
        </>
      )}
    </Layout>
  );
};

export default AllBlog;
