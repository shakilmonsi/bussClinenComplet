import { toast } from 'react-toastify';
import {
  addError,
  regularBookingInformation,
  updateFareSummery,
} from '../../../redux/action/busAction';

export const payNow = async (
  bookingData,
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
  } = allBookingInformation;

  let firstNames = [],
    lastNames = [],
    mobileNumbers = [],
    identityNumbers = [];

  let returunfirstNames = [],
    returunlastNames = [],
    returunmobileNumbers = [],
    returunidentityNumbers = [];

  for (let [name, value] of Object.entries(values)) {
    if (name.includes('name')) {
      firstNames.push(value);
    }
    if (name.includes('first')) {
      returunfirstNames.push(value);
    }
    if (name.includes('surName')) {
      lastNames.push(value);
    }
    if (name.includes('second')) {
      returunlastNames.push(value);
    }
    if (name.includes('contactNo')) {
      mobileNumbers.push(value);
    }
    if (name.includes('third')) {
      returunmobileNumbers.push(value);
    }
    if (name.includes('passPort')) {
      identityNumbers.push(value);
    }
    if (name.includes('fourth')) {
      returunidentityNumbers.push(value);
    }
  }

  const first_name_new = JSON.stringify(
    Object.assign({}, firstNames)
  );
  const last_name_new = JSON.stringify(Object.assign({}, lastNames));
  const login_mobile_new = JSON.stringify(
    Object.assign({}, mobileNumbers)
  );
  const id_number_new = JSON.stringify(
    Object.assign({}, identityNumbers)
  );
  //retuen

  const return_first_name_new = JSON.stringify(
    Object.assign({}, returunfirstNames)
  );
  const return_last_name_new = JSON.stringify(
    Object.assign({}, returunlastNames)
  );
  const return_login_mobile_new = JSON.stringify(
    Object.assign({}, returunmobileNumbers)
  );
  const return_id_number_new = JSON.stringify(
    Object.assign({}, returunidentityNumbers)
  );

  if (journeyInfo?.isRoundTrip) {
    bookingData.append(
      'pick_location_id',
      returnFirstJourneyInfo.pickLocation
    );
    bookingData.append(
      'drop_location_id',
      returnFirstJourneyInfo.dropLocation
    );

    bookingData.append('pickstand', journeyInfo.pickstand);
    bookingData.append('dropstand', journeyInfo.dropstand);
    bookingData.append('journeydate', journeyInfo.journeydate);
    bookingData.append('returndate', journeyInfo.returnDate);
    // test start
    //extra passenger
    bookingData.append('first_name_new', first_name_new);
    bookingData.append('last_name_new', last_name_new);
    bookingData.append('login_mobile_new', login_mobile_new);
    bookingData.append('id_number_new', id_number_new);

    bookingData.append('partialpay', '');
    bookingData.append('pay_method', paymentGateway);
    bookingData.append('payment_status', 'paid');

    bookingData.append('seatnumbers', journeyInfo?.seatnumbers);
    bookingData.append('grandtotal', regularAmmount);
    if (subTripid === journeyInfo?.subtripId) {
      bookingData.append('discount', discountValue);
    } else {
      bookingData.append('discount', 0);
    }
    bookingData.append('tax', journeyInfoTax);

    // test end
    bookingData.append('trip_id', journeyInfo.trip_id);
    bookingData.append('subtripId', journeyInfo.subtripId);

    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/tickets/booking`,
      {
        method: 'POST',
        body: bookingData,
      }
    );
    const result = await response.json();
    // If success then submit return ticket information
    if (result.status === 'success') {
      if (bookingInfo?.seatnumbers) {
        dispatch(regularBookingInformation(result?.data?.booking_id));

        bookingData.append(
          'pick_location_id',
          searchInfo.pickLocation
        );
        bookingData.append(
          'drop_location_id',
          searchInfo.dropLocation
        );

        bookingData.append('pickstand', bookingInfo.pickstand);
        bookingData.append('dropstand', bookingInfo.dropstand);
        bookingData.append('journeydate', searchInfo.journeydate);
        bookingData.append('returndate', '');

        // test start

        //extra passenger

        bookingData.append('first_name_new', return_first_name_new);
        bookingData.append('last_name_new', return_last_name_new);
        bookingData.append(
          'login_mobile_new',
          return_login_mobile_new
        );
        bookingData.append('id_number_new', return_id_number_new);

        bookingData.append('partialpay', '');
        bookingData.append('pay_method', paymentGateway);
        bookingData.append('payment_status', 'paid');

        bookingData.append('seatnumbers', bookingInfo?.seatnumbers);
        bookingData.append('grandtotal', returnAmmount);
        

        if (subTripid === bookingInfo?.subtripId) {
          bookingData.append('discount', discountValue);
        } else {
          bookingData.append('discount', 0);
        }
        bookingData.append('tax', bookingInfoTax);

        // test end

        bookingData.append('trip_id', bookingInfo.trip_id);
        bookingData.append('subtripId', bookingInfo.subtripId);

        const response = await fetch(
          `${process.env.REACT_APP_API_MODULE_DOMAIN}/tickets/booking`,
          {
            method: 'POST',
            body: bookingData,
          }
        );
        const result2 = await response.json();
        if (result2.status === 'success') {
          dispatch(updateFareSummery(null));
          localStorage.removeItem('journeyInfo');
          localStorage.removeItem('searchInfo');
          localStorage.removeItem('returnFirstJourneyInfo');
          localStorage.removeItem('bookingInfo');

          toast.success('Your booking has been done successfully');
          return Promise.resolve(result2);
        }
        return Promise.reject(result2);
      } else {
        dispatch(addError(''));
        dispatch(updateFareSummery(null));
        localStorage.removeItem('journeyInfo');
        localStorage.removeItem('searchInfo');
        localStorage.removeItem('returnFirstJourneyInfo');
        localStorage.removeItem('bookingInfo');
        return Promise.resolve(result);
      }
    }
    return Promise.reject(result);
  } else if (!bookingInfo?.isRoundTrip) {
    bookingData.append('partialpay', '');
    bookingData.append('pay_method', paymentGateway);
    bookingData.append('payment_status', 'paid');

    //extra passenger
    bookingData.append('first_name_new', first_name_new);
    bookingData.append('last_name_new', last_name_new);
    bookingData.append('login_mobile_new', login_mobile_new);
    bookingData.append('id_number_new', id_number_new);

    bookingData.append('grandtotal', returnAmmount);
    bookingData.append('discount', discountValue ? discountValue : 0);
    bookingData.append('tax', bookingInfoTax);

    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/tickets/booking`,
      {
        method: 'POST',
        body: bookingData,
      }
    );
    const result = await response.json();
    if (result?.status === 'success') {
      localStorage.removeItem('searchInfo');
      localStorage.removeItem('bookingInfo');
      setValues({
        login_email: '',
        login_mobile: '',
        first_name: '',
        last_name: '',
        id_type: '',
        country_id: '',
        id_number: '',
        address: '',
        city: '',
        zip_code: '',
      });

      toast.success('Your booking has been done successfully');
      return Promise.resolve(result);
    }
    return Promise.reject(result);
  }
};
