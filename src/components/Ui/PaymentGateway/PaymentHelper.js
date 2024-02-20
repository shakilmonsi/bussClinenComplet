import { toast } from 'react-toastify';
import { payLatter } from './payLatter';
import { payNow } from './payNow';

export const PaymentHelper = async (
  allBookingInformation,
  dispatch
) => {
  const {
    totalprice,
    passengerInformation,
    values,
    setValues,
    paymentStutas,
    paymentGateway,
    fareSummry,
    searchInfo,
    bookingInfo,
    journeyInfo,
    returnSearchInfo,
    returnFirstJourneyInfo,
    returnAmmount,
    regularAmmount,
    discountValue,
    subTripid,
    journeyInfoTax,
    bookingInfoTax,
    token,
  } = allBookingInformation;
  const bookingData = new FormData();

  if (!passengerInformation.first_name) {
    toast.error('First name is required');
    return;
  } else if (paymentStutas === 'Pay Now' && !paymentGateway) {
    toast.error('Please select your payment method');
    return;
  }

  bookingData.append('login_email', passengerInformation.login_email);
  if (!token) {
    bookingData.append(
      'login_mobile',
      values?.mobile_country_code.concat(
        passengerInformation?.login_mobile
      )
    );
  } else {
    bookingData.append(
      'login_mobile',
      passengerInformation?.login_mobile
    );
  }

  bookingData.append(
    'first_name',
    ` ${passengerInformation.gender || 'Mr'} ${
      passengerInformation.first_name
    }`
  );
  bookingData.append('last_name', passengerInformation.last_name);
  bookingData.append(
    'id_type',
    passengerInformation.id_type || 'Nid'
  );
  bookingData.append('country_id', passengerInformation.country_id);
  bookingData.append('id_number', passengerInformation.id_number);
  bookingData.append('address', passengerInformation.address);
  bookingData.append('city', passengerInformation.city);
  bookingData.append('zip_code', passengerInformation.zip_code);

  bookingData.append('trip_id', bookingInfo?.trip_id);
  bookingData.append('subtripId', bookingInfo?.subtripId);
  bookingData.append('pick_location_id', searchInfo?.pickLocation);
  bookingData.append('drop_location_id', searchInfo?.dropLocation);
  bookingData.append('pickstand', bookingInfo?.pickstand);
  bookingData.append('dropstand', bookingInfo?.dropstand);
  bookingData.append('totalprice', bookingInfo?.totalprice);

  bookingData.append('aseat', bookingInfo?.aseat);
  bookingData.append('cseat', bookingInfo?.cseat);
  bookingData.append('spseat', bookingInfo?.spseat);

  bookingData.append('journeydate', searchInfo?.journeydate);
  bookingData.append('returndate', searchInfo?.returnDate);

  bookingData.append('paydetail', 'This is pay details');
  bookingData.append('vehicle_id', bookingInfo?.vehicle_id);
  bookingData.append('seatnumbers', bookingInfo?.seatnumbers);
  bookingData.append('totalseat', bookingInfo?.totalseat);

  // Extra passenger info

  try {
    if (paymentStutas === 'Pay Latter') {
      return await payLatter(
        bookingData,
        allBookingInformation,
        dispatch
      );
    } else if (paymentStutas === 'Pay Now') {
      return await payNow(
        bookingData,
        allBookingInformation,
        dispatch
      );
    }
  } catch (error) {
    console.error(error);
  }
};
