import React, { useEffect, useRef } from "react";

const PayPal = ({ totalprice }) => {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            indent: " CAPTURE",
            purchase_units: [
              {
                description: "cool looking table",
                amount: {
                  currency_code: "CAD",
                  value: "50",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.error("error", err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default PayPal;
