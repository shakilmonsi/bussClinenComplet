import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, SslCommerzWrapper } from "./SslCommerz.styles";

const SslCommerzLatter = ({
  booking_id,
  paydetail,
  paidamount,
  pay_method,
  setReload,
}) => {
  const baseUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "http://localhost:3000";
  const [token, setToken] = useState(null);
  const [passengerInfo, setPassengerInformation] = useState({
    address: "",
    city: "",
    country_id: "",
    first_name: "",
    id_number: "",
    id_type: "",
    last_name: "",
    login_email: "",
    login_mobile: "",
    slug: "",
    status: "",
    user_id: "",
    zip_code: "",
  });
  const fareSummery = useSelector((state) => state?.busLists?.fareSummery);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/passangers/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result?.status === "success") {
              setPassengerInformation(result?.data);
              localStorage.setItem(
                "userProfileInfo",
                JSON.stringify(result?.data)
              );
            }
          });
      }, 1000);
    }
  }, [token]);

  const getSslCommerzData = () => {
    if (token) {
      setTimeout(async () => {
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
        formdata.append("tran_id", booking_id);
        formdata.append(
          "callback_url",
          `${baseUrl}/check-payment/${booking_id}`
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
        console.log("result :-", result);
        window.location.replace(result?.data.data);
      }, 1500);
    }
  };

  return (
    <SslCommerzWrapper>
      <Button onClick={getSslCommerzData}>
        <img src="/img/sslcommerz.png" alt="" style={{ width: "150px" }} />
      </Button>
    </SslCommerzWrapper>
  );
};

export default SslCommerzLatter;
