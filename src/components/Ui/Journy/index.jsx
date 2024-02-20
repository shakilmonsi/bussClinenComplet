import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import Container from "../../../bootstrap/Container";
import { dateForm } from "../../../helpers";
import { tripSettings } from "../../../lib/settings";
import {
  addBusName,
  SearchInfoStore,
} from "../../../redux/action/busAction.js";
import SectionHeader from "../SectionHeader/";
import {
  BookingBtn,
  Image,
  InnerJournyCard,
  Location,
  PhotoAndLocation,
  Price,
  SliderWrapper,
  StyledSlider,
  Text,
  Trip,
} from "./Journy.styles.js";

const Journy = () => {
  const { webSettingData,languageData } = useSelector((state) => state.busLists);
  const [journyHeader, setJournyHeader] = useState([]);
  const [journyData, setJournyData] = useState([]);
  const [locationName, setLocationName] = useState([]);
  // const [languageData, setLanguageData] = useState();

  const [journyStartDate, setJournyStartDate] = useState(new window.Date());
  const history = useHistory();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);

  const getJourneyHeader = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_DOMAIN}/journey`
      );
      const result = await response.json();

      if (result.status === "success") {
        setJournyHeader(result.data[0]);
      }
    } catch (error) {
      console.error("Journey error", error);
    }
  };

  const getJourneyContent = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_DOMAIN}/journey/trips`
      );
      const result = await response.json();

      if (result.status === "success") {
        setJournyData(result.data);
      }
    } catch (error) {
      console.error("Trips error", error);
    }
  };

  const getLocation = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_MODULE_DOMAIN}/locations`
      );
      const result = await response.json();

      if (result.status === "success") {
        setLocationName(result?.data);
      }
    } catch (error) {
      console.error("Location error", error);
    }
  };

  useEffect(() => {
    getJourneyHeader();
    getJourneyContent();
    getLocation();

    return () => {
      setJournyHeader({});
      setJournyData({});
      setLocationName({});
    };
  }, []);

  const showLatestTrip = (pickId, dropId) => {
    const pickLocaiton = locationName.find((item) => item.id === pickId);
    const dropLocaiton = locationName.find((item) => item.id === dropId);
    return `${pickLocaiton?.name} - ${dropLocaiton?.name}`;
  };

  const handleBooking = async (item) => {
    //  scroll disable
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };

    const formData = new FormData();

    formData.append("pick_location_id", item?.pick_location_id);
    formData.append("drop_location_id", item?.drop_location_id);
    formData.append("journeydate", dateForm(journyStartDate));

    const searchInfo = {
      pickLocation: item?.pick_location_id,
      dropLocation: item?.drop_location_id,
      journeydate: dateForm(journyStartDate),
      returnDate: "",
    };
    dispatch(SearchInfoStore(searchInfo));
    localStorage.setItem("searchInfo", JSON.stringify(searchInfo));

    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/triplist`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    if (result.status === "success") {
      dispatch(addBusName(result.data));
      // scrool enable
      window.onscroll = function () {};
      history.push("/booking");
    } else {
      toast.error(result?.message);
    }
  };

  return (
    <SliderWrapper>
      <Container>
        <SectionHeader
          header={journyHeader.title}
          subHeader={journyHeader.sub_title}
        />
        <StyledSlider {...tripSettings}>
          {journyData?.map((item) => (
            <div md="3" key={item.id}>
              <InnerJournyCard>
                <PhotoAndLocation>
                  <Image img={item.imglocation} />
                  <Location>
                    {showLatestTrip(
                      item.pick_location_id,
                      item.drop_location_id
                    )}
                  </Location>
                </PhotoAndLocation>
                <Text>
                  <div>
                    <Trip>One Trip</Trip>
                    <Price textcolor={webSettingData?.buttoncolor}>
                      {
                        languageData?.journey_page_booking_price[
                          webSettingData?.language
                        ]
                      }
                      : {webSettingData?.currency_code} {item.adult_fair}
                    </Price>
                  </div>
                  <BookingBtn
                    to=""
                    onClick={() => handleBooking(item)}
                    btnbgcolor={webSettingData?.buttoncolor}
                    btnbghvcolor={webSettingData?.buttoncolorhover}
                    btntextcolor={webSettingData?.buttontextcolor}
                  >
                    {
                      languageData?.journey_page_booking_btn[
                        webSettingData?.language
                      ]
                    }
                  </BookingBtn>
                </Text>
              </InnerJournyCard>
            </div>
          ))}
        </StyledSlider>
      </Container>
    </SliderWrapper>
  );
};

export default Journy;
