import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "../../bootstrap/Container";
import Layout from "../../bootstrap/Layout";
import SingleReview from "../../components/Ui/SingleReview";
import { GobackLink, LinkWrapper, Wrapper } from "./AllReview.styles";

const AllReview = () => {
  const { reveiws } = useSelector((state) => state.busLists);
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);

  return (
    <Layout title="Home" userProfileInfo={userProfileInfo}>
      <Container>
        {reveiws ? (
          <Wrapper>
            {reveiws?.map((item) => (
              <SingleReview item={item} key={item?.id} />
            ))}
          </Wrapper>
        ) : (
          <LinkWrapper>
            <GobackLink to="/booking"> please go back </GobackLink>
          </LinkWrapper>
        )}
      </Container>
    </Layout>
  );
};

export default AllReview;
