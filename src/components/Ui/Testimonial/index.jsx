import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import Container from "../../../bootstrap/Container/";
import SectionHeader from "../SectionHeader/";
import {
  Card,
  CardIcon,
  CompanyStatus,
  Descreption,
  ImageWrapper,
  Name,
  Person,
  PersonImg,
  ReadMoreBtn,
  StyledSlider,
  TestimonialCard,
} from "./Testimonial.styles.js";

const Testimonial = () => {
  const { webSettingData } = useSelector((state) => state.busLists);
  const [header, setHeader] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);

  const getTestimonialHeader = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_DOMAIN}/testiimonial`
    );
    const result = await response.json();
    setHeader(result.data[0]);
  };

  const getTestimonialContent = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_DOMAIN}/comments`
    );
    const result = await response.json();
    setTestimonialData(result?.data);
  };

  useEffect(() => {
    try {
      getTestimonialHeader();
      getTestimonialContent();
      return () => {
        setHeader({});
        setTestimonialData({});
      };
    } catch (error) {
      console.log("testmonial error", error);
    }
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    // autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <SectionHeader header={header.title} subHeader={header.sub_title} />
      <StyledSlider {...settings} bodercolor={webSettingData?.buttoncolor}>
        {testimonialData?.map((item) => (
          <Card key={item.id}>
            <TestimonialCard>
              <CardIcon
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 512 512"
                viewBox="0 0 512 512"
                style={{ fill: webSettingData?.buttoncolor }}
              >
                <path d="M334.125 256h78.125v62.5c0 34.473-28.027 62.5-62.5 62.5h-7.812c-12.988 0-23.438 10.449-23.438 23.438v46.875c0 12.988 10.449 23.438 23.438 23.438h7.812c86.328 0 156.25-69.922 156.25-156.25V84.125c0-25.879-20.996-46.875-46.875-46.875h-125c-25.879 0-46.875 20.996-46.875 46.875v125C287.25 235.004 308.246 256 334.125 256zM52.875 256H131v62.5c0 34.473-28.027 62.5-62.5 62.5h-7.812c-12.988 0-23.438 10.449-23.438 23.438v46.875c0 12.988 10.449 23.438 23.438 23.438H68.5c86.328 0 156.25-69.922 156.25-156.25V84.125c0-25.879-20.996-46.875-46.875-46.875h-125C26.996 37.25 6 58.246 6 84.125v125C6 235.004 26.996 256 52.875 256z" />
              </CardIcon>

              <Descreption str={item?.description} number="80" />
              <Person>
                <ImageWrapper>
                  <PersonImg src={item?.image} alt="persons img" />
                </ImageWrapper>
                <div>
                  <Name>{item?.person_name}</Name>
                  <CompanyStatus>{item?.person_detail}</CompanyStatus>
                </div>

                <ReadMoreBtn
                  to={`/single-testimonial/${item?.id}`}
                  btnbgcolor={webSettingData?.buttoncolor}
                  btnbghvcolor={webSettingData?.buttoncolorhover}
                  btntextcolor={webSettingData?.buttontextcolor}
                >
                  Read More
                </ReadMoreBtn>
              </Person>
            </TestimonialCard>
          </Card>
        ))}
      </StyledSlider>
    </Container>
  );
};

export default Testimonial;
