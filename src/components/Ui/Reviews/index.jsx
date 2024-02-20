import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getReveiw } from "../../../redux/action/busAction.js";
import SingleReview from "../SingleReview/index.jsx";
import {
  Container,
  ReveiwRow,
  ViewMoreButton,
  ViewMoreButtonWrapper,
} from "./Reviews.styles.js";

const Reviews = ({ id, webSettingData }) => {
  const [reveiws, setReveiws] = useState(null);
  const dispatch = useDispatch();

  const getReviewData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/ratings/getall/review/${id}`
    );
    const result = await response.json();
    if (result?.status === "success") {
      setReveiws(result?.data.reverse());
      dispatch(getReveiw(result?.data));
    } else {
      toast.error(result?.message);
    }
  };

  useEffect(() => {
    try {
      getReviewData();
    } catch (error) {
      console.log("reviews", error);
    }
  }, [id]);

  return (
    <>
      {reveiws ? (
        <>
          <Container>
            <ReveiwRow>
              {reveiws?.slice(0, 4)?.map((item) => (
                <SingleReview item={item} key={item?.id} />
              ))}
            </ReveiwRow>
            <ViewMoreButtonWrapper>
              <ViewMoreButton
                to="/all-review"
                btnbgcolor={webSettingData?.buttoncolor}
                btnbghvcolor={webSettingData?.buttoncolorhover}
                btntextcolor={webSettingData?.buttontextcolor}
              >
                view more
              </ViewMoreButton>
            </ViewMoreButtonWrapper>
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Reviews;
