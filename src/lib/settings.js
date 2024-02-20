import nextIcon from "../assets/images/next.svg";
import { NextArrow, PrevArrow } from "../components/Ui/Arrow";

export const tripSettings = {
  lazyLoad: true,
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  initialSlide: 0,
  slidesToScroll: 1,
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
