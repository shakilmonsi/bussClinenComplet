import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { busType } from "../../../../helpers";
import BookingPolicies from "../../BookingPolicies";
import BusPhoto from "../../BusPhoto/BusPhoto.jsx";
import BusSeat from "../../BusSeat/index.jsx";
import Reviews from "../../Reviews/";
import {
  BookingBtn,
  BusDetailsLink,
  BusDetailsLinkWrapper,
  CardWrapper,
  InnerHeader,
  InnerRow,
  InnerRowLeft,
  InnerRowright,
  SingleCard,
  SingleList,
} from "./BusName.styles.js";

const BusName = ({ tripData, fleet }) => {
  const { webSettingData,languageData } = useSelector((state) => state.busLists);
  const [location, setLocation] = useState([]);
  const [singleBusPhoto, setSinglePhoto] = useState([]);
  const [showBusPhoto, setShowBusPhoto] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showBookingPolicies, setShowBookingPolicies] = useState(false);
  const [showBusSeat, setShowBusSeat] = useState(false);
  // const [languageData, setLanguageData] = useState();

  const pickLocation = location.find(
    (item) => item?.id === tripData?.pick_location_id
  );
  const dropLocation = location.find(
    (item) => item?.id === tripData?.drop_location_id
  );

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/vehicles/${tripData.vehicle_id}`
    )
      .then((res) => res.json())
      .then((data) => setSinglePhoto(data.data));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/locations`)
      .then((res) => res.json())
      .then((data) => setLocation(data.data));
  }, []);
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);

  const showPhoto = () => {
    setShowBusPhoto((prevState) => !prevState);
    setShowReview(false);
    setShowBookingPolicies(false);
    setShowBusSeat(false);
  };

  const handleShowReview = () => {
    setShowReview((prevState) => !prevState);
    setShowBusPhoto(false);
    setShowBookingPolicies(false);
    setShowBusSeat(false);
  };
  const handleShowBookingPolicies = () => {
    setShowBookingPolicies((prevState) => !prevState);
    setShowReview(false);
    setShowBusPhoto(false);
    setShowBusSeat(false);
  };

  const showSeat = () => {
    setShowBusSeat((prevState) => !prevState);
    setShowBookingPolicies(false);
    setShowReview(false);
    setShowBusPhoto(false);

    // While show the seats
    const bookingInfo = {
      trip_id: tripData.trip_id,
      subtripId: tripData.subtripId,
      vehicle_id: tripData.vehicle_id,
      cseat: String(tripData.child_seat),
      spseat: String(tripData.special_seat),
    };

    localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
  };

  return (
    <CardWrapper>
      <SingleCard>
        <InnerHeader>
          <SingleList>
            <h5>{tripData?.company_name}</h5>
            <span>{busType(fleet, tripData?.fleet_id)}</span>
          </SingleList>
          <SingleList>
            <h5>{tripData?.start_time}</h5>
            <span>{pickLocation?.name}</span>
          </SingleList>
          <SingleList>
            <h5>{tripData?.journey_hour} Hour</h5>
          </SingleList>
          <SingleList>
            <h5>{tripData?.end_time}</h5>
            <span>{dropLocation?.name}</span>
          </SingleList>
          <SingleList>
            <h5>{tripData?.rating}</h5>
          </SingleList>
          <SingleList>
            <h5>
              {`${webSettingData?.currency_code} `}
              {tripData.adult_fair}
            </h5>
          </SingleList>
          <SingleList>
            <h5>
              {tripData?.available_seat}{" "}
              {
                languageData?.booking_page_card_title_seat_available[
                  webSettingData?.language
                ]
              }
            </h5>
            {/* <span>15 Windows</span> */}
          </SingleList>
        </InnerHeader>
        <InnerRow>
          <InnerRowLeft>
            <BusDetailsLinkWrapper>
              <BusDetailsLink
                onClick={showPhoto}
                btnhvcolor={webSettingData?.buttoncolor}
                btncolor={
                  showBusPhoto ? webSettingData?.buttoncolor : "undefined"
                }
              >
                {
                  languageData?.booking_page_card_bus_photos_btn[
                    webSettingData?.language
                  ]
                }
              </BusDetailsLink>
              <BusDetailsLink
                onClick={handleShowReview}
                btnhvcolor={webSettingData?.buttoncolor}
                btncolor={
                  showReview ? webSettingData?.buttoncolor : "undefined"
                }
              >
                {
                  languageData?.booking_page_card_reviews_btn[
                    webSettingData?.language
                  ]
                }
              </BusDetailsLink>
              <BusDetailsLink
                onClick={handleShowBookingPolicies}
                btnhvcolor={webSettingData?.buttoncolor}
                btncolor={
                  showBookingPolicies
                    ? webSettingData?.buttoncolor
                    : "undefined"
                }
              >
                {
                  languageData?.booking_page_card_booking_policies_btn[
                    webSettingData?.language
                  ]
                }
              </BusDetailsLink>
              <BusDetailsLink
                onClick={showSeat}
                btnhvcolor={webSettingData?.buttoncolor}
                btncolor={
                  showBusSeat ? webSettingData?.buttoncolor : "undefined"
                }
              >
                {
                  languageData?.booking_page_card_view_seats_btn[
                    webSettingData?.language
                  ]
                }
              </BusDetailsLink>
            </BusDetailsLinkWrapper>
          </InnerRowLeft>
          <InnerRowright>
            <BookingBtn
              onClick={showSeat}
              btnbgcolor={webSettingData?.buttoncolor}
              btnbghvcolor={webSettingData?.buttoncolorhover}
              btntextcolor={webSettingData?.buttontextcolor}
            >
              {
                languageData?.booking_page_card_book_btn[
                  webSettingData?.language
                ]
              }
            </BookingBtn>
          </InnerRowright>
        </InnerRow>
      </SingleCard>

      {showBusPhoto && <BusPhoto singleBusPhoto={singleBusPhoto.allimg} />}
      {showReview && (
        <Reviews id={tripData?.subtripId} webSettingData={webSettingData} />
      )}
      {showBookingPolicies && <BookingPolicies />}
      {showBusSeat && <BusSeat tripData={tripData} />}
    </CardWrapper>
  );
};

export default BusName;
