import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../../bootstrap/Container";
import Layout from "../../bootstrap/Layout";
import Row from "../../bootstrap/Row";
import Spinner from "../../bootstrap/Spinner";
import { ticketTracking } from "../../redux/action/busAction";
import Contact from "../../components/Ui/Contact";
import PassengersCheckList from "../../components/Ui/PassengersCheckList";
import SideBar from "../../components/Ui/SideBar";
import TravellerInformation from "../../components/Ui/TravellerInformation";
import languageData from "../../lib/lang.config.json";
import checkoutLogo from "../../photo/bus-pav.jpg";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  CheckoutBody,
  LeftSide,
  LeftSideHeader,
  LeftSideWrapper,
  RightSide,
  SpinnerWrapper,
} from "./Checkout.styles.js";

const CheckoutPayment = () => {
  const { webSettingData } = useSelector((state) => state.busLists);
  const [width, setWidth] = useState();
  const [discountValue, setDiscountValue] = useState(null);
  const [subTripid, setSubtripid] = useState(null);

  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [passengerInformation, setPassengerInformation] = useState({
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

  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var session = getParameterByName("session"); // "lorem"
  var sdata = getParameterByName("data");

  const paymentLatter = async (
    booking_id,
    paydetail,
    paidamount,
    pay_method
  ) => {
    const bookingData = new FormData();

    bookingData.append("booking_id", booking_id);
    bookingData.append("paydetail", paydetail);
    bookingData.append("paidamount", paidamount);
    bookingData.append("pay_method", pay_method);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_MODULE_DOMAIN}/tickets/laterpay`,
        {
          method: "POST",
          body: bookingData,
        }
      );
      const result = await response.json();

      if (result?.status === "success") {
        handleTicketTracking(booking_id);
        // setReload((preState) => !preState);
        // toast.success(result?.status);
      }
    } catch (error) {
      console.error("anik", error);
    }
  };

  const getPaid = async (session, data, id) => {
    var formdata = new FormData();
    formdata.append("session", session);
    formdata.append("data", data);

    const paiddata = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/paymethods/sslcommerz/validate`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const result = await paiddata.json();
    // console.log("result :-", result);

    if (result.status === "success") {
      if (result.data.status === "VALIDATED") {
        setLoading(true);
        paymentLatter(id, "sslcommerz", result.data.amount, "5");
        setTimeout(() => {
          handleTicketTracking(id);
        }, 1500);
        // console.log("id :-", id);
      } else if (result.data.status === "VALID") {
        setLoading(true);
        paymentLatter(id, "sslcommerz", result.data.amount, "5");
        setTimeout(() => {
          handleTicketTracking(id);
        }, 1500);
        // console.log("id :-", id);
      }
    } else if (result.status === "failed") {
      // console.log("result :-", result);
      toast.success(result?.message);
      // return <Redirect to="/tickets" />;
      setTimeout(() => {
        window.location.replace("/tickets");
      }, 1200);
    }
  };

  useEffect(() => {
    if (session && sdata) {
      getPaid(session, sdata, id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "passengerInformation",
      JSON.stringify(passengerInformation)
    );
  }, [passengerInformation]);

  return (
    <Layout
      title="Checkout"
      description="This is checkout page"
      userProfileInfo={passengerInformation}
    >
      {loading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default CheckoutPayment;
