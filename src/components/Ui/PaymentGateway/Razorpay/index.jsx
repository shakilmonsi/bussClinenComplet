import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ticketTracking } from '../../../../redux/action/busAction';
import { PaymentHelper } from '../PaymentHelper';
import { Button, RazorpayWrapper } from './Razorpay.styles';

const Razorpay = ({
  allBookingInformation,
  passengerInformation,
  booking_id,
  paydetail,
  paidamount,
  pay_method,
  setReload,
  setLoading,
}) => {
  const { webSettingData } = useSelector((state) => state.busLists);
  const history = useHistory();
  const dispatch = useDispatch();
  const fareSummery = useSelector(
    (state) => state?.busLists?.fareSummery
  );

  const paymentLatter = async () => {
    const bookingData = new FormData();

    bookingData.append('booking_id', booking_id);
    bookingData.append('paydetail', paydetail);
    bookingData.append('paidamount', paidamount);
    bookingData.append('pay_method', pay_method);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_MODULE_DOMAIN}/tickets/laterpay`,
        {
          method: 'POST',
          body: bookingData,
        }
      );
      const result = await response.json();

      if (result?.status === 'success') {
        setReload((preState) => !preState);
        toast.success(result?.status);
      }
    } catch (error) {
      console.error('anik', error);
    }
  };

  const getRazorPayData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/paymethods/razor`
    );
    const result = await response.json();
    if (result?.status === 'success') {
      displayRazorpay(result?.data?.secrate_key);
    }
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handleTicketTracking = async (id) => {
    setLoading(false);
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/tickets/bookingid/${id}`
    );
    const result = await response.json();

    if (result?.status === 'success') {
      dispatch(ticketTracking(result?.data));
      history.push('/ticket-traking');
      toast.success('success');
    }
  };

  async function displayRazorpay(secrate_key) {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: secrate_key, // Enter the Key ID generated from the Dashboard
      amount: paidamount
        ? Number(paidamount) * 100
        : Number(fareSummery?.grandTotal * 100).toFixed(2),
      // currency: "CNY",
      currency: webSettingData?.currency_code,
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      //   order_id: order_id,
      handler: async function (response) {
        // razorpay_payment_id
        if (response?.razorpay_payment_id) {
          if (booking_id) {
            paymentLatter();
          } else {
            setLoading(true);
            PaymentHelper(allBookingInformation, dispatch)
              .then((res) => {
                handleTicketTracking(res?.data?.booking_id);
                if (res) {
                  console.log('sakib', res);
                }
              })
              .catch((err) => console.error(err));
          }
        }

        const data = {
          orderCreationId: '834578',
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
      },
      prefill: {
        name: 'Soumya Dey',
        email: 'SoumyaDey@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Soumya Dey Corporate Office',
      },
      theme: {
        color: '#61dafb',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <RazorpayWrapper>
      <Button className="App-link" onClick={getRazorPayData}>
        Razorpay {webSettingData?.currency_symbol}
        {paidamount
          ? Number(paidamount).toFixed(2)
          : Number(fareSummery?.grandTotal).toFixed(2)}
      </Button>
    </RazorpayWrapper>
  );
};

export default Razorpay;
