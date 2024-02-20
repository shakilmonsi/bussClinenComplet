import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import Footer from "../../components/Ui/Footer";
import Header from "../../components/Ui/Header";
import PassengersCheckList from "../../components/Ui/PassengersCheckList";
import NewPayPal from "../../components/Ui/PaymentGateway/NewPayPal";
import Paystack from "../../components/Ui/PaymentGateway/Paystack";
import Razorpay from "../../components/Ui/PaymentGateway/Razorpay";
import StripeCheckoutBtn from "../../components/Ui/PaymentGateway/StripeCheckoutBtn";
import RegularTicketTracking from "../../components/Ui/RegularTicketTracking";
import {
  Close,
  Content,
  Input,
  Modal,
  PaymentBtn,
  PaymentBtns,
  PaymentList,
  PaymentTitle,
  PaymentWrapper,
  SinglePayment,
  StyledPopup,
  Textarea,
} from "../../components/Ui/SingleTicket/SingleTicket.styles";
import TicketTrackingBody from "../../components/Ui/TicketTrackingBody";
import { getLocation } from "../../helpers";

import {
  CompanyName,
  CustomerBookingId,
  DownloadButton,
  DownloadButtonWrapper,
  InnerBody,
  LeftSide,
  Logo,
  PaymentButton,
  RightSide,
  RightSideProperty,
  TermAndConditionWrapper,
  TicketHeaderWrapper,
} from "./TicketTraking.styles";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Flutterwave from "../../components/Ui/PaymentGateway/Flutterwave";
import SslCommerzLatter from "../../components/Ui/PaymentGateway/SslCommerz/sslCommerzLatter";

const TicketTraking = ({ maxWidth }) => {
  const {
    ticketTracking,
    webSettingData,
    regularBookingInformation,
    languageData,
  } = useSelector((state) => state.busLists);
  const [boardingAndDroppingPoint, setBoardingAndDroppingPoint] = useState([]);
  const history = useHistory();
  const pathName = history.location.pathname === "/ticket-traking";
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [comments, setComments] = useState("");
  const [allPaymentGateway, setAllPaymentGateway] = useState(null);
  const [singlePayment, setSinglePayment] = useState("");

  const [paypalShow, setPaypalShow] = useState(false);
  const [paystackShow, setPaystacklShow] = useState(false);
  const [stripeShow, setStripeShow] = useState(false);
  const [razorpayShow, setRazorpayShow] = useState(false);
  const [sslCommerzShow, setSslCommerzShow] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [reload, setReload] = useState(false);
  const [passengerInformation, setPassengerInformation] = useState(null);
  const [regularBookingTraking, setRegularBookingTraking] = useState(null);
  const [payPalClientId, setPayPalPaymentId] = useState(null);
  const [flutterwaveShow, setFlutterwaveShow] = useState(false);

  // const [languageData, setLanguageData] = useState();

  const regularHandleTicketTracking = async (id) => {
    if (id !== " ") {
      const response = await fetch(
        `${process.env.REACT_APP_API_MODULE_DOMAIN}/tickets/bookingid/${id}`
      );
      const result = await response.json();

      if (result?.status === "success") {
        setRegularBookingTraking(result?.data);
      }
    }
  };

  useEffect(() => {
    regularHandleTicketTracking(regularBookingInformation);
  }, [regularBookingInformation]);

  useEffect(() => {
    setPassengerInformation(
      JSON.parse(localStorage.getItem("passengerInformation"))
    );
  }, []);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);
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
    getPaypalData();
  }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/paymethods`)
      .then((res) => res.json())
      .then((result) => setAllPaymentGateway(result?.data));

    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));

    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/locations`)
      .then((res) => res.json())
      .then((result) => setBoardingAndDroppingPoint(result?.data));
  }, [reload]);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = () => {
    const input = document.getElementById("download");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      // pdf.addImage(imgData, "JPEG", 16, 0, 180, 310);

      if (window.innerWidth < 767) {
        pdf.addImage(imgData, "JPEG", 15, 0, 190, 310);
      } else {
        pdf.addImage(imgData, "JPEG", 0, 0);
      }
      pdf.save(`${ticketTracking?.fullName}.pdf`);
    });
  };

  if (pathName) {
    if (!ticketTracking) {
      history.push("/");
    }
  }

  const handlePayment = (item) => {
    console.log("anik", item);
  };
  const handleSubmitPayment = async (paymentStutas) => {
    if (comments === "") {
      toast.error("set comments");
      return;
    } else if (singlePayment === "paypal") {
      setPaypalShow(true);
      setPaystacklShow(false);
      setStripeShow(false);
      setRazorpayShow(false);
      setSslCommerzShow(false);
      setFlutterwaveShow(false);
    } else if (singlePayment === "paystack") {
      setPaystacklShow(true);
      setPaypalShow(false);
      setStripeShow(false);
      setRazorpayShow(false);
      setSslCommerzShow(false);
      setFlutterwaveShow(false);
    } else if (singlePayment === "stripe") {
      setStripeShow(true);
      setPaypalShow(false);
      setPaystacklShow(false);
      setRazorpayShow(false);
      setSslCommerzShow(false);
      setFlutterwaveShow(false);
    } else if (singlePayment === "razorpay") {
      setRazorpayShow(true);
      setStripeShow(false);
      setPaypalShow(false);
      setPaystacklShow(false);
      setSslCommerzShow(false);
      setFlutterwaveShow(false);
    } else if (singlePayment === "sslcommerz") {
      setSslCommerzShow(true);
      setRazorpayShow(false);
      setStripeShow(false);
      setPaypalShow(false);
      setPaystacklShow(false);
      setFlutterwaveShow(false);
    } else if (singlePayment === "flutterwave") {
      setFlutterwaveShow(true);
      setSslCommerzShow(false);
      setRazorpayShow(false);
      setStripeShow(false);
      setPaypalShow(false);
      setPaystacklShow(false);
    }
  };

  useEffect(() => {
    const result = allPaymentGateway?.find(
      (item) => item?.name === singlePayment
    );
    if (result) {
      setPaymentMethod(result?.id);
    }
  }, [allPaymentGateway, singlePayment]);

  const initPayPal = {
    "client-id": payPalClientId,
    currency: "USD",
    intent: "capture",
  };

  return (
    <>
      {pathName && <Header userProfileInfo={userProfileInfo} />}

      {pathName &&
        regularBookingTraking &&
        regularBookingInformation !== " " && (
          <RegularTicketTracking
            regularBookingTraking={regularBookingTraking}
            maxWidth={maxWidth}
          />
        )}

      <InnerBody maxWidth={maxWidth}>
        <div id="ticket">
          <div id="download">
            <div ref={componentRef}>
              {" "}
              <div style={{ padding: "50px" }}>
                <TicketHeaderWrapper>
                  <LeftSide>
                    <Logo src={webSettingData?.headerlogo} alt="logo" />
                    <CompanyName>
                      {" "}
                      {ticketTracking?.company_name} ({ticketTracking?.company})
                    </CompanyName>
                  </LeftSide>

                  <RightSide>
                    <li>
                      <RightSideProperty>
                        {
                          languageData?.ticket_traking_page_name[
                          webSettingData?.language
                          ]
                        }
                      </RightSideProperty>
                      : <strong>{ticketTracking?.fullName}</strong>
                    </li>
                    <li>
                      <RightSideProperty>
                        {
                          languageData?.ticket_traking_page_phone[
                          webSettingData?.language
                          ]
                        }
                      </RightSideProperty>
                      : {ticketTracking?.mobile}
                    </li>
                    <li>
                      <RightSideProperty>
                        {
                          languageData?.ticket_traking_page_booking_id[
                          webSettingData?.language
                          ]
                        }
                      </RightSideProperty>
                      : <strong>{ticketTracking?.booking_id}</strong>
                    </li>
                    <li>
                      {getLocation(ticketTracking, boardingAndDroppingPoint)}
                    </li>
                    {ticketTracking?.cancel_status === "1" && (
                      <li>status: cancel</li>
                    )}
                    {ticketTracking?.refund === "1" && (
                      <li>status: refunded</li>
                    )}
                    {ticketTracking?.cancel_status === "0" &&
                      ticketTracking?.refund === "0" && (
                        <>
                          {ticketTracking?.payment_status === "paid" && (
                            <li>status: paid</li>
                          )}
                          {ticketTracking?.payment_status === "unpaid" && (
                            <li>status: unpaid</li>
                          )}
                          {ticketTracking?.payment_status === "partial" && (
                            <li>status: partial</li>
                          )}
                        </>
                      )}
                  </RightSide>
                </TicketHeaderWrapper>

                <TicketTrackingBody />
                {pathName && (
                  <TermAndConditionWrapper>
                    <PassengersCheckList shadow="false" />
                  </TermAndConditionWrapper>
                )}
              </div>
            </div>
          </div>
          {pathName && (
            <>
              <DownloadButtonWrapper>
                <DownloadButton
                  onClick={handlePrint}
                  btnBgColor={webSettingData?.buttoncolor}
                  btnBgHvColor={webSettingData?.buttoncolorhover}
                  btnTextColor={webSettingData?.buttontextcolor}
                >
                  {
                    languageData?.ticket_traking_page_print_btn[
                    webSettingData?.language
                    ]
                  }
                </DownloadButton>
                <DownloadButton
                  onClick={handleDownload}
                  btnBgColor={webSettingData?.buttoncolor}
                  btnBgHvColor={webSettingData?.buttoncolorhover}
                  btnTextColor={webSettingData?.buttontextcolor}
                >
                  {
                    languageData?.ticket_traking_page_download_btn[
                    webSettingData?.language
                    ]
                  }
                </DownloadButton>

                {ticketTracking?.payment_status !== "paid" &&
                  ticketTracking?.cancel_status === "0" &&
                  ticketTracking?.refund === "0" &&
                  !reload && (
                    <StyledPopup
                      trigger={
                        <PaymentButton
                          onClick={() => handlePayment}
                          btnBgColor={webSettingData?.buttoncolor}
                          btnBgHvColor={webSettingData?.buttoncolorhover}
                          btnTextColor={webSettingData?.buttontextcolor}
                        >
                          Payment
                        </PaymentButton>
                      }
                    >
                      {(close) => (
                        <Modal>
                          <Close onClick={close}>&times;</Close>

                          <Content>
                            <CustomerBookingId>
                              {ticketTracking?.booking_id}
                            </CustomerBookingId>
                            <Textarea
                              name=""
                              id=""
                              cols="30"
                              rows="4"
                              placeholder="comments"
                              onChange={(e) => setComments(e.target.value)}
                            ></Textarea>
                            <PaymentList>
                              {allPaymentGateway?.map((item) => (
                                <li key={item.id}>
                                  <Input
                                    type="radio"
                                    id={item?.name}
                                    name="payment"
                                    value={item?.name}
                                    onChange={(e) =>
                                      setSinglePayment(e.target.value)
                                    }
                                  />
                                  <PaymentTitle htmlFor={item?.name}>
                                    {item?.name}
                                  </PaymentTitle>
                                </li>
                              ))}
                            </PaymentList>

                            <PaymentWrapper>
                              <PaymentBtn onClick={handleSubmitPayment}>
                                payment
                              </PaymentBtn>
                            </PaymentWrapper>

                            <PaymentBtns>
                              {paypalShow && payPalClientId && (
                                <PayPalScriptProvider options={initPayPal}>
                                  <SinglePayment>
                                    <PayPalButtons
                                      fundingSource="paypal"
                                      style={{
                                        layout: "vertical",
                                      }}
                                      disabled={false}
                                    >
                                      <NewPayPal
                                        passengerInformation={
                                          passengerInformation
                                        }
                                        allBookingInformation={ticketTracking}
                                      />
                                    </PayPalButtons>
                                  </SinglePayment>
                                </PayPalScriptProvider>
                              )}
                              {paystackShow && (
                                <SinglePayment>
                                  <Paystack
                                    booking_id={ticketTracking?.booking_id}
                                    paydetail={comments}
                                    paidamount={ticketTracking?.paidamount}
                                    pay_method={paymentMethod}
                                    email={
                                      userProfileInfo?.login_email
                                        ? userProfileInfo?.login_email
                                        : passengerInformation?.login_email
                                    }
                                    phone={
                                      userProfileInfo?.login_mobile
                                        ? userProfileInfo?.login_mobile
                                        : passengerInformation?.login_mobile
                                    }
                                    name={
                                      userProfileInfo?.first_name
                                        ? userProfileInfo?.first_name
                                        : passengerInformation?.first_name
                                    }
                                    setReload={setReload}
                                  />
                                </SinglePayment>
                              )}
                              {stripeShow && (
                                <SinglePayment>
                                  <StripeCheckoutBtn
                                    booking_id={ticketTracking?.booking_id}
                                    paydetail={comments}
                                    paidamount={ticketTracking?.paidamount}
                                    pay_method={paymentMethod}
                                    allBookingInformation={ticketTracking}
                                    setReload={setReload}
                                  />
                                </SinglePayment>
                              )}
                              {razorpayShow && (
                                <SinglePayment>
                                  <Razorpay
                                    booking_id={ticketTracking?.booking_id}
                                    paydetail={comments}
                                    paidamount={ticketTracking?.paidamount}
                                    pay_method={paymentMethod}
                                    setReload={setReload}
                                  />
                                </SinglePayment>
                              )}
                              {sslCommerzShow && (
                                <SinglePayment>
                                  <SslCommerzLatter
                                    booking_id={ticketTracking?.booking_id}
                                    paydetail={comments}
                                    paidamount={ticketTracking?.paidamount}
                                    pay_method={paymentMethod}
                                    setReload={setReload}
                                  />
                                </SinglePayment>
                              )}
                              {flutterwaveShow && (
                                <SinglePayment>
                                  <Flutterwave
                                    booking_id={ticketTracking?.booking_id}
                                    allBookingInformation={ticketTracking}
                                    paydetail={comments}
                                    paidamount={ticketTracking?.paidamount}
                                    pay_method={paymentMethod}
                                    setReload={setReload}
                                  />
                                </SinglePayment>
                              )}
                            </PaymentBtns>
                          </Content>
                        </Modal>
                      )}
                    </StyledPopup>
                  )}
              </DownloadButtonWrapper>
            </>
          )}
        </div>

        {/* {pathName && (
          <DownloadButtonWrapper>
            <DownloadButton onClick={() => handleDownload("ticket")}>Download</DownloadButton>
          </DownloadButtonWrapper>
        )} */}
      </InnerBody>

      {pathName && <Footer />}
    </>
  );
};

export default TicketTraking;
