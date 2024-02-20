import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import { ticketTracking } from "../../../../redux/action/busAction";
import { PaymentHelper } from "../PaymentHelper";
import { Button, SslCommerzWrapper } from "./SslCommerz.styles";

// import * as SSLCommerzPayment from "sslcommerz";

// const SSLCommerzPayment = require("sslcommerz");
// const SSLCommerzPayment = require("sslcommerz-lts");
import * as SSLCommerzPayment from "sslcommerz-lts";

const SslCommerz = ({
  allBookingInformation,
  passengerInformation,
  booking_id,
  paydetail,
  paidamount,
  pay_method,
  setReload,
  setLoading,
}) => {
  const baseUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "http://localhost:3000";

  const { webSettingData } = useSelector((state) => state.busLists);
  const history = useHistory();
  const dispatch = useDispatch();
  const fareSummery = useSelector((state) => state?.busLists?.fareSummery);

  const passengerInfo = allBookingInformation.passengerInformation;

  const getSslCommerzData = async () => {
    setLoading(true);
    PaymentHelper(
      {
        ...allBookingInformation,
        paymentGateway: "5",
        paymentStutas: "Pay Latter",
      },
      dispatch
    )
      .then(async (res) => {
        if (res) {
          // console.log("res:- ", res);

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

          var formdata = new FormData();
          formdata.append(
            "total_amount",
            `${
              paidamount
                ? Number(paidamount).toFixed(2)
                : Number(fareSummery?.grandTotal).toFixed(2)
            }`
          );
          formdata.append("currency", "BDT");
          formdata.append("tran_id", res?.data?.booking_id);
          formdata.append(
            "callback_url",
            `${baseUrl}/check-payment/${res?.data?.booking_id}`
          );
          formdata.append("shipping_method", "No");
          formdata.append("product_name", "Bus Ticket");
          formdata.append("product_category", "Bus");
          formdata.append("product_profile", "general");
          formdata.append(
            "cus_name",
            `${passengerInfo.first_name} ${passengerInfo.last_name}`
          );
          formdata.append("cus_email", passengerInfo.login_email);
          formdata.append("cus_add1", passengerInfo.address);
          formdata.append("cus_add2", "");
          formdata.append("cus_city", passengerInfo.city);
          formdata.append("cus_state", passengerInfo.city);
          formdata.append("cus_postcode", passengerInfo.zip_code);
          formdata.append("cus_country", "Bangladesh");
          formdata.append("cus_phone", passengerInfo.login_mobile);
          formdata.append("cus_fax", passengerInfo.login_mobile);
          formdata.append("multi_card_name", "mastercard");

          const sslcommerz = await fetch(
            `${process.env.REACT_APP_API_MODULE_DOMAIN}/paymethods/sslcommerz`,
            {
              method: "POST",
              body: formdata,
            }
          );
          const result = await sslcommerz.json();
          console.log("result :-", result.data.data);
          window.location.replace(result.data.data);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <SslCommerzWrapper>
      <Button onClick={getSslCommerzData}>
        <img src="/img/sslcommerz.png" alt="" style={{ width: "150px" }} />
      </Button>
    </SslCommerzWrapper>
  );
};

export default SslCommerz;
