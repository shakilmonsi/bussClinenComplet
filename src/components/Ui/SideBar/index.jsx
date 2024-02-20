import { useEffect, useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  compareTime,
  convertTime12to24,
  getMaxValue,
  getMinValue,
} from "../../../helpers";
import Advertisment from "../Advertisment";
import FareSummery from "../FareSummery";
import PromoCode from "../PromoCode";
import {
  Card,
  CheckBoxUl,
  CommonLabel,
  CommonNavItem,
  Container,
  Form,
  Header,
  InnerCard,
  Input,
  Range,
  RightWrapper,
  Text,
} from "./SideBar.styles.js";

const SideBar = ({
  rangeValue,
  setRangeValue,
  filterBus,
  commomArray,
  setCommomArray,
  arrivalDuration,
  setArrivalDuration,
  departureDuration,
  setDepartureDuration,
  busTypes,
  setBusTypes,
  getFilteredBusLists,
  fleet,
  discountValue,
  setDiscountValue,
  subTripid,
  setSubtripid,
  busTypesArray,
  setBusTypesArray,
  departureArray,
  setDepartureArray,
  arrivalArray,
  setArrivalArray,
}) => {
  const { webSettingData, busLists, languageData } = useSelector(
    (state) => state.busLists
  );
  const [departure, setDeparture] = useState([]);
  const [arrival, setArrival] = useState([]);
  const [advertisment, setAdvertisment] = useState(null);
  // const [languageData, setLanguageData] = useState();

  const history = useHistory();
  const isBooking = history.location.pathname === "/booking";

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/adds`)
      .then((res) => res.json())
      .then((result) => setAdvertisment(result?.data));

    if (
      getMaxValue(busLists) !== undefined &&
      getMinValue(busLists) !== undefined &&
      typeof setRangeValue === "function"
    ) {
      setRangeValue({
        min: Number(getMinValue(busLists)),
        max: Number(getMaxValue(busLists)),
      });
    }
  }, [busLists, setRangeValue]);

  const bookingAdvertisement = advertisment?.find(
    (item) => item?.pagename === "ticket"
  );
  const checkoutAdvertisement = advertisment?.find(
    (item) => item?.pagename === "checkout"
  );

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/filters/departures`)
      .then((res) => res.json())
      .then((data) => {
        setDeparture(data.data);
      });

    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/filters/arrivals`)
      .then((res) => res.json())
      .then((data) => setArrival(data.data));
  }, []);

  const handleBusTypeChange = (e) => {
    const value = e.target.id;
    if (e.target.checked === true) {
      setBusTypes([...busTypes, value]);
      // console.log("busTypes :-", [...busTypes, value]);
      getFilteredBusLists([...busTypes, value]);
    } else if (e.target.checked === false) {
      const newList = busTypes.filter((item) => item !== value);
      setBusTypes(newList);
      getFilteredBusLists(newList);
    }
  };

  const handleDepartureChange = (e) => {
    const isChecked = e.target.value.split("-");
    if (e.target.checked === true) {
      setDepartureDuration([
        ...departureDuration,
        {
          start: convertTime12to24(isChecked[0]),
          end: convertTime12to24(isChecked[1]),
        },
      ]);
    } else if (e.target.checked === false) {
      const newList = departureDuration.filter(
        (item) =>
          convertTime12to24(item.start) !== convertTime12to24(isChecked[0]) &&
          convertTime12to24(item.end) !== convertTime12to24(isChecked[1])
      );
      setDepartureDuration(newList);
    }
  };

  const handleArrivalChange = (e) => {
    const isChecked = e.target.value.split("-");

    if (e.target.checked === true) {
      setArrivalDuration([
        ...arrivalDuration,
        {
          start: convertTime12to24(isChecked[0]),
          end: convertTime12to24(isChecked[1]),
        },
      ]);
    } else if (e.target.checked === false) {
      const newList = arrivalDuration.filter(
        (item) =>
          convertTime12to24(item.start) !== convertTime12to24(isChecked[0]) &&
          convertTime12to24(item.end) !== convertTime12to24(isChecked[1])
      );
      setArrivalDuration(newList);
    }
  };

  useEffect(() => {
    if (typeof setBusTypesArray === "function") {
      setBusTypesArray(
        compareTime({
          busType: true,
          arrivalTime: false,
          departureTime: false,
          filterBus,
          durationArray: busTypes,
        })
      );
    }
  }, [busTypes]);

  useEffect(() => {
    if (typeof setDepartureArray === "function") {
      setDepartureArray(
        compareTime({
          busType: false,
          arrivalTime: false,
          departureTime: true,
          filterBus,
          durationArray: departureDuration,
        })
      );
    }
  }, [departureDuration]);

  useEffect(() => {
    if (typeof setArrivalArray === "function") {
      setArrivalArray(
        compareTime({
          busType: false,
          arrivalTime: true,
          departureTime: false,
          filterBus,
          durationArray: arrivalDuration,
        })
      );
    }
  }, [arrivalDuration]);

  const unCkeckAll = () => {
    [...document.querySelectorAll(".form-check-input")].map((input) => {
      if (input.checked) {
        input.checked = !input.checked;
      }
      return null;
    });
  };

  const getReset = () => {
    setRangeValue({
      min: 300,
      max: 3000,
    });

    const newList = [];
    setBusTypes(newList);
    setDepartureDuration(newList);
    setArrivalDuration(newList);
    unCkeckAll();

    history.push("/booking");
  };
  return (
    <>
      {isBooking ? (
        <Container>
          <Range>
            <Text>
              <span>
                {
                  languageData?.side_bar_price_range_start[
                    webSettingData?.language
                  ]
                }
              </span>
              <span onClick={getReset} style={{ cursor: "pointer" }}>
                {
                  languageData?.side_bar_price_range_end[
                    webSettingData?.language
                  ]
                }
              </span>
            </Text>
            <Form>
              <InputRange
                maxValue={9999}
                minValue={100}
                formatLabel={(value) =>
                  `${webSettingData?.currency_code} ${value}`
                }
                value={rangeValue}
                onChange={(value) => setRangeValue(value)}
                onChangeComplete={(value) => console.log("value", value)}
              />
            </Form>
          </Range>
          {/* end range area */}

          <Card>
            <InnerCard>
              <Header>
                {
                  languageData?.side_bar_bus_types_title[
                    webSettingData?.language
                  ]
                }
              </Header>
              <CheckBoxUl>
                {fleet?.length &&
                  fleet?.map((item) => (
                    <CommonNavItem key={item.id}>
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id={item.id}
                        name="vehicle1"
                        value={item.type}
                        onChange={(e) => handleBusTypeChange(e)}
                      />
                      <CommonLabel htmlFor={item.id}>{item.type}</CommonLabel>
                    </CommonNavItem>
                  ))}
              </CheckBoxUl>
            </InnerCard>
          </Card>
          {/* end bustype */}

          <Card>
            <InnerCard>
              <Header>
                {
                  languageData?.side_bar_departure_time_title[
                    webSettingData?.language
                  ]
                }
              </Header>
              <CheckBoxUl>
                {departure?.length &&
                  departure?.map((item) => (
                    <CommonNavItem key={item.id}>
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id={item.detail}
                        name="departure"
                        value={item.detail}
                        onChange={(e) => handleDepartureChange(e)}
                      />
                      <CommonLabel htmlFor={item.detail}>
                        {item.detail}
                      </CommonLabel>
                    </CommonNavItem>
                  ))}
              </CheckBoxUl>
            </InnerCard>
          </Card>
          {/* end departure time */}

          <Card>
            <Header>
              {
                languageData?.side_bar_arrival_times_title[
                  webSettingData?.language
                ]
              }
            </Header>
            <CheckBoxUl>
              {arrival?.length &&
                arrival?.map((item) => (
                  <CommonNavItem key={item.id}>
                    <Input
                      type="checkbox"
                      id={item.detail}
                      className="form-check-input"
                      name="arrival"
                      value={item.detail}
                      onChange={(e) => handleArrivalChange(e)}
                    />
                    <CommonLabel htmlFor={item.detail}>
                      {item.detail}
                    </CommonLabel>
                  </CommonNavItem>
                ))}
            </CheckBoxUl>
          </Card>
          {/* end arrival time */}

          <Advertisment advertisement={bookingAdvertisement} />
          {/* end add area */}
        </Container>
      ) : (
        <RightWrapper>
          <FareSummery
            discountValue={
              discountValue?.discount ? discountValue?.discount : 0
            }
            subTripid={subTripid}
            setSubtripid={setSubtripid}
          />
          {/* end summary */}
          <PromoCode setDiscountValue={setDiscountValue} />
          {/* end PromoCode */}
          <Advertisment advertisement={checkoutAdvertisement} />
          {/* end Advertisment */}
        </RightWrapper>
      )}
    </>
  );
};

export default SideBar;
