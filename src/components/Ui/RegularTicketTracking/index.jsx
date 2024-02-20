import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { getLocation } from "../../../helpers";

import {
  Close,
  Content,
  Input,
  Modal,
  PaymentBtn,
  PaymentBtns,
  PaymentList,
  PaymentWrapper,
  SinglePayment,
  StyledPopup,
  Textarea,
} from "../../Ui/SingleTicket/SingleTicket.styles";

import logo from "../../../assets/images/busLogo.png";
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
} from "../../../pages/TicketTraking/TicketTraking.styles";
import PassengersCheckList from "../PassengersCheckList";
import NewPayPal from "../PaymentGateway/NewPayPal";
import Paystack from "../PaymentGateway/Paystack";
import Razorpay from "../PaymentGateway/Razorpay";

import StripeCheckoutBtn from "../PaymentGateway/StripeCheckoutBtn";
import RegularTicketTrackingBody from "../RegularTicketTrackingBody";

const RegularTicketTracking = ({ regularBookingTraking, maxWidth }) => {
  const { webSettingData,languageData } = useSelector((state) => state.busLists);
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
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [reload, setReload] = useState(false);
  const [passengerInformation, setPassengerInformation] = useState(null);
  // const [languageData, setLanguageData] = useState();

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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/paymethods`)
      .then((res) => res.json())
      .then((result) => setAllPaymentGateway(result?.data));

    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));

    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/locations`)
      .then((res) => res.json())
      .then((result) => setBoardingAndDroppingPoint(result?.data));
  }, [reload]);

  const componentRef2 = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef2.current,
  });

  const handleDownload = () => {
    const input = document.getElementById("download2");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0, 211, 298);
      pdf.save(`${regularBookingTraking?.fullName}.pdf`);
    });
  };

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
    } else if (singlePayment === "paystack") {
      setPaystacklShow(true);
      setPaypalShow(false);
      setStripeShow(false);
      setRazorpayShow(false);
    } else if (singlePayment === "stripe") {
      setStripeShow(true);
      setPaypalShow(false);
      setPaystacklShow(false);
      setRazorpayShow(false);
    } else if (singlePayment === "razorpay") {
      setRazorpayShow(true);
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

  return (
    <InnerBody maxWidth={maxWidth}>
      <div id="ticket">
        <div id="download2">
          <div ref={componentRef2}>
            <div style={{ padding: "50px" }}>
              <TicketHeaderWrapper>
                <LeftSide>
                  <Logo src={logo} alt="logo" />
                  <CompanyName>
                    {" "}
                    {regularBookingTraking?.company_name} (
                    {regularBookingTraking?.company})
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
                    : <strong>{regularBookingTraking?.fullName}</strong>
                  </li>
                  <li>
                    <RightSideProperty>
                      {
                        languageData?.ticket_traking_page_phone[
                          webSettingData?.language
                        ]
                      }
                    </RightSideProperty>
                    : {regularBookingTraking?.mobile}
                  </li>
                  <li>
                    <RightSideProperty>
                      {
                        languageData?.ticket_traking_page_booking_id[
                          webSettingData?.language
                        ]
                      }
                    </RightSideProperty>
                    : <strong>{regularBookingTraking?.booking_id}</strong>
                  </li>
                  <li>
                    {getLocation(
                      regularBookingTraking,
                      boardingAndDroppingPoint
                    )}
                  </li>
                  {regularBookingTraking?.cancel_status === "1" && (
                    <li>status: cancel</li>
                  )}
                  {regularBookingTraking?.refund === "1" && (
                    <li>status: refunded</li>
                  )}
                  {regularBookingTraking?.cancel_status === "0" &&
                    regularBookingTraking?.refund === "0" && (
                      <>
                        {regularBookingTraking?.payment_status === "paid" && (
                          <li>status: paid</li>
                        )}
                        {regularBookingTraking?.payment_status === "unpaid" && (
                          <li>status: unpaid</li>
                        )}
                        {regularBookingTraking?.payment_status ===
                          "partial" && <li>status: partial</li>}
                      </>
                    )}
                </RightSide>
              </TicketHeaderWrapper>

              <RegularTicketTrackingBody
                regularBookingTraking={regularBookingTraking}
              />
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
                onClick={() => handlePrint("download2")}
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

              {regularBookingTraking?.payment_status !== "paid" &&
                regularBookingTraking?.cancel_status === "0" &&
                regularBookingTraking?.refund === "0" &&
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
                            {regularBookingTraking?.booking_id}
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
                                <label htmlFor={item?.name}>{item?.name}</label>
                              </li>
                            ))}
                          </PaymentList>

                          <PaymentWrapper>
                            <PaymentBtn onClick={handleSubmitPayment}>
                              payment
                            </PaymentBtn>
                          </PaymentWrapper>

                          <PaymentBtns>
                            {paypalShow && (
                              <SinglePayment>
                                <NewPayPal />
                              </SinglePayment>
                            )}
                            {paystackShow && (
                              <SinglePayment>
                                <Paystack
                                  booking_id={regularBookingTraking?.booking_id}
                                  paydetail={comments}
                                  paidamount={regularBookingTraking?.paidamount}
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
                                  booking_id={regularBookingTraking?.booking_id}
                                  paydetail={comments}
                                  paidamount={regularBookingTraking?.paidamount}
                                  pay_method={paymentMethod}
                                  setReload={setReload}
                                />
                              </SinglePayment>
                            )}
                            {razorpayShow && (
                              <SinglePayment>
                                <Razorpay
                                  booking_id={regularBookingTraking?.booking_id}
                                  paydetail={comments}
                                  paidamount={regularBookingTraking?.paidamount}
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
    </InnerBody>
  );
};

export default RegularTicketTracking;
