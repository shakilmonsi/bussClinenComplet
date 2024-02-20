import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { ticketTracking } from "../../../../redux/action/busAction";
import { PaymentHelper } from "../PaymentHelper";
import Spinner from "../../../../bootstrap/Spinner";

const StripeCheckoutBtn = ({
  allBookingInformation,
  passengerInformation,
  booking_id,
  paydetail,
  paidamount,
  pay_method,
  setReload,
  setLoading,
}) => {
  const fareSummery = useSelector((state) => state?.busLists?.fareSummery);
  const { webSettingData } = useSelector((state) => state.busLists);
  const [stripeLoading, setStripeLoading] = useState(true);
  const [stripeData, setStripeData] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const getStripeData = async () => {
    setStripeLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/paymethods/stripe`
    );

    const result = await response.json();
    if (result?.status === "success") {
      setStripeData(result?.data);
    }
    setStripeLoading(false);
  };

  const paymentLatter = async () => {
    const bookingData = new FormData();

    bookingData.append("booking_id", booking_id);
    bookingData.append("paydetail", paydetail);
    bookingData.append("paidamount", paidamount);
    bookingData.append("pay_method", pay_method);

    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/tickets/laterpay`,
      {
        method: "POST",
        body: bookingData,
      }
    );
    const result = await response.json();
    if (result?.status === "success") {
      setReload((preState) => !preState);
      toast.success(result?.status);
    }
  };

  useEffect(() => {
    try {
      getStripeData();
    } catch (error) {
      console.error("stripe", error);
    }
  }, []);

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

  const onToken = (token) => {
    if (booking_id) {
      paymentLatter();
    } else {
      setLoading(true);
      PaymentHelper(allBookingInformation, dispatch)
        .then((res) => {
          handleTicketTracking(res?.data?.booking_id);
          if (res) {
            console.log("sakib", res);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  if (
    !fareSummery &&
    !webSettingData?.currency_code &&
    !stripeData?.private_key
  )
    return <div>Loading...</div>;

  return (
    <div>
      {stripeLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <StripeCheckout
            label="Stripe"
            name="Bus Ticket"
            billingAddress
            shippingAddress
            description={`Your total is ${webSettingData?.currency_symbol}${
              paidamount ? Number(paidamount) : fareSummery?.grandTotal
            }`}
            amount={
              paidamount
                ? Number(paidamount) * 100
                : fareSummery?.grandTotal * 100
            }
            currency={webSettingData?.currency_code}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={stripeData?.private_key}
          />
        </>
      )}
    </div>
  );
};

export default StripeCheckoutBtn;
