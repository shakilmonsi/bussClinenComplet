import { Wrapper } from "./Flutterwave.styles";
import { useSelector } from "react-redux";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import FlutterwaveImg from "../../../../assets/images/Flutterwave.png";
import { useEffect } from "react";
import { useState } from "react";
import { PaymentHelper } from "../PaymentHelper";
import { useDispatch } from "react-redux";
import { ticketTracking } from "../../../../redux/action/busAction";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Flutterwave = ({ allBookingInformation, setLoading, booking_id }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { webSettingData, fareSummery } = useSelector(
    (state) => state.busLists
  );

  const [publicKey, setPublicKey] = useState("");

  const { passengerInformation } = allBookingInformation;

  const handleTicketTracking = async (id) => {
    setLoading(false);
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

  const config = {
    public_key: publicKey,
    tx_ref: Date.now(),
    amount: Number((fareSummery?.grandTotal * 100) / 100).toFixed(2),
    currency: webSettingData?.currency_code,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: passengerInformation?.login_email ?? "",
      phone_number: passengerInformation?.login_mobile ?? "",
      name: `${passengerInformation?.first_name ?? ""} ${
        passengerInformation?.last_name ?? ""
      }`,
    },
    customizations: {
      title: webSettingData?.apptitle ?? "",
      description: "Payment for items in cart",
      logo: webSettingData?.favicon,
    },
    text: "Pay with Flutterwave!",
  };

  const handleFlutterPayment = useFlutterwave(config);

  const onSuccess = () => {
    if (!booking_id) {
      setLoading(true);
      PaymentHelper(allBookingInformation, dispatch)
        .then((res) => {
          handleTicketTracking(res?.data?.booking_id);
          if (res) {
            console.log("sakib", res);
          }
        })
        .catch((err) => console.error(err));
      // alert("Thanks for doing business with us! Come back soon!!");
    }
  };

  const loadKey = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/paymethods/flutterwave`
    );
    const result = await response.json();

    if (result?.data) {
      setPublicKey(result.data?.public_key);
    }
  };

  useEffect(() => {
    loadKey();
  }, []);

  if (!fareSummery?.grandTotal && !publicKey && !webSettingData) return null;

  return (
    <Wrapper>
      <div
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              response.status === "successful" && onSuccess();
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => alert("Wait! You need this oil, don't go!!!!"),
          });
        }}
      >
        <img
          src={FlutterwaveImg}
          alt="Flutterwave"
          style={{
            maxWidth: "115px",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        />
      </div>
    </Wrapper>
  );
};

export default Flutterwave;
