import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import Select from "react-select";
import { toast } from "react-toastify";
import exchangePhoto from "../../../assets/images/exchange.svg";
import { dateForm, getDropLocation, getPicLocation } from "../../../helpers.js";
import {
  addBusName,
  regularBookingInformation,
  SearchInfoStore,
  updateFareSummery,
} from "../../../redux/action/busAction.js";
import {
  BookingPageDate,
  BookingPageExchangePhoto,
  BookingPageInnerForm,
  BookingPageJourneyDate,
  BookingPageLocation,
  BookingPageReturnDate,
  BookingPageSearchBtn,
  Calendar,
  Date,
  DateText,
  ExchangePhoto,
  Form,
  InnerForm,
  JourneyDate,
  Location,
  ReturnDate,
  SearchBtn,
  SearchBtnArea,
  SearchLocation,
} from "./SearchFrom.styles.js";

const SearchForm = ({ locationRef, searchInfo, setFilterBus }) => {
  const { webSettingData, languageData } = useSelector(
    (state) => state.busLists
  );
  const [location, setLocation] = useState([]);
  const [journyStartDate, setJournyStartDate] = useState(new window.Date());
  const [journyReturnDate, setJournyReturnDate] = useState("");
  const history = useHistory();
  const isHome = history?.location?.pathname !== "/";
  const dispatch = useDispatch();

  const reloadSubmit = async (info) => {
    const formData = new FormData();

    formData.append("pick_location_id", info?.pickLocation);
    formData.append("drop_location_id", info?.dropLocation);
    formData.append("journeydate", dateForm(info?.journeydate));
    if (info?.returnDate === "NaN-NaN-NaN") {
      formData.append("returnDate", "");
    } else {
      formData.append("returnDate", dateForm(info?.returnDate));
    }

    const searchInfo = {
      pickLocation: info?.pickLocation,
      dropLocation: info?.dropLocation,
      journeydate: dateForm(journyStartDate),
      returnDate: dateForm(journyReturnDate),
    };
    console.log(dateForm);
    dispatch(SearchInfoStore(searchInfo));

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
      setFilterBus(result.data);
      // history.push("/booking");
    } else {
      dispatch(addBusName(null));
      // toast.error(`${result?.message}`);
    }
  };

  useEffect(() => {
    if (searchInfo?.journeydate) {
      setJournyStartDate(new window.Date(searchInfo?.journeydate));
    }

    if (searchInfo?.returnDate === "NaN-NaN-NaN") {
    } else if (searchInfo?.returnDate) {
      setJournyReturnDate(new window.Date(searchInfo?.returnDate));
    }

    if (searchInfo) {
      reloadSubmit(searchInfo);
      // console.log("searchInfo :- ", searchInfo);
    }
  }, []);

  const cursorStyles = {
    option: (styles) => {
      return {
        ...styles,
        cursor: "pointer",
      };
    },
  };

  const locationData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/locations`
    );
    const result = await response.json();
    setLocation(result.data);

    let locations = [];

    result?.data?.map((item) =>
      locations.push({
        value: item?.name,
        label: item?.name,
        id: item?.id,
      })
    );

    // console.log("locations :---> ", locations);
    setPickLocation(locations);
    setDropLocation(locations);
  };
  let locations = [];

  if (Array.isArray(location)) {
    location.forEach((item) => {
      locations.push({
        value: item?.name,
        label: item?.name,
        id: item?.id,
      });
    });
  } else {
    console.error("location is not an array:", location);
  }

  const [values, setValues] = useState({
    drop_location: searchInfo?.dropLocation,
    pick_location: searchInfo?.pickLocation,
  });

  const [pickLocation, setPickLocation] = useState([]);
  const [dropLocation, setDropLocation] = useState([]);

  useEffect(() => {
    setValues({
      ...values,
      drop_location: searchInfo?.dropLocation,
      pick_location: searchInfo?.pickLocation,
    });
  }, [searchInfo]);

  useEffect(() => {
    try {
      locationData();
      return () => {
        setLocation({});
      };
    } catch (error) {
      console.log("searchForm error", error);
    }
  }, []);

  const handleBoardingChange = (selectOption) => {
    setValues({ ...values, pick_location: selectOption.id });

    const searchData = {
      dropLocation: searchInfo?.dropLocation,
      journeydate: searchInfo?.journeydate,
      pickLocation: selectOption.id,
      returnDate: searchInfo?.returnDate,
    };

    localStorage.setItem("searchInfo", JSON.stringify(searchData));

    let updateLoc = [];
    for (var i = 0; i < location.length; i++) {
      if (selectOption.id == location[i]?.id) {
      } else {
        updateLoc.push({
          value: location[i]?.name,
          label: location[i]?.name,
          id: location[i]?.id,
        });
      }
    }
    setDropLocation(updateLoc);
  };

  const handleDroppingChange = (selectOption) => {
    setValues({ ...values, drop_location: selectOption.id });

    const searchData = {
      dropLocation: selectOption.id,
      journeydate: searchInfo?.journeydate,
      pickLocation: searchInfo?.pickLocation,
      returnDate: searchInfo?.returnDate,
    };

    localStorage.setItem("searchInfo", JSON.stringify(searchData));

    let updateLoc = [];
    for (var i = 0; i < location.length; i++) {
      if (selectOption.id == location[i]?.id) {
      } else {
        updateLoc.push({
          value: location[i]?.name,
          label: location[i]?.name,
          id: location[i]?.id,
        });
      }
    }
    setPickLocation(updateLoc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove all old localstoreage data
    dispatch(regularBookingInformation(" "));
    dispatch(updateFareSummery(null));
    localStorage.removeItem("bookingInfo");
    localStorage.removeItem("searchInfo");
    localStorage.removeItem("returnFirstJourneyInfo");
    localStorage.removeItem("journeyInfo");

    localStorage.removeItem("discount");
    localStorage.removeItem("regular");
    localStorage.removeItem("return");
    localStorage.removeItem("bookingInfoTax");
    localStorage.removeItem("journeyInfoTax");
    localStorage.removeItem("subtripId");
    localStorage.removeItem("passengerInformation");

    // localStorage.clear();

    const formData = new FormData();
    const pickLocation = location.find(
      (item) => item.id === values.pick_location
    );
    const dropLocation = location.find(
      (item) => item.id === values.drop_location
    );

    if (!pickLocation?.id && !dropLocation?.id) {
      toast.error(
        "Please select your pick up point and Please select your destination"
      );
      return;
    } else if (pickLocation?.id === dropLocation?.id) {
      toast.error("Boarding point and destination must not be the same");
      return;
    } else if (!pickLocation?.id) {
      toast.error("Please select your pick up point");
      return;
    } else if (!dropLocation?.id) {
      toast.error("Please select your destination");
      return;
    } else if (!journyStartDate) {
      toast.error("Please select your journey date");
      return;
    }

    formData.append("pick_location_id", pickLocation?.id);
    formData.append("drop_location_id", dropLocation?.id);
    formData.append("journeydate", dateForm(journyStartDate));

    const searchInfo = {
      pickLocation: pickLocation?.id,
      dropLocation: dropLocation?.id,
      journeydate: dateForm(journyStartDate),
      returnDate: dateForm(journyReturnDate),
    };
    dispatch(SearchInfoStore(searchInfo));
    localStorage.setItem("searchInfo", JSON.stringify(searchInfo));

    if (searchInfo?.journeydate === searchInfo?.returnDate) {
      toast.error("journey date and return date must not be the same");
      return;
    }

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

      setFilterBus(result.data);
      history.push("/booking");
    } else {
      dispatch(addBusName(null));

      toast.error(`${result?.message}`);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {!isHome ? (
          // for home page
          <>
            <ExchangePhoto
              headercolor={webSettingData?.buttoncolor}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </ExchangePhoto>
            <InnerForm>
              <Location>
                <SearchLocation
                  styles={cursorStyles}
                  placeholder={
                    languageData?.search_form_from_input[
                      webSettingData?.language
                    ]
                  }
                  options={pickLocation}
                  value={pickLocation[getPicLocation(pickLocation, values)]}
                  onChange={handleBoardingChange}
                  ref={locationRef}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                />
                <SearchLocation
                  styles={cursorStyles}
                  placeholder={
                    languageData?.search_form_to_input[webSettingData?.language]
                  }
                  options={dropLocation}
                  value={dropLocation[getDropLocation(dropLocation, values)]}
                  onChange={handleDroppingChange}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                />
              </Location>

              <Date>
                <JourneyDate>
                  <DateText>
                    {
                      languageData?.search_form_start_date[
                        webSettingData?.language
                      ]
                    }
                  </DateText>
                  <Calendar
                    onChange={setJournyStartDate}
                    value={journyStartDate}
                    clearIcon={null}
                    dateFormat="MM/dd/yyyy"
                    minDate={moment().toDate()}
                  />
                </JourneyDate>
                <ReturnDate>
                  <DateText>
                    {
                      languageData?.search_form_retrurn_date[
                        webSettingData?.language
                      ]
                    }
                  </DateText>
                  <Calendar
                    onChange={setJournyReturnDate}
                    valueDefault={journyStartDate}
                    value={journyReturnDate}
                    clearIcon={null}
                    dateFormat="MM/dd/yyyy"
                    minDate={journyStartDate}
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                  />
                </ReturnDate>
              </Date>
            </InnerForm>
            <SearchBtnArea>
              <SearchBtn
                searchbtnbgcolor={webSettingData?.buttoncolor}
                searchbtnbghvcolor={webSettingData?.buttoncolorhover}
                btntextcolor={webSettingData?.buttontextcolor}
                type="submit"
              >
                {languageData?.search_form_button[webSettingData?.language]}
              </SearchBtn>
            </SearchBtnArea>
          </>
        ) : (
          <div>
            {/* for booking page */}
            <BookingPageExchangePhoto src={exchangePhoto} alt="exchangePhoto" />
            <BookingPageInnerForm>
              <BookingPageLocation>
                <SearchLocation
                  styles={cursorStyles}
                  placeholder={
                    languageData?.search_form_from_input[
                      webSettingData?.language
                    ]
                  }
                  options={pickLocation}
                  value={pickLocation[getPicLocation(pickLocation, values)]}
                  onChange={handleBoardingChange}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                />
                <SearchLocation
                  styles={cursorStyles}
                  placeholder={
                    languageData?.search_form_to_input[webSettingData?.language]
                  }
                  options={dropLocation}
                  value={dropLocation[getDropLocation(dropLocation, values)]}
                  onChange={handleDroppingChange}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                />
              </BookingPageLocation>

              <BookingPageDate>
                <BookingPageJourneyDate>
                  <DateText>Depart</DateText>
                  <Calendar
                    onChange={setJournyStartDate}
                    value={journyStartDate}
                    clearIcon={null}
                    dateFormat="MM/dd/yyyy"
                    minDate={moment().toDate()}
                  />
                </BookingPageJourneyDate>
                <BookingPageReturnDate>
                  <DateText>Return (Optional)</DateText>
                  <Calendar
                    onChange={setJournyReturnDate}
                    value={journyReturnDate}
                    clearIcon={null}
                    dateFormat="MM/dd/yyyy"
                    minDate={journyStartDate}
                    valueDefault={null}
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                  />
                  
                </BookingPageReturnDate>
              </BookingPageDate>

              <BookingPageSearchBtn
                searchbtnbgcolor={webSettingData?.buttoncolor}
                searchbtnbghvcolor={webSettingData?.buttoncolorhover}
                btntextcolor={webSettingData?.buttontextcolor}
                type="submit"
              >
                {
                  languageData?.search_form_button_booking_page[
                    webSettingData?.language
                  ]
                }
              </BookingPageSearchBtn>
            </BookingPageInnerForm>
          </div>
        )}
      </Form>
    </>
  );
};

export default SearchForm;
