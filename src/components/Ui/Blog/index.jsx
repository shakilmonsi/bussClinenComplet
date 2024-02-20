import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import nextIcon from "../../../assets/images/next.svg";
import Container from "../../../bootstrap/Container/";
import { NextArrow, PrevArrow } from "../Arrow/index.js";
import Card from "../Card/index.jsx";
import SectionHeader from "../SectionHeader/";
import { InnerBlogCard, StyledSlider, Wrapper } from "./Blog.styles.js";

const Blog = () => {
  const [header, setHeader] = useState([]);
  const [blogData, setBlogData] = useState([]);

  const getBlogHeader = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/cms`);
    const result = await response.json();
    setHeader(result?.data[0]);
  };

  const getBlogContent = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/blogs`);
    const result = await response.json();
    setBlogData(result?.data);
  };

  useEffect(() => {
    try {
      getBlogHeader();
      getBlogContent();
      return () => {
        setHeader({});
        setBlogData({});
      };
    } catch (error) {
      console.log("blog error", error);
    }
  }, []);


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrow: true,
    nextArrow: <NextArrow img={nextIcon} alt="Arrow icon" />,
    prevArrow: <PrevArrow img={nextIcon} alt="Arrow icon" />,

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
      <Wrapper id="blog">
        <SectionHeader header={header?.title} subHeader={header?.sub_title} />
        <StyledSlider {...settings}>
          {blogData?.map((item) => (
            <div key={item.id}>
              <InnerBlogCard>
                <Card
                  item={item}
                  headerLength="40"
                  descriptaionLength="60"
                  url={`/blog/details/${item?.id}`}
                  id={item?.id}
                />
              </InnerBlogCard>
            </div>
          ))}
        </StyledSlider>
      </Wrapper>
    </Container>
  );
};

export default Blog;
