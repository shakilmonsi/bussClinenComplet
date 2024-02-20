import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import fetchSeatData from "../../../helpers/fetch-seat-data";
// import languageData from "../../../lib/lang.config.json";
import Flutterwave from "../PaymentGateway/Flutterwave";
import NewPayPal from "../PaymentGateway/NewPayPal";
import Paystack from "../PaymentGateway/Paystack";
import Razorpay from "../PaymentGateway/Razorpay";
import SslCommerz from "../PaymentGateway/SslCommerz";
import StripeCheckoutBtn from "../PaymentGateway/StripeCheckoutBtn";
import {
  ButtonWrapper,
  CancelButton,
  Label,
  PaymentAndButton,
  PaymentButton,
  PaymentInput,
  PaymentMethod,
  PaymentUl,
  SinglePayment,
} from "./Payment.styles";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const Payment = ({
  handleSubmitPayment,
  paymentStutas,
  setPaymentStutas,
  paymentGateway,
  setpaymentGateway,
  passengerInformation,
  allBookingInformation,
  setLoading,
}) => {
  const history = useHistory();
  const { webSettingData } = useSelector((state) => state.busLists);
  const languageData = useSelector((state) => state.busLists.languageData);
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [seatsForBooking, setSeatsForBooking] = useState([]);
  const [date, setDate] = useState();
  const [payPalClientId, setPayPalPaymentId] = useState(null);

  const getPaymentMethods = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/paymethods`
    );
    const result = await response.json();
    if (result?.status === "success") {
      setPaymentMethods(result?.data);
    }
  };

  const getPaypalData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/paymethods/paypal`
    );
    const result = await response.json();

    if (result?.status === "success") {
      setPayPalPaymentId(result?.data?.client_id);
    }
  };

  useEffect(() => {
    try {
      getPaymentMethods();
    } catch (error) {
      console.error("paymentMethods", error);
    }
  }, []);

  useEffect(() => {
    getPaypalData();
  }, []);

  const handleCancel = () => {
    history.push("/");

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
  };

  useEffect(() => {
    const searchInfo = JSON.parse(localStorage.getItem("searchInfo"));
    setDate(searchInfo?.journeydate);

    if (allBookingInformation?.bookingInfo?.seatnumbers) {
      const _convertToArray =
        allBookingInformation?.bookingInfo?.seatnumbers?.split(",");
      setSeatsForBooking(
        _convertToArray.length
          ? _convertToArray
          : [allBookingInformation?.bookingInfo?.seatnumbers]
      );
    }
  }, []);

  const paymentStutasChange = async (e) => {
    // *check seat available or not

    if (date && allBookingInformation?.bookingInfo?.subtripId) {
      const result = await fetchSeatData(
        date,
        allBookingInformation?.bookingInfo?.subtripId
      );

      // Check response data
      if (!result?.seatlayout) {
        toast.error("Something went wrong in data loading!");
      } else {
        // Set in state
        const _seatInfo = result?.seatlayout;

        const isSeatAvailable = [];
        seatsForBooking.forEach((seat) => {
          _seatInfo.forEach((seats) => {
            seats.forEach((item) => {
              if (!item) return;
              if (seat === item?.seatNumber && item.isReserved) {
                isSeatAvailable.push(0);
              } else {
                isSeatAvailable.push(1);
              }
            });
          });
        });
        if (isSeatAvailable.includes(0)) {
          toast.error("Your selected seat booked! please try another...");
          return;
        }
      }
    }

    if (!passengerInformation?.login_email) {
      toast("Fill in the contact email");
      return;
    } else if (!passengerInformation?.login_mobile) {
      toast("Fill in the contact mobile");
      return;
    } else if (!passengerInformation?.first_name) {
      toast("Fill in the passenger name");
      return;
    }

    // else if (!passengerInformation?.last_name) {
    //   toast("set all information");
    //   return;
    // } else if (!passengerInformation?.id_number) {
    //   toast("set all information");
    //   return;
    // } else if (!passengerInformation?.zip_code) {
    //   toast("set all information");
    //   return;
    // } else if (!passengerInformation?.city) {
    //   toast("set all information");
    //   return;
    // } else if (!passengerInformation?.address) {
    //   toast("set all information");
    //   return;
    // } else if (!passengerInformation?.country_id) {
    //   toast("set all information");
    //   return;
    // }

    setPaymentStutas(e.target.value);
    setpaymentGateway("");
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    var ele = document.querySelectorAll("input[type='radio']:checked");
    for (let index = 0; index < ele.length; index++) {
      ele[index].checked = false;
    }
    setPaymentStutas("");
  }, [passengerInformation, setPaymentStutas]);

  const initPayPal = {
    "client-id": payPalClientId,
    currency: "USD",
    intent: "capture",
  };

  return (
    <>
      <PaymentMethod>
        <SinglePayment>
          <PaymentInput
            type="radio"
            id="payNow"
            name="paymentStutas"
            value="Pay Now"
            onChange={(e) => paymentStutasChange(e)}
          />
          <Label htmlFor="payNow">
            {
              languageData?.checkout_page_payNow_radio_btn[
              webSettingData?.language
              ]
            }
          </Label>
        </SinglePayment>

        <SinglePayment>
          <PaymentInput
            type="radio"
            id="payLatter"
            name="paymentStutas"
            value="Pay Latter"
            onChange={(e) => paymentStutasChange(e)}
          />
          <Label htmlFor="payLatter">
            {
              languageData?.checkout_page_payLatter_radio_btn[
              webSettingData?.language
              ]
            }
          </Label>
        </SinglePayment>
      </PaymentMethod>

      <PaymentAndButton>
        {paymentStutas === "Pay Now" && (
          <PaymentUl>
            {paymentMethods?.map((item) => (
              <SinglePayment key={item.id}>
                <PaymentInput
                  type="radio"
                  id={item.name}
                  name="payment"
                  value={item.name}
                  onChange={(e) => setpaymentGateway(e.target.value)}
                />
                <Label htmlFor={item.name}>
                  {languageData?.[item.name][webSettingData?.language]}
                </Label>
              </SinglePayment>
            ))}
          </PaymentUl>
        )}

        {paymentStutas === "Pay Now" && (
          <>
            {(() => {
              if (validateEmail(passengerInformation.login_email)) {
                const emailError = document.getElementById("email-error");
                if (emailError) {
                  emailError.innerHTML = "";
                }
                return (
                  <ButtonWrapper>
                    <CancelButton onClick={handleCancel}>
                      {
                        languageData?.checkout_page_cancel_btn[
                        webSettingData?.language
                        ]
                      }
                    </CancelButton>
                    {paymentGateway ? (
                      <>
                        {paymentGateway === "paypal" && payPalClientId && (
                          <PayPalScriptProvider options={initPayPal}>
                            <PayPalButtons
                              fundingSource="paypal"
                              style={{ layout: "vertical" }}
                              disabled={false}
                            >
                              <NewPayPal
                                passengerInformation={passengerInformation}
                                allBookingInformation={allBookingInformation}
                                setLoading={setLoading}
                              />
                            </PayPalButtons>
                          </PayPalScriptProvider>
                        )}

                        {paymentGateway === "paystack" && (
                          <Paystack
                            passengerInformation={passengerInformation}
                            allBookingInformation={allBookingInformation}
                            setLoading={setLoading}
                          />
                        )}

                        {paymentGateway === "stripe" && (
                          <StripeCheckoutBtn
                            allBookingInformation={allBookingInformation}
                            setLoading={setLoading}
                          />
                        )}

                        {paymentGateway === "razorpay" && (
                          <Razorpay
                            allBookingInformation={allBookingInformation}
                            setLoading={setLoading}
                          />
                        )}

                        {paymentGateway === "flutterwave" && (
                          <Flutterwave
                            allBookingInformation={allBookingInformation}
                            setLoading={setLoading}
                          />
                        )}

                        {paymentGateway === "sslcommerz" && (
                          <SslCommerz
                            allBookingInformation={allBookingInformation}
                            setLoading={setLoading}
                          />
                        )}
                      </>
                    ) : (
                      <PaymentButton
                        onClick={() => handleSubmitPayment(paymentStutas)}
                        btnbgcolor={webSettingData?.buttoncolor}
                        btnbghvcolor={webSettingData?.buttoncolorhover}
                        btntextcolor={webSettingData?.buttontextcolor}
                      >
                        {
                          languageData?.checkout_page_make_payment_btn[
                          webSettingData?.language
                          ]
                        }
                      </PaymentButton>
                    )}
                  </ButtonWrapper>
                );
              } else {
                document.getElementById("email-error").innerHTML =
                  "email is not valid";
              }
            })()}
          </>
        )}
      </PaymentAndButton>

      {paymentStutas === "Pay Latter" && (
        <ButtonWrapper>
          <CancelButton onClick={handleCancel}>
            {languageData?.checkout_page_cancel_btn[webSettingData?.language]}
          </CancelButton>
          <PaymentButton
            onClick={() => handleSubmitPayment(paymentStutas)}
            btnbghvcolor={webSettingData?.buttoncolorhover}
            btnbgcolor={webSettingData?.buttoncolor}
          >
            {
              languageData?.checkout_page_book_your_ticket_btn[
              webSettingData?.language
              ]
            }
          </PaymentButton>
        </ButtonWrapper>
      )}
    </>
  );
};

export default Payment;
