/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Container from "../../bootstrap/Container";
import Layout from "../../bootstrap/Layout";
import Spinner from "../../bootstrap/Spinner/index";
import BusName from "../../components/Ui/BusNames/BusName";
import MobileBusName from "../../components/Ui/BusNames/MobileBusName/index.jsx";
import SearchFrom from "../../components/Ui/SearchFrom";
import SideBar from "../../components/Ui/SideBar";
import {
  convertTime12to24,
  getMaxValue,
  getMinValue,
  isRegurnDateValid,
  toUpperFirst,
} from "../../helpers";
// import languageData from "../../lib/lang.config.json";
import {
  BookingBody,
  CardHeaderList,
  CardHeaderListUl,
  Date,
  Depature,
  ErrorMsg,
  HeroComponent,
  HeroWrapper,
  InnerContainer,
  Location,
  LocationAndDate,
  NotFound,
  PageLoaderContainer,
  RightSide,
  SearchFormWrapper,
  TripHeader,
  TripHeaderLeft,
  TripHeaderRight,
} from "./Booking.styles.js";

const Booking = () => {
  const { webSettingData, busLists, error, searchInfoStore, languageData } =
    useSelector((state) => state.busLists);

  const [pageLoader, setPageLoader] = useState(true);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [busTypes, setBusTypes] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState([]);
  const [width, setWidth] = useState();
  const [rangeValue, setRangeValue] = useState({
    min: 300,
    max: 3000,
  });
  const [commomArray, setCommomArray] = useState([]);
  const [arrivalDuration, setArrivalDuration] = useState([]);
  const [departureDuration, setDepartureDuration] = useState([]);
  const [location, setLocation] = useState([]);
  const [fleet, setFleet] = useState([]);
  const [searchInfo, setSearchInfo] = useState({
    pick_location: "",
    drop_location: "",
  });
  const [busTypesArray, setBusTypesArray] = useState([]);

  const [departureArray, setDepartureArray] = useState([]);
  const [arrivalArray, setArrivalArray] = useState([]);
  const [selectedCommonArray, setSelectedCommonArray] = useState([]);
  const [priceRange, setPriceRange] = useState(null);
  const [filterPriceRange, setFilterPriceRange] = useState(null);
  const history = useHistory();
  // const [languageData, setLanguageData] = useState();

  const newFilterBus = busLists?.filter(
    (item, index) =>
      item?.adult_fair >= rangeValue.min && item?.adult_fair <= rangeValue.max
  );

  const [filterBus, setFilterBus] = useState(newFilterBus);

  useEffect(() => {
    if (width > 768) {
      setFilterBus(newFilterBus);
    }

    setTimeout(() => {
      setPageLoader(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setCommomArray([...busTypesArray, ...departureArray, ...arrivalArray]);
  }, [busTypesArray, departureArray, arrivalArray]);

  useEffect(() => {
    function getUnique(array) {
      var uniqueArray = [];

      // Loop through array values
      for (let i = 0; i < array.length; i++) {
        if (uniqueArray.indexOf(array[i]) === -1) {
          uniqueArray.push(array[i]);
        }
      }
      return uniqueArray;
    }

    setSelectedCommonArray(getUnique(commomArray));
  }, [commomArray]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/frontend/fleets`)
      .then((res) => res.json())
      .then((data) => setFleet(data.data));
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);

  useEffect(() => {
    if (busLists === undefined || busLists?.length > 0) {
      setLoading(false);
    }

    setSearchInfo(JSON.parse(localStorage.getItem("searchInfo")));

    if (
      getMaxValue(busLists) !== undefined &&
      getMinValue(busLists) !== undefined
    ) {
      setRangeValue((Prevstate) => ({
        min: Prevstate?.min,
        max: Prevstate?.max,
      }));
    }
  }, [busLists]);

  useEffect(() => {
    function priceFilter(array, rangeValue) {
      var uniqueArray = [];

      // Loop through array values
      for (let i = 0; i < array?.length; i++) {
        if (
          rangeValue?.min <= array[i]?.adult_fair &&
          rangeValue?.max >= array[i]?.adult_fair
        ) {
          uniqueArray.push(array[i]);
        } else {
          uniqueArray.push([]);
        }
      }
      return uniqueArray;
    }

    setPriceRange(priceFilter(busLists, rangeValue));
  }, []);

  useEffect(() => {
    function selectedPriceFilter(array, rangeValue) {
      var uniqueArray = [];
      // Loop through array values
      for (let i = 0; i < array?.length; i++) {
        if (
          rangeValue?.min <= array[i]?.adult_fair &&
          rangeValue?.max >= array[i]?.adult_fair
        ) {
          uniqueArray.push(array[i]);
        }
      }
      return uniqueArray;
    }

    if (width > 768) {
      setFilterPriceRange(selectedPriceFilter(newFilterBus, rangeValue));
      setFilterBus(selectedPriceFilter(newFilterBus, rangeValue));
    }
  }, [rangeValue, selectedCommonArray]);

  const getFilteredBusLists = (Types) => {
    let newBusLists = [];

    if (Types.length > 0) {
      newBusLists = busLists?.filter((bus) => {
        return (
          bus.fleet_id === Types[0] ||
          bus.fleet_id === Types[1] ||
          bus.fleet_id === Types[2] ||
          bus.fleet_id === Types[3] ||
          bus.fleet_id === Types[4] ||
          bus.fleet_id === Types[5]
        );
      });
      // console.log("newBusLists :-", newBusLists);
      setFilterBus(newBusLists);
    }

    if (departureDuration.length > 0) {
      newBusLists = busLists?.filter((bus) => {
        return (newBusLists =
          convertTime12to24(bus.start_time) >= departureDuration[0]?.start &&
          convertTime12to24(bus.start_time) <= departureDuration[0]?.end);
      });
      setFilterBus(newBusLists);
    }
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/hero`)
      .then((res) => res.json())
      .then((data) => {
        setHeroData(data.data[0]);
      });

    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/locations`)
      .then((res) => res.json())
      .then((data) => {
        setLocation(data.data);
      });
  }, []);

  const handleCheckout = () => {
    history.push("/checkout");
  };

  const getLocationName = (id) => {
    const locationName = location.find((item) => item.id === id);
    return toUpperFirst(locationName?.name);
  };
  return (
    <div>
      {pageLoader && (
        <PageLoaderContainer>
          <Spinner></Spinner>
        </PageLoaderContainer>
      )}
      {!pageLoader && (
        <Layout title="Booking" userProfileInfo={userProfileInfo}>
          {/* start hero section */}
          <HeroWrapper>
            <HeroComponent img={heroData?.image} />
            <SearchFormWrapper>
              <SearchFrom searchInfo={searchInfo} setFilterBus={setFilterBus} />
            </SearchFormWrapper>
          </HeroWrapper>
          {/* end hero section */}

          {/* start card section */}
          {/* {busLists?.length <= 0 ? (
            <div>
              <Spinner></Spinner>
            </div>
          ) : (
          )} */}

          <Container>
            <InnerContainer>
              {error ? (
                <>
                  <h4 style={{ textAlign: "center" }}>{error.message}</h4>
                  <p>
                    Please search again to get your desired trip or you may {}
                    <Link to="/checkout">checkout</Link>
                  </p>
                </>
              ) : (
                <>
                  {width <= 768 ? (
                    <div>
                      {filterBus?.length &&
                        filterBus?.map((item, index) => (
                          <MobileBusName
                            tripData={item}
                            key={item.id}
                            fleet={fleet}
                          />
                        ))}
                    </div>
                  ) : (
                    <>
                      <>
                        <TripHeader>
                          <TripHeaderLeft>
                            <Depature>
                              {
                                languageData?.booking_page_departure_title[
                                  webSettingData?.language
                                ]
                              }
                            </Depature>
                            <LocationAndDate>
                              <Location>
                                {getLocationName(searchInfoStore?.pickLocation)}{" "}
                                -{" "}
                                {getLocationName(searchInfoStore?.dropLocation)}
                              </Location>
                              <Date>{searchInfoStore?.journeydate}</Date>
                            </LocationAndDate>
                          </TripHeaderLeft>

                          {!isRegurnDateValid(searchInfoStore?.returnDate) &&
                            moment(searchInfoStore?.journeydate).isBefore(
                              searchInfoStore?.returnDate
                            ) && (
                              <TripHeaderRight>
                                <Depature>
                                  {
                                    languageData?.booking_page_return_title[
                                      webSettingData?.language
                                    ]
                                  }
                                </Depature>
                                <LocationAndDate>
                                  <Location>
                                    {getLocationName(
                                      searchInfoStore?.dropLocation
                                    )}
                                    -
                                    {getLocationName(
                                      searchInfoStore?.pickLocation
                                    )}
                                  </Location>
                                  <Date>{searchInfoStore?.returnDate}</Date>
                                </LocationAndDate>
                              </TripHeaderRight>
                            )}
                        </TripHeader>

                        <BookingBody>
                          <SideBar
                            rangeValue={rangeValue}
                            setRangeValue={setRangeValue}
                            filterBus={filterBus}
                            commomArray={commomArray}
                            setCommomArray={setCommomArray}
                            arrivalDuration={arrivalDuration}
                            setArrivalDuration={setArrivalDuration}
                            departureDuration={departureDuration}
                            setDepartureDuration={setDepartureDuration}
                            busTypes={busTypes}
                            setBusTypes={setBusTypes}
                            getFilteredBusLists={getFilteredBusLists}
                            fleet={fleet}
                            busTypesArray={busTypesArray}
                            setBusTypesArray={setBusTypesArray}
                            departureArray={departureArray}
                            setDepartureArray={setDepartureArray}
                            arrivalArray={arrivalArray}
                            setArrivalArray={setArrivalArray}
                          />

                          <RightSide>
                            <CardHeaderListUl>
                              <CardHeaderList>
                                {filterBus?.length ? (
                                  <strong>
                                    {filterBus.length}{" "}
                                    {
                                      languageData
                                        ?.booking_page_card_title_buses_found[
                                        webSettingData?.language
                                      ]
                                    }
                                  </strong>
                                ) : (
                                  <strong> 0 Bus found</strong>
                                )}
                              </CardHeaderList>
                              <CardHeaderList>
                                {
                                  languageData
                                    ?.booking_page_card_title_departure[
                                    webSettingData?.language
                                  ]
                                }
                              </CardHeaderList>
                              <CardHeaderList>
                                {
                                  languageData
                                    ?.booking_page_card_title_duration[
                                    webSettingData?.language
                                  ]
                                }
                              </CardHeaderList>
                              <CardHeaderList>
                                {
                                  languageData
                                    ?.booking_page_card_title_arraival[
                                    webSettingData?.language
                                  ]
                                }
                              </CardHeaderList>
                              <CardHeaderList>
                                {
                                  languageData?.booking_page_card_title_ratings[
                                    webSettingData?.language
                                  ]
                                }
                              </CardHeaderList>
                              <CardHeaderList>
                                {
                                  languageData?.booking_page_card_title_fare[
                                    webSettingData?.language
                                  ]
                                }
                              </CardHeaderList>
                              {/* <CardHeaderList>
                                {
                                  languageData
                                    ?.booking_page_card_title_distance[
                                    webSettingData?.language
                                  ]
                                }
                              </CardHeaderList> */}
                              <CardHeaderList>
                                {
                                  languageData
                                    ?.booking_page_card_title_seat_available[
                                    webSettingData?.language
                                  ]
                                }
                              </CardHeaderList>
                            </CardHeaderListUl>

                            {arrivalDuration.length > 0 &&
                            departureDuration.length > 0 &&
                            busTypes?.length > 0 ? (
                              <>
                                {selectedCommonArray?.length >= 0 ? (
                                  <NotFound>Result Not Found</NotFound>
                                ) : (
                                  <>
                                    <>
                                      {filterPriceRange?.map((item, index) => (
                                        <BusName
                                          tripData={item}
                                          key={index}
                                          fleet={fleet}
                                        />
                                      ))}
                                    </>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {filterBus?.length > 0 ? (
                                  <>
                                    {filterBus?.map((item, index) => (
                                      <BusName
                                        tripData={item}
                                        key={item.id}
                                        fleet={fleet}
                                      />
                                    ))}
                                  </>
                                ) : (
                                  <>
                                    {priceRange.length >= 0 ? (
                                      <>
                                        <NotFound>Result Not Found</NotFound>
                                      </>
                                    ) : (
                                      <>
                                        {priceRange?.map((item, index) => (
                                          <BusName
                                            tripData={item}
                                            key={item.id}
                                            fleet={fleet}
                                          />
                                        ))}
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}

                            {/* arrivalDuration,       
         departureDuration,             
         busTypes, */}

                            {/* {filterBus?.map((item) => (
           <BusName tripData={item} key={item.id} />
         ))} */}
                          </RightSide>
                        </BookingBody>
                      </>
                      {isLoading ? (
                        <Spinner />
                      ) : filterBus?.length > 0 ? (
                        <></>
                      ) : (
                        <>
                          {/* <div
                            style={{
                              margin: "auto",
                              width: "100%",
                              padding: "50px",
                            }}
                          >
                            <Spinner />
                          </div> */}

                          {/* <ErrorMsg>
                              Sorry no bus found with your search. Please search  again
                            </ErrorMsg> */}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </InnerContainer>
          </Container>

          {/* end card section */}
        </Layout>
      )}
    </div>
  );
};

export default Booking;
