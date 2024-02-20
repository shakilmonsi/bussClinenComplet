import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { PaymentHelper } from "../PaymentHelper";
import { Wrapper } from "./NewPayPal.styles";
import { ticketTracking } from "../../../../redux/action/busAction";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const NewPayPal = ({
  passengerInformation,
  allBookingInformation,
  setLoading,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fareSummery = useSelector((state) => state?.busLists?.fareSummery);
  const [payPalClientId, setPayPalPaymentId] = useState(null);

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
  const onSuccess = (data, actions) => {
    return actions.order.capture().then((details) => {
      setLoading(true);
      PaymentHelper(
        {
          ...allBookingInformation,
          paymentGateway: "1",
        },
        dispatch
      )
        .then((res) => {
          handleTicketTracking(res?.data?.booking_id);
          if (res) {
            console.log("sakib", res);
          }
        })
        .catch((err) => console.error(err));
    });
  };

  if (!fareSummery?.grandTotal) return null;
  const initPayPal = {
    "client-id": payPalClientId,
    currency: "USD",
    intent: "capture",
  };

  if (!payPalClientId) return null;
  return (
    <Wrapper>
      {/* <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: Number((fareSummery?.grandTotal * 100) / 100).toFixed(
                    2
                  ),
                },
              },
            ],
          });
        }}
        onApprove={onSuccess}
      /> */}
      <PayPalScriptProvider options={initPayPal}>
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: Number(
                      (fareSummery?.grandTotal * 100) / 100
                    ).toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={onSuccess}
        />
      </PayPalScriptProvider>
    </Wrapper>
  );
};

export default NewPayPal;
