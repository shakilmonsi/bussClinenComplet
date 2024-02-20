import styled from "styled-components";
import Card from "../../components/Ui/Card";

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
`;
export const BlogPageHeaderWrapper = styled.div`
  background: #172839;
  color: white;
  text-align: center;
  padding: 20px 0px;
  h2 {
    margin: 0;
    font-size: 35px;
  }
  p {
    margin: 0;
  }
`;
export const BlogWrapper = styled.div`
  padding: 50px 0px;
  margin: -10px;
  @media (max-width: 922px) {
    padding: 50px 0px;
  }
`;
export const InnerBlogCard = styled.div`
  margin: 10px;
`;
export const SingleCard = styled(Card)`
  img {
    border-radius: 10px 10px 0px 0px;
  }
`;
export const PaginationWrapper = styled.div`
  .paginationBttn {
    list-style: none;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    padding-top: 20px;
  }
  .paginationBttn a {
    padding: 3px 10px;
    border: 1px solid ${(props) => props?.btnAndBorderColor};
    margin-right: 10px;
    border-radius: 5px;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      color: ${(props) => props?.btnColor};
      background: ${(props) => props?.btnAndBorderColor};
    }
  }
`;
export const BlogPageTitle = styled.h2`
  text-transform: capitalize;
`;
export const BlogPageSubTitle = styled.p`
  text-transform: capitalize;
`;
export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 360px);
  width: 100%;
`;
export const BlogWarning = styled.h2`
  text-align: center;
  font-size: 20px;
  margin: 20px 0px;
  color: #172839;
`;
