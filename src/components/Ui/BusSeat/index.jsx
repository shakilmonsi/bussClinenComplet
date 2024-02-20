import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import { useHistory } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Ul from "../../../bootstrap/Ul";
import { isRegurnDateValid } from "../../../helpers";
import { addBusName, addError } from "../../../redux/action/busAction";
import BoardingAndDropping from "../BoardingAndDropping/index.jsx";
import BusSeatMap from "../BusSeatMap/index.jsx";
import SelectedBoardingAndDropping from "../SelectedBoardingAndDropping/index.jsx";
import {
  Amount,
  BookingBtn,
  BusSeatWrapper,
  FareDetails,
  FareHeader,
  PriceItem,
  SeatNo,
  TaxText,
} from "./BustSeat.styles.js";

const BusSeat = ({ tripData }) => {
  // console.log("🚀 ~ file: index.jsx ~ line 25 ~ BusSeat ~ tripData", tripData);
  const { webSettingData ,languageData} = useSelector((state) => state.busLists);
  const [boardingInfromation, setBoardingInfromation] = useState({
    time: "",
    detail: "",
    standName: "",
    stand_id: "",
  });

  const [droppingInformation, setDroppingInformation] = useState({
    time: "",
    detail: "",
    standName: "",
    stand_id: "",
  });

  const [totalSelectSeat, setTotalSelectSeat] = useState("");
  const [childrenSelectSeat, setChildrenSelectSeat] = useState("");
  const [adultSelectSeat, setAdultSelectSeat] = useState(totalSelectSeat);
  const [specialSelectSeat, setSpecialSelectSeat] = useState("");
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState([]);
  const [totalSeats, setTotalSeats] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState(null);
  // const [languageData, setLanguageData] = useState();

  useEffect(() => {
    setTotalSeats(
      Number(childrenSelectSeat) +
        Number(adultSelectSeat) +
        Number(specialSelectSeat)
    );
  }, [childrenSelectSeat, adultSelectSeat, specialSelectSeat]);

  useEffect(() => {
    setSearchData(JSON.parse(localStorage.getItem("searchInfo")));
  }, []);
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);

  const busDetails = {
    totalSelectSeat,
    setTotalSelectSeat,
    childrenSelectSeat,
    setChildrenSelectSeat,
    adultSelectSeat,
    setAdultSelectSeat,
    specialSelectSeat,
    setSpecialSelectSeat,
  };

  const totalPrice = () => {
    return (
      childrenSelectSeat * tripData.child_fair +
      adultSelectSeat * tripData.adult_fair +
      specialSelectSeat * tripData.special_fair
    );
  };

  const saveSeatBookingInfo = async (bookingInfo) => {
    if (
      (!isRegurnDateValid(searchData?.returnDate) &&
        moment(searchData?.journeydate).isBefore(searchData?.returnDate)) ||
      moment(searchData?.journeydate).isSame(searchData?.returnDate)
    ) {
      const formData = new FormData();
      formData.append("pick_location_id", searchData?.dropLocation);
      formData.append("drop_location_id", searchData?.pickLocation);
      formData.append("journeydate", searchData?.returnDate);

      const response = await fetch(
        `${process.env.REACT_APP_API_MODULE_DOMAIN}/triplist`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();

      if (result?.status === "success") {
        dispatch(addBusName(result.data));
      } else if (result?.status === "failed") {
        dispatch(addError(result));
      }

      const searchInfo = {
        dropLocation: searchData.pickLocation,
        journeydate: searchData?.returnDate,
        pickLocation: searchData.dropLocation,
        returnDate: searchData?.journeydate,
      };

      const returnFirstJourneyInfo = {
        dropLocation: searchData.dropLocation,
        pickLocation: searchData.pickLocation,
        journeydate: searchData?.journeydate,
        returnDate: searchData?.returnDate,
      };

      localStorage.setItem("searchInfo", JSON.stringify(searchInfo));
      localStorage.setItem(
        "returnFirstJourneyInfo",
        JSON.stringify(returnFirstJourneyInfo)
      );

      //if return is more than journey date save the booking info into localStorage
      localStorage.setItem(
        "journeyInfo",
        JSON.stringify({
          ...bookingInfo,
          journeydate: searchData?.journeydate,
          returnDate: searchData?.returnDate,
          isRoundTrip: true,
        })
      );
    } else {
      //if no return date execute as journey info and save the journey info into localStorage
      //if return date is available, save the booking info as return ticket details into localStorage
      localStorage.setItem(
        "bookingInfo",
        JSON.stringify({ ...bookingInfo, isRoundTrip: false })
      );
      history.push("/checkout");
    }
  };

  const handleBooking = async () => {
    setLoading(true);

    let ticket_token = localStorage.getItem('ticket_token');

    if (!ticket_token) {
      ticket_token = [...Array(15)].map(() => Math.random().toString(36)[2]).join('');
      localStorage.setItem('ticket_token', ticket_token);
    }

    var formdata = new FormData();
    formdata.append("subtrip_id", tripData.subtripId);
    formdata.append("ticket_token", ticket_token);
    formdata.append("seat_names", selectedSeatNumbers?.map((seat) => seat.seatNumber).join(","));
    formdata.append("journey_date", searchData?.journeydate);

    const checkseats = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/tickets/checkseats`,
      {
        method: "POST",
        body: formdata,
      }
    );

    const result = await checkseats.json();
    // console.log("checkseats :-", result);

    if (result.status == "success") {
      if (String(totalSelectSeat) === "0") {
        toast.error("Please select seat first");
        setLoading(false);
        return;
      } else if (Number(totalSelectSeat) !== Number(totalSeats)) {
        toast.error("selected seat and total seat must be equal");
        setLoading(false);
        return;
      } else if (childrenSelectSeat > tripData.child_seat) {
        toast.error(
          `For children, only ${tripData.child_seat} seats are available`
        );
        setLoading(false);
        return;
      } else if (specialSelectSeat > tripData.special_seat) {
        toast.error(`Only ${tripData.special_seat} seats are available`);
        setLoading(false);
        return;
      } else if (!boardingInfromation.stand_id) {
        toast.error("Please select boarding point");
        setLoading(false);
        return;
      } else if (!droppingInformation.stand_id) {
        toast.error("Please select dropping point");
        setLoading(false);
        return;
      } else if (totalSeats > webSettingData?.max_ticket) {
        toast.error(
          `Your total seats are ${totalSeats}. You may add only 4 seats at a time.`
        );
        setLoading(false);
        return;
      }

      const bookingInfo = {
        trip_id: tripData.trip_id,
        subtripId: tripData.subtripId,
        pickstand: boardingInfromation.stand_id,
        dropstand: droppingInformation.stand_id,
        totalprice: String(totalPrice()),
        grandtotal: String(totalPrice()),
        aseat: String(adultSelectSeat),
        cseat: String(childrenSelectSeat),
        spseat: String(specialSelectSeat),
        vehicle_id: tripData.vehicle_id,
        seatnumbers: selectedSeatNumbers
          ?.map((seat) => seat.seatNumber)
          .join(","),
        totalseat: totalSeats,
      };

      saveSeatBookingInfo(bookingInfo);
    } else {
      setLoading(false);
      toast.error(result.message);
    }
  };

  return (
    <BusSeatWrapper>
      <BusSeatMap
        tripData={tripData}
        busDetails={busDetails}
        selectedSeatNumbers={selectedSeatNumbers}
        setSelectedSeatNumbers={setSelectedSeatNumbers}
      />
      {/* end busSeat map */}

      <div>
        <BoardingAndDropping
          id={tripData?.id}
          tripId={tripData?.trip_id}
          setBoardingInfromation={setBoardingInfromation}
          setDroppingInformation={setDroppingInformation}
        />
        {/* end BoardingAndDropping  */}

        <SelectedBoardingAndDropping
          boardingInfromation={boardingInfromation}
          droppingInformation={droppingInformation}
        />
        {/* end SelectedBoardingAndDropping */}

        {selectedSeatNumbers?.length > 0 && (
          <SeatNo>
            <div>Seat No</div>
            <div>
              {selectedSeatNumbers.map((seat) => `${seat.seatNumber}, `)}
            </div>
          </SeatNo>
        )}
        {/* end seat no */}

        <FareDetails>
          <FareHeader>
            {
              languageData?.booking_page_fare_details_title[
                webSettingData?.language
              ]
            }
          </FareHeader>
          <Ul style={{ flexDirection: "column" }}>
            <PriceItem>
              <div>
                {
                  languageData?.booking_page_child_price_title[
                    webSettingData?.language
                  ]
                }
              </div>
              <div>
                {`${webSettingData?.currency_code} `}
                {childrenSelectSeat * tripData.child_fair}
              </div>
            </PriceItem>
            <PriceItem>
              <div>
                {
                  languageData?.booking_page_adult_price_title[
                    webSettingData?.language
                  ]
                }
              </div>
              <div>
                {`${webSettingData?.currency_code} `}
                {adultSelectSeat * tripData.adult_fair}
              </div>
            </PriceItem>
            <PriceItem>
              <div>
                {
                  languageData?.booking_page_special_price_title[
                    webSettingData?.language
                  ]
                }
              </div>
              <div>
                {`${webSettingData?.currency_code} `}
                {specialSelectSeat * tripData.special_fair}
              </div>
            </PriceItem>
            <PriceItem>
              <Amount>
                {
                  languageData?.booing_page_total_ammount_title[
                    webSettingData?.language
                  ]
                }
              </Amount>
              <Amount>
                {`${webSettingData?.currency_code} `}
                {totalPrice()}
              </Amount>
            </PriceItem>
          </Ul>
        </FareDetails>
        {/* end FareDetails */}

        <TaxText>
          {languageData?.booking_page_tax_message[webSettingData?.language]}
        </TaxText>
        {/* end TaxText */}

        <BookingBtn
          onClick={(e) => handleBooking()}
          disabled={isLoading}
          btnbgcolor={webSettingData?.buttoncolor}
          btnbghvcolor={webSettingData?.buttoncolorhover}
          btntextcolor={webSettingData?.buttontextcolor}
        >
          {
            languageData?.booking_page_Proccess_to_book_btn[
              webSettingData?.language
            ]
          }
        </BookingBtn>
        {/* end Button */}
      </div>
    </BusSeatWrapper>
  );
};

export default BusSeat;
