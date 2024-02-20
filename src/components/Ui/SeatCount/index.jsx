import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Adult,
  Children,
  InputArea,
  InputHeader,
  SingleInput,
  Special,
} from "./SeatCount.styles.js";

const SeatCount = ({
  totalSelectSeat,
  setTotalSelectSeat,
  setAdultSelectSeat,
  adultSelectSeat,
  setSpecialSelectSeat,
  childrenSelectSeat,
  setChildrenSelectSeat,
  specialSelectSeat,
}) => {
  const { webSettingData,languageData } = useSelector((state) => state.busLists);
  const [bookingData, setBookingData] = useState(null);
  // const [languageData, setLanguageData] = useState();


  useEffect(() => {
    const bookingInfo = JSON.parse(localStorage.getItem("bookingInfo"));
    setBookingData(bookingInfo);
  }, []);
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);
  

  

  const handleChildren = (e) => {
    if (e.target.value < 0) return;

    let totalSet = totalSelectSeat - Number(specialSelectSeat);
    if (e.target.value > Number(totalSet)) {
      toast.error(`You can't take more than ${totalSet}`);
    } else {
      if (e.target.value > Number(bookingData?.cseat)) {
        toast.error(
          `${bookingData?.cseat} seat(s) are available only for children.`
        );
        setChildrenSelectSeat(e.target.value - 1);
        return;
      }
      setChildrenSelectSeat(e.target.value);

      setAdultSelectSeat(
        Number(specialSelectSeat) + totalSelectSeat - e.target.value
      );
    }
  };

  const handleAdult = (e) => {
    if (e.target.value < 0) return;

    if (e.target.value > Number(totalSelectSeat)) {
      toast.error(`You only selected ${totalSelectSeat} seat(s).`);

      setAdultSelectSeat(Number(totalSelectSeat));
    } else {
      setAdultSelectSeat(e.target.value);
    }
  };

  const handleSpecial = (e) => {
    if (e.target.value < 0) return;

    let totalSet = totalSelectSeat - Number(childrenSelectSeat);

    if (e.target.value > Number(totalSet)) {
      // setAdultSelectSeat(e.target.value - totalSelectSeat);
      toast.error(`You can't take more than ${totalSet}`);
    } else {
      if (e.target.value > Number(bookingData?.spseat)) {
        toast.error(
          `${bookingData?.spseat} seat(s) are available only for special.`
        );
        setSpecialSelectSeat(e.target.value - 1);
        return;
      }
      setSpecialSelectSeat(e.target.value);
      setAdultSelectSeat(
        totalSelectSeat - Number(childrenSelectSeat) - e.target.value
      );
    }
  };

  return (
    <>
      <InputArea>
        <Children>
          <InputHeader htmlFor="children">
            {languageData?.booking_page_children_seat[webSettingData?.language]}
          </InputHeader>
          <SingleInput
            id="children"
            type="number"
            inputProps={{ min: 0, max: bookingData?.cseat }}
            min={0}
            max={bookingData?.cseat}
            value={childrenSelectSeat}
            onChange={handleChildren}
            placeholder="0"
          />
        </Children>
        {/* end children */}

        <Adult>
          <InputHeader htmlFor="adult">
            {languageData?.booking_page_adul_seat[webSettingData?.language]}
          </InputHeader>
          <SingleInput
            id="adult"
            type="number"
            value={adultSelectSeat}
            onChange={handleAdult}
            placeholder="0"
          />
        </Adult>
        {/* end Adult */}

        <Special>
          <InputHeader htmlFor="special">
            {languageData?.booking_page_special_seat[webSettingData?.language]}
          </InputHeader>
          <SingleInput
            id="special"
            type="number"
            inputProps={{ min: 0, max: bookingData?.spseat }}
            min={0}
            max={bookingData?.spseat}
            value={specialSelectSeat}
            onChange={handleSpecial}
            placeholder="0"
          />
        </Special>
        {/* end Spcial */}
      </InputArea>
      {/* end input area */}
    </>
  );
};

export default SeatCount;
