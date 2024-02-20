import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "../../bootstrap/Container";
import Layout from "../../bootstrap/Layout/";

import {
  PersonDetail,
  TestimonialDescription,
  TestimonialImage,
  TestimonialTitle,
  TestimonialWrapper,
} from "./SingleTestimonial.style";

const SingleTestimonials = () => {
  const [singleTest, setSingleTest] = useState([]);
  const { id } = useParams();
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setSingleTest(data.data));
  }, [id]);
  return (
    <Layout title={`comments ${id}`} userProfileInfo={userProfileInfo}>
      <Container>
        <TestimonialWrapper>
          <TestimonialImage src={singleTest?.image} alt="Testimonial Image" />
          <TestimonialTitle>{singleTest?.person_name}</TestimonialTitle>
          <PersonDetail>{singleTest?.person_detail}</PersonDetail>
          <TestimonialDescription
            dangerouslySetInnerHTML={{ __html: singleTest?.description }}
          ></TestimonialDescription>
        </TestimonialWrapper>
      </Container>
    </Layout>
  );
};

export default SingleTestimonials;
