/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import TextField from "../../../bootstrap/TextField";
// import languageData from "../../../lib/lang.config.json";
import { CountrySelect } from "../../../pages/Signup/Signup.styles";
import { ticketTracking } from "../../../redux/action/busAction";
import Payment from "../Payment/index.jsx";
import { PaymentHelper } from "../PaymentGateway/PaymentHelper";
import ReturnTravellerInformation from "../ReturnTravellerInformation";
import SingleTravellerInformation from "../SingleTravellerInformation";
import {
  FirstNameAndNid,
  Nid,
  Passenger,
  Select,
  UserContactWrapper,
} from "../SingleTravellerInformation/singleTravellerInformation.styles";
import {
  Address,
  CityAndZip,
  Country,
  InformationHeader,
  TravelarInformation,
} from "./TravellerInformation.styles.js";

const TravellerInformation = ({
  passengerInformation,
  setPassengerInformation,
  values,
  setValues,
  handleChange,
  isRegesteredUser,
  discountValue,
  setDiscountValue,
  returnAmmount,
  regularAmmount,
  subTripid,
  setLoading,
  token,
  paymentStutas,
  setPaymentStutas,
}) => {
  const { webSettingData } = useSelector((state) => state.busLists);
  const languageData = useSelector((state) => state.busLists.languageData);
  const fareSummery = useSelector((state) => state.fareSummery);
  const [countryName, setCountryName] = useState([]);
  const [searchInfo, setSearchInfo] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [paymentGateway, setpaymentGateway] = useState("");

  const [extraPassengers, setExtraPassengers] = useState({});
  const [roundTripPassengers, setRoundTripPassengers] = useState({});
  const [journeyInfo, setJourneyInfo] = useState({});
  const [returnSearchInfo, setReturnSearchInfo] = useState({});
  const [returnFirstJourneyInfo, setReturnFirstJourneyInfo] = useState({});
  const history = useHistory();
  const [isChecked, setIsChecked] = useState(false);
  const [paypalShow, setPaypalShow] = useState(false);
  const [paystackShow, setPaystacklShow] = useState(false);
  const [stripeShow, setStripeShow] = useState(false);
  const [paytmShow, setPaytmShow] = useState(false);
  const [razorpayShow, setRazorpayShow] = useState(false);
  const [sslcommerz, setSslcommerz] = useState(false);
  const [journeyInfoTax, setJourneyInfoTax] = useState(null);
  const [bookingInfoTax, setBookingInfoTax] = useState(null);
  const [singlePaymentGateway, setSinglePaymentGateway] = useState(null);
  const [paymentGatewayNumber, setPaymentGatewayNumber] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  useEffect(() => {
    setIsDisabled((prevState) => !prevState);
  }, [userProfileInfo]);

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, [passengerInformation, token]);

  const dispatch = useDispatch();

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    countryName?.find((item, index) => {
      if (item?.id == webSettingData?.country) {
        setPassengerInformation({
          ...passengerInformation,
          country_id: item?.id,
        });
      }
    });
  }, [countryName]);

  const handleCountryChange = (e) => {
    const { name, value } = e.target;
    setPassengerInformation({
      ...passengerInformation,
      [name]: value,
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/countries`)
      .then((res) => res.json())
      .then((data) => setCountryName(data.data));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/paymethods`)
      .then((res) => res.json())
      .then((data) => {
        setSinglePaymentGateway(data?.data);
        if (singlePaymentGateway) {
          const result = singlePaymentGateway?.find(
            (item) => item?.name === paymentGateway
          );
          setPaymentGatewayNumber(result?.id);
        }
      });
  }, [paymentGateway]);

  const getCountry = () =>
    countryName.findIndex(
      (country) =>
        String(country.id) === String(passengerInformation?.country_id)
    );

  useEffect(() => {
    setSearchInfo(JSON.parse(localStorage.getItem("searchInfo")));
    setBookingInfo(JSON.parse(localStorage.getItem("bookingInfo")));
    setJourneyInfo(JSON.parse(localStorage.getItem("journeyInfo")));
    setReturnSearchInfo(JSON.parse(localStorage.getItem("returnSearchInfo")));
    setReturnFirstJourneyInfo(
      JSON.parse(localStorage.getItem("returnFirstJourneyInfo"))
    );

    setJourneyInfoTax(JSON.parse(localStorage.getItem("journeyInfoTax")));
    setBookingInfoTax(JSON.parse(localStorage.getItem("bookingInfoTax")));
  }, [passengerInformation]);

  useEffect(() => {
    let extraPassengers = [],
      roundTripPassengers = [];

    if (journeyInfo?.isRoundTrip && bookingInfo?.totalseat > 1) {
      for (let i = 0; i < bookingInfo?.totalseat; i++) {
        roundTripPassengers.push({});
      }

      for (let i = 0; i < journeyInfo?.totalseat; i++) {
        extraPassengers.push({});
      }

      setExtraPassengers(extraPassengers);
      setRoundTripPassengers(roundTripPassengers);
    } else {
      for (let i = 0; i < bookingInfo?.totalseat; i++) {
        extraPassengers.push({});
      }
      setExtraPassengers(extraPassengers);
    }
  }, [bookingInfo]);

  let countries = [];
  countryName.map((item) =>
    countries.push({
      value: item.nicename,
      label: item.nicename,
      id: item.id,
    })
  );

  const handleCountry = (selectOption) => {
    setPassengerInformation({
      ...passengerInformation,
      country_id: selectOption.id,
    });
  };

  const showExtraPassengersFields = () => {
    if (
      extraPassengers.length > 1 &&
      extraPassengers.length < webSettingData?.max_ticket + 1
    ) {
      return extraPassengers.slice(1).map((passenger, index) => (
        <div key={index}>
          <br />
          <SingleTravellerInformation
            passengerIndex={index + 2}
            values={values}
            handleChange={handleChange}
          />
        </div>
      ));
    }
  };

  const showExtraRoundTripPassengers = () => {
    if (
      roundTripPassengers.length > 1 &&
      roundTripPassengers.length < webSettingData?.max_ticket + 1
    ) {
      return roundTripPassengers.slice(1).map((passenger, index) => (
        <div key={index}>
          <br />
          <SingleTravellerInformation
            passengerIndex={index + 2}
            values={values}
            handleChange={handleChange}
          />
        </div>
      ));
    }
  };

  const showReturnPassengersFields = () => {
    if (
      roundTripPassengers.length > 1 &&
      roundTripPassengers.length < webSettingData?.max_ticket + 1
    ) {
      return roundTripPassengers.slice(1).map((passenger, index) => (
        <div key={index}>
          <br />
          <ReturnTravellerInformation
            passengerIndex={index + 2}
            values={values}
            handleChange={handleChange}
          />
        </div>
      ));
    }
  };

  const allBookingInformation = {
    totalprice: fareSummery?.grandTotal,
    passengerInformation: passengerInformation,
    values: values,
    setValues: setValues,
    paymentStutas: paymentStutas,
    paymentGateway: paymentGatewayNumber,
    fareSummry: fareSummery,
    searchInfo: searchInfo,
    bookingInfo: bookingInfo,
    journeyInfo: journeyInfo,
    returnSearchInfo: returnSearchInfo,
    returnFirstJourneyInfo: returnFirstJourneyInfo,
    returnAmmount: returnAmmount,
    regularAmmount: regularAmmount,
    discountValue: discountValue?.discount,
    subTripid: subTripid,
    journeyInfoTax: journeyInfoTax,
    bookingInfoTax: bookingInfoTax,
    token: token,
  };

  const handleTicketTracking = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/tickets/bookingid/${id}`
    );
    const result = await response.json();

    if (result?.status === "success") {
      dispatch(ticketTracking(result?.data));
      history.push("/ticket-traking");
      toast.success("success");
      
    }
  };

  

  const handleSubmitPayment = async (paymentStutas) => {
    if (paymentStutas === "Pay Latter") {
      setLoading(true);
      PaymentHelper(allBookingInformation, dispatch)
        .then((res) => {
          setLoading(false);
          handleTicketTracking(res?.data?.booking_id);
        })
        .catch((err) => console.log(err));
    } else if (!paymentGateway) {
      toast.error("select payment gateway");
      return;
    } else if (paymentGateway === "paypal") {
      setPaypalShow(true);
      setPaystacklShow(false);
      setStripeShow(false);
      setPaytmShow(false);
      setRazorpayShow(false);
      setSslcommerz(false);
    } else if (paymentGateway === "paystack") {
      setPaystacklShow(true);
      setPaypalShow(false);
      setStripeShow(false);
      setPaytmShow(false);
      setRazorpayShow(false);
      setSslcommerz(false);
    } else if (paymentGateway === "stripe") {
      setStripeShow(true);
      setPaypalShow(false);
      setPaystacklShow(false);
      setPaytmShow(false);
      setRazorpayShow(false);
      setSslcommerz(false);
    } else if (paymentGateway === "paytm") {
      setPaytmShow(true);
      setRazorpayShow(false);
      setStripeShow(false);
      setPaypalShow(false);
      setPaystacklShow(false);
      setSslcommerz(false);
    } else if (paymentGateway === "razorpay") {
      setRazorpayShow(true);
      setPaytmShow(false);
      setStripeShow(false);
      setPaypalShow(false);
      setPaystacklShow(false);
      setSslcommerz(false);
    } else if (paymentGateway === "sslcommerz") {
      setSslcommerz(true);
      setRazorpayShow(false);
      setPaytmShow(false);
      setStripeShow(false);
      setPaypalShow(false);
      setPaystacklShow(false);
    }
  };

  return (
    <TravelarInformation>
      <InformationHeader>
        {languageData?.checkout_page_title[webSettingData?.language]}
      </InformationHeader>

      <Passenger>
        <label htmlFor="name">
          {
            languageData?.checkout_page_passenger_title[
              webSettingData?.language
            ]
          }
          <samp style={{ color: "red" }}>
            {" "}
            <b>*</b>
          </samp>
        </label>
        <UserContactWrapper>
          <FirstNameAndNid>
            <Select
              name="gender"
              id={`gender`}
              onChange={(e) =>
                setPassengerInformation({
                  ...passengerInformation,
                  gender: e.target.value,
                })
              }
            >
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
            </Select>

            <TextField
              id={`name`}
              name={`name`}
              type="text"
              disabled={isDisabled}
              placeholder={
                languageData?.checkout_page_passenger_input_text[
                  webSettingData?.language
                ]
              }
              value={passengerInformation?.first_name}
              onChange={(e) =>
                setPassengerInformation({
                  ...passengerInformation,
                  first_name: e.target.value,
                })
              }
              autoComplete="nope"
            />
          </FirstNameAndNid>
          <TextField
            type="text"
            placeholder="Surname"
            name={`surName`}
            value={passengerInformation?.last_name}
            onChange={(e) =>
              setPassengerInformation({
                ...passengerInformation,
                last_name: e.target.value,
              })
            }
            autoComplete="nope"
          />
        </UserContactWrapper>
      </Passenger>
      {/* end passenger */}

      <Nid>
        <label htmlFor={`nid`}>
          {languageData?.checkout_page_nid_title[webSettingData?.language]}
        </label>
        {/* start */}
        <FirstNameAndNid>
          <Select
            name={`id_type`}
            id={`id_type`}
            onChange={(e) =>
              setPassengerInformation({
                ...passengerInformation,
                id_type: e.target.value,
              })
            }
          >
            <option value="Nid">NID</option>
            <option value="Passport">PP</option>
          </Select>
          <TextField
            id={`nid`}
            name={`passPort`}
            type="text"
            placeholder={
              languageData?.checkout_page_nid_input_text[
                webSettingData?.language
              ]
            }
            value={passengerInformation?.id_number}
            onChange={(e) =>
              setPassengerInformation({
                ...passengerInformation,
                id_number: e.target.value,
              })
            }
          />
        </FirstNameAndNid>
      </Nid>

      {!isRegesteredUser && (
        <Address>
          <label htmlFor="zip">
            {languageData?.checkout_page_zip_title[webSettingData?.language]}
          </label>
          <CityAndZip>
            <TextField
              id="zip"
              type="number"
              onKeyDown={(e) =>
                exceptThisSymbols.includes(e.key) && e.preventDefault()
              }
              placeholder={
                languageData?.checkout_page_zip_input_text[
                  webSettingData?.language
                ]
              }
              name="zip_code"
              value={passengerInformation?.zip_code}
              onChange={(e) =>
                setPassengerInformation({
                  ...passengerInformation,
                  zip_code: e.target.value,
                })
              }
            />

            <TextField
              type="text"
              placeholder={
                languageData?.checkout_page_city_input_text[
                  webSettingData?.language
                ]
              }
              name="city"
              value={passengerInformation?.city}
              onChange={(e) =>
                setPassengerInformation({
                  ...passengerInformation,
                  city: e.target.value,
                })
              }
            />
          </CityAndZip>
        </Address>
      )}
      <Address>
        <label htmlFor="address">
          {languageData?.checkout_page_address_title[webSettingData?.language]}
        </label>
        <TextField
          id="address"
          type="text"
          placeholder={
            languageData?.checkout_page_address_input_text[
              webSettingData?.language
            ]
          }
          name="address"
          value={passengerInformation?.address}
          onChange={(e) =>
            setPassengerInformation({
              ...passengerInformation,
              address: e.target.value,
            })
          }
        />
      </Address>
      {/* end Address */}

      <Country>
        <label htmlFor="countryName">
          {languageData?.checkout_page_country_title[webSettingData?.language]}
        </label>

        {token ? (
          <ReactSelect
            options={countries}
            name="country_id"
            value={countries[getCountry()]}
            onChange={(selectOption) =>
              setPassengerInformation({
                ...passengerInformation,
                country_id: selectOption.id,
              })
            }
          />
        ) : (
          <CountrySelect
            name="country_id"
            id="country_id"
            onChange={handleCountryChange}
            // defaultValue="2"
          >
            {countryName?.map((item, index) => (
              <option
                value={item.id}
                key={index}
                selected={item?.id == webSettingData?.country && true}
              >
                {item.name}
              </option>
            ))}
          </CountrySelect>
        )}
      </Country>

      {/* end Nationality */}

      {showExtraPassengersFields()}
      {roundTripPassengers.length > 1 && (
        <InformationHeader>Return Information</InformationHeader>
      )}

      {showReturnPassengersFields()}

      <Payment
        handleSubmitPayment={handleSubmitPayment}
        paymentStutas={paymentStutas}
        setPaymentStutas={setPaymentStutas}
        paymentGateway={paymentGateway}
        setpaymentGateway={setpaymentGateway}
        passengerInformation={passengerInformation}
        allBookingInformation={allBookingInformation}
        setLoading={setLoading}
      />
    </TravelarInformation>
  );
};

export default TravellerInformation;

// *1100*14#
