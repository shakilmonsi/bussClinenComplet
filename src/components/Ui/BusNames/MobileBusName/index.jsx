import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { busType } from "../../../../helpers.js";

import BusPhoto from "../../BusPhoto/BusPhoto.jsx";
import BusSeat from "../../BusSeat/index.jsx";
import Reviews from "../../Reviews/index.jsx";
import {
  BookNowBtn,
  JourneyTimeList,
  MobileCard,
  MobileCardFirstRow,
  MobileCardSecondRow,
  MobileCardThirdRow,
  MobileCardThirdRowListItem,
  MobileView,
  MobileViewTicketPrice,
} from "./MobileBusName.styles.js";

const MobileBusName = ({ tripData, fleet }) => {
  const { webSettingData,languageData } = useSelector((state) => state.busLists);
  const [location, setLocation] = useState([]);
  const [singleBusPhoto, setSinglePhoto] = useState([]);
  const [viewSeats, setViewSeats] = useState(false);
  const [reveiw, setReveiw] = useState(false);
  const [viewBusPhoto, setViewBusPhoto] = useState(false);
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
  
  const handleBusPhoto = () => {
    setViewBusPhoto((prevState) => !prevState);
    setViewSeats(false);
    setReveiw(false);
  };
  const handleReveiw = () => {
    setReveiw((prevState) => !prevState);
    setViewBusPhoto(false);
    setViewSeats(false);
  };

  const handleBooking = () => {
    setViewSeats((prevState) => !prevState);
    setViewBusPhoto(false);
    setReveiw(false);
  };

  return (
    <MobileView>
      <MobileCard>
        <MobileCardFirstRow>
          <div>
            <h4>{tripData?.company_name}</h4>
            <p>{busType(fleet, tripData?.fleet_id)}</p>
          </div>
          <MobileViewTicketPrice color={webSettingData?.buttoncolor}>
            {webSettingData?.currency_symbol}
            {tripData.adult_fair}
          </MobileViewTicketPrice>
        </MobileCardFirstRow>
        <MobileCardSecondRow>
          <JourneyTimeList>
            <h4>{tripData?.start_time}</h4>
            <p>{pickLocation?.name}</p>
          </JourneyTimeList>
          <JourneyTimeList>
            <h4>{tripData?.journey_hour} Hour</h4>
          </JourneyTimeList>
          <JourneyTimeList>
            <h4>{tripData?.end_time}</h4>
            <p>{dropLocation?.name}</p>
          </JourneyTimeList>
        </MobileCardSecondRow>
        <MobileCardThirdRow>
          <MobileCardThirdRowListItem>
            {tripData?.rating}
          </MobileCardThirdRowListItem>
          <MobileCardThirdRowListItem
            onClick={handleBusPhoto}
            btncolor={viewBusPhoto ? webSettingData?.buttoncolor : "undefined"}
          >
            {
              languageData?.booking_page_card_bus_photos_btn[
                webSettingData?.language
              ]
            }
          </MobileCardThirdRowListItem>
          <MobileCardThirdRowListItem
            onClick={handleReveiw}
            btncolor={reveiw ? webSettingData?.buttoncolor : "undefined"}
          >
            {
              languageData?.booking_page_card_reveiw_btn[
                webSettingData?.language
              ]
            }
          </MobileCardThirdRowListItem>
          <MobileCardThirdRowListItem>
            <BookNowBtn
              onClick={handleBooking}
              btnbgcolor={webSettingData?.buttoncolor}
            >
              {
                languageData?.mobile_booking_page_card_book_btn[
                  webSettingData?.language
                ]
              }
            </BookNowBtn>
          </MobileCardThirdRowListItem>
        </MobileCardThirdRow>
      </MobileCard>
      {viewSeats && <BusSeat tripData={tripData} />}
      {viewBusPhoto && <BusPhoto singleBusPhoto={singleBusPhoto.allimg} />}
      {reveiw && (
        <Reviews id={tripData?.subtripId} webSettingData={webSettingData} />
      )}
    </MobileView>
  );
};

export default MobileBusName;
