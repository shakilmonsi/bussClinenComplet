/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import available from "../../../assets/available.svg";
import steering from "../../../assets/images/steering.svg";
import selectedSeatIcon from "../../../assets/selected-seat.svg";
import unavailable from "../../../assets/unavailable.svg";
import Alert from "../../../bootstrap/Alert";
import BusFacilities from "../BusFacilities/index.jsx";
import SeatCount from "../SeatCount/index.jsx";
import { toast } from "react-toastify";
import {
  BusFacilitiesWrapper,
  BusSeatMapWrapper,
  LeftSide,
  LeftSideWrapper,
  RightSide,
  SeatCoutWrapper,
  SeatLegend,
  SeatType,
  SeatTypeHeader,
  SeatUl,
  SeatWrapper,
  SingleSeat,
  Steering,
} from "./BusSeatMap.styles.js";
import fetchSeatData from "../../../helpers/fetch-seat-data";

const BusSeatMap = ({
  tripData,
  busDetails,
  selectedSeatNumbers,
  setSelectedSeatNumbers,
  showBusSeat,
}) => {
  const {
    totalSelectSeat,
    setTotalSelectSeat,
    childrenSelectSeat,
    setChildrenSelectSeat,
    adultSelectSeat,
    setAdultSelectSeat,
    specialSelectSeat,
    setSpecialSelectSeat,
  } = busDetails;

  const { webSettingData, languageData } = useSelector(
    (state) => state.busLists
  );
  const [seats, setSeats] = useState([]);
  const [selectSeat, setSelectSeat] = useState(false);
  const [seatSelectionError, setSeatSelectionError] = useState("");
  const seatNumberRef = useRef(null);
  const [date, setDate] = useState(null);
  // const [languageData, setLanguageData] = useState();

  const fetchSeat = async () => {
    const searchInfo = JSON.parse(localStorage.getItem("searchInfo"));
    setDate(searchInfo?.journeydate);

    if (date && tripData?.subtripId) {
      console.log(tripData);
      const result = await fetchSeatData(date, tripData?.subtripId);

      // Check response data
      if (!result?.seatlayout) {
        toast.error("Something went wrong in data loading!");
      } else {
        // Set in state
        setSeats(result?.seatlayout);
      }
    }
  };

  useEffect(() => {
    fetchSeat();
  }, [tripData?.subtripId, date]);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);

  const seatSelectionStatus = (e) => {
    if (e.currentTarget.dataset.seatStatus === "available") {
      setTotalSelectSeat((prevState) => {
        handleAdultSelectSeat(
          Number(prevState) +
            1 -
            (Number(childrenSelectSeat) + Number(specialSelectSeat))
        );
        return Number(prevState) + 1;
      });

      e.currentTarget.dataset.seatStatus = "unavailable";
      e.currentTarget.querySelector("img").src = selectedSeatIcon;
    } else if (e.currentTarget.dataset.seatStatus === "unavailable") {
      setTotalSelectSeat((prevState) => {
        handleAdultSelectSeat(
          Number(prevState) -
            (1 + Number(childrenSelectSeat) + Number(specialSelectSeat))
        );
        return Number(prevState) - 1;
      });
      e.currentTarget.querySelector("img").src = available;
      e.currentTarget.dataset.seatStatus = "available";
    }
  };

  /*
   When a seat is selected (Adult Seat) the number of seats will increase	
  */
  const handleAdultSelectSeat = (num) => {
    setAdultSelectSeat(num);
    // console.log("selectedSeatNumbers :- ", num);
  };

  const handleSelectSeat = (event, selectedSeat) => {
    if (totalSelectSeat >= webSettingData?.max_ticket) {
      if (event.currentTarget.dataset.seatStatus === "unavailable") {
        setTotalSelectSeat((prevState) => {
          return prevState - 1;
        });

        setSelectedSeatNumbers((prevState) => {
          const index = prevState.findIndex(
            (seat) => seat.seatNumber === selectedSeat.seatNumber
          );
          return [...prevState.slice(0, index), ...prevState.slice(index + 1)];
        });

        event.currentTarget.querySelector("img").src = available;
        event.currentTarget.dataset.seatStatus = "available";
        setSeatSelectionError("");
        return;
      }

      setSeatSelectionError(
        `Sorry, you can not book more than ${webSettingData?.max_ticket} seats at a time`
      );

      return;
    } else if (totalSelectSeat === webSettingData?.max_ticket) {
      setSeatSelectionError("");
    }
    seatSelectionStatus(event);

    if (event.currentTarget.dataset.seatStatus === "unavailable") {
      setSelectedSeatNumbers((prevState) => [
        ...prevState,
        { ...selectedSeat },
      ]);
    } else if (event.currentTarget.dataset.seatStatus === "available") {
      setSelectedSeatNumbers((prevState) => {
        const index = prevState.findIndex(
          (seat) => seat.seatNumber === selectedSeat.seatNumber
        );
        return [...prevState.slice(0, index), ...prevState.slice(index + 1)];
      });
    }
  };

  return (
    <BusSeatMapWrapper>
      <LeftSideWrapper>
        <LeftSide>
          <Steering>
            <img src={steering} alt="steering" />
          </Steering>
          <SeatWrapper>
            {seats?.length > 0 &&
              seats?.map((items, i) => (
                <SeatUl key={i} nmb={seats[0]?.length}>
                  {items?.map((item, index) => (
                    <SingleSeat key={index}>
                      {item?.seatNumber &&
                        (item?.isReserved ? (
                          <>
                            <img src={unavailable} alt="Unavailable seat" />

                            <p>{item?.seatNumber}</p>
                          </>
                        ) : (
                          <>
                            {selectSeat ? (
                              <div
                                ref={seatNumberRef}
                                onClick={(e) => handleSelectSeat(e, item)}
                                data-seatno={item.seatNumber}
                                data-seat-status="unavailable"
                              >
                                {" "}
                                <img
                                  src={selectedSeatIcon}
                                  alt="Selected seat"
                                />
                                <p>{item?.seatNumber}</p>
                              </div>
                            ) : (
                              <div
                                ref={seatNumberRef}
                                onClick={(e) => handleSelectSeat(e, item)}
                                data-seatno={item.seatNumber}
                                data-seat-status="available"
                              >
                                <img src={available} alt="Available seat" />
                                <p>{item?.seatNumber}</p>
                              </div>
                            )}
                          </>
                        ))}
                    </SingleSeat>
                  ))}
                </SeatUl>
              ))}
          </SeatWrapper>
        </LeftSide>
      </LeftSideWrapper>

      <RightSide>
        {seatSelectionError && (
          <Alert type="danger">{seatSelectionError}</Alert>
        )}

        <SeatTypeHeader>
          {languageData?.booking_page_seat_legend[webSettingData?.language]}
        </SeatTypeHeader>
        <SeatLegend>
          <SeatType>
            <img src={available} alt="Available Seat" />
            <div>
              {languageData?.booking_page_available[webSettingData?.language]}
            </div>
          </SeatType>
          <SeatType>
            <img src={unavailable} alt="Unavailable Seat" />
            <div>
              {languageData?.booking_page_unavailable[webSettingData?.language]}
            </div>
          </SeatType>
          <SeatType>
            <img src={selectedSeatIcon} alt="Selected Seat" />
            <div>
              {languageData?.booking_page_book[webSettingData?.language]}
            </div>
          </SeatType>
        </SeatLegend>

        <SeatCoutWrapper>
          <SeatCount
            totalSelectSeat={totalSelectSeat}
            setTotalSelectSeat={setTotalSelectSeat}
            childrenSelectSeat={childrenSelectSeat}
            setChildrenSelectSeat={setChildrenSelectSeat}
            specialSelectSeat={specialSelectSeat}
            setSpecialSelectSeat={setSpecialSelectSeat}
            setAdultSelectSeat={setAdultSelectSeat}
            adultSelectSeat={adultSelectSeat}
          />
        </SeatCoutWrapper>

        <BusFacilitiesWrapper>
          <BusFacilities facility={tripData.facility} />
        </BusFacilitiesWrapper>
      </RightSide>
    </BusSeatMapWrapper>
  );
};

export default BusSeatMap;
