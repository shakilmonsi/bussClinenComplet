import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ticketTracking } from '../../../../redux/action/busAction';
import { PaymentHelper } from '../../PaymentGateway/PaymentHelper';
import { PaymentButton } from './Paystack.styles';

const Paystack = ({
  passengerInformation,
  allBookingInformation,
  booking_id,
  paydetail,
  paidamount,
  pay_method,
  email,
  phone,
  name,
  setReload,
  setLoading,
}) => {
  const { webSettingData } = useSelector((state) => state.busLists);
  const [paystackData, setPaystackData] = useState(null);
  const fareSummery = useSelector(
    (state) => state?.busLists?.fareSummery
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const paymentLatter = async () => {
    const bookingData = new FormData();

    bookingData.append('booking_id', booking_id);
    bookingData.append('paydetail', paydetail);
    bookingData.append('paidamount', paidamount);
    bookingData.append('pay_method', pay_method);

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
  };

  const totalPrice = (
    paidamount
      ? Number(paidamount) * 100
      : fareSummery?.grandTotal * 100
  ).toFixed(2);

  const getPaystackData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/paymethods/paystack`
    );
    const result = await response.json();

    if (result?.status === 'success') {
      setPaystackData(result?.data);
    }
  };

  useEffect(() => {
    try {
      getPaystackData();
    } catch (error) {
      console.error('paystack', error);
    }
  }, []);

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

  const componentProps = {
    email: email ? email : passengerInformation?.login_email,
    amount: totalPrice,
    currency: webSettingData?.currency_code,
    metadata: {
      name: name ? name : passengerInformation?.first_name,
      phone: phone ? phone : passengerInformation?.login_mobile,
    },
    publicKey: paystackData?.private_key,
    text: 'PayStack',
    onSuccess: (message) => {
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
        // alert("Thanks for doing business with us! Come back soon!!");
      }
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return (
    <div>
      <div className="checkout">
        <div className="checkout-form">
          <PaymentButton
            btnBgColor={webSettingData?.buttoncolor}
            btnBgHvColor={webSettingData?.buttoncolorhover}
            btnTextColor={webSettingData?.buttontextcolor}
            className="paystack-button"
            id="testbtn"
            {...componentProps}
          />
        </div>
      </div>
    </div>
  );
};

export default Paystack;
