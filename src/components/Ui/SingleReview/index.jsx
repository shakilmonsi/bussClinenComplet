import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import {
  Comments,
  Date,
  ImgWrapper,
  LeftSide,
  RightSide,
  Wrapper,
} from "./SingleReview.styles";

const SingleReview = ({ item }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(Number(item?.rating) * 20);
  }, [item]);

  return (
    <Wrapper>
      <LeftSide>
        <ImgWrapper>
          <img src={item?.image} alt="user" />
        </ImgWrapper>
      </LeftSide>
      <RightSide>
        <h4>
          {item?.first_name} {item?.last_name}
        </h4>
        <Date>{item?.created_at}</Date>
        <Rating ratingValue={rating} size={20} />
        <Comments>{item?.comments}</Comments>
      </RightSide>
    </Wrapper>
  );
};

export default SingleReview;
