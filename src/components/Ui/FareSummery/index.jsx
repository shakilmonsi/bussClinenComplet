import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateFareSummery } from "../../../redux/action/busAction";
import {
  Amount,
  BaseFare,
  DepartureAmmount,
  Discount,
  FareSummaryHeader,
  FareSummaryWrapper,
  SubTotalAmount,
  Summary,
  TotalAmount,
} from "./FareSummery.styles";

const FareSummery = ({ discountValue, subTripid, setSubtripid }) => {
  const dispatch = useDispatch();

  const { webSettingData, languageData } = useSelector(
    (state) => state.busLists
  );
  const [taxApi, setTaxApi] = useState([]);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [journeyInfo, setJourneyInfo] = useState(null);
  const [discount, setDiscount] = useState(null);
  // const [languageData, setLanguageData] = useState();

  useEffect(() => {
    setJourneyInfo(JSON.parse(localStorage.getItem("journeyInfo")));
    setBookingInfo(JSON.parse(localStorage.getItem("bookingInfo")));

    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/taxs`)
      .then((res) => res.json())
      .then((data) => {
        setTaxApi(data);
      });
  }, []);
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);

  useEffect(() => {
    setDiscount(JSON.parse(localStorage.getItem("discount")));
  }, [discountValue, subTripid]);

  const tax = (taxAmount) => {
    let value = 0;
    for (let i = 0; i < taxApi?.data?.length; i++) {
      value = value + (taxApi?.data[i]?.value * taxAmount) / 100;
    }

    return isNaN(value) ? 0 : value;
  };

  const getGrandTotalAmount = () => {
    if (taxApi?.tax_type === "exclusive") {
      const totalAmount =
        Number(tax(bookingInfo?.totalprice)) +
        Number(bookingInfo?.totalprice ? bookingInfo?.totalprice : 0);
      const totalReturnTicketFare =
        Number(tax(journeyInfo?.totalprice)) +
        Number(journeyInfo?.totalprice ? journeyInfo?.totalprice : 0);

      if (journeyInfo) {
        return totalAmount + totalReturnTicketFare;
      }

      return bookingInfo && bookingInfo?.totalprice ? totalAmount : 0;
    } else {
      const totalAmount = Number(
        bookingInfo?.totalprice ? bookingInfo?.totalprice : 0
      );
      const totalReturnTicketFare = Number(
        journeyInfo?.totalprice ? journeyInfo?.totalprice : 0
      );

      if (journeyInfo) {
        return totalAmount + totalReturnTicketFare;
      }

      return bookingInfo && bookingInfo?.totalprice ? totalAmount : 0;
    }
  };

  useEffect(() => {
    const fareSummery = {
      tax: Number(tax(bookingInfo?.totalprice) + tax(journeyInfo?.totalprice)),
      grandTotal:
        getGrandTotalAmount() -
        Number(discount?.discount ? discount?.discount : 0),
    };

    dispatch(updateFareSummery(fareSummery));
  }, [taxApi, discountValue, discount?.discount]);

  // start taxpercentage
  useEffect(() => {
    const singleTax = (ammount) => {
      let taxId = [];
      let taxvalue = [];

      for (let i = 0; i < taxApi?.data?.length; i++) {
        taxId.push(taxApi?.data[i]?.id);
        taxvalue.push((taxApi?.data[i]?.value * ammount) / 100);
      }

      return `${taxId}-${taxvalue}`;
    };

    if (journeyInfo?.isRoundTrip && bookingInfo) {
      const single = singleTax(journeyInfo?.totalprice);
      const double = singleTax(bookingInfo?.totalprice);
      const singleId = single.split("-")[0];
      const singleValue = single.split("-")[1];
      const doubleId = double.split("-")[0];
      const doubleValue = double.split("-")[1];

      const taxPercentage = {
        singleId: singleId,
        singleValue: singleValue,
        doubleId: doubleId,
        doubleValue: doubleValue,
      };
    } else if (!journeyInfo?.isRoundTrip && bookingInfo) {
      const single = singleTax(bookingInfo?.totalprice);
      const singleId = single.split("-")[0];
      const singleValue = single.split("-")[1];

      const taxPercentage = {
        singleId: singleId,
        singleValue: singleValue,
      };
    }
  }, [bookingInfo, journeyInfo, taxApi?.data]);
  // end taxpercentage

  // test start
  useEffect(() => {
    setSubtripid(JSON.parse(localStorage.getItem("subtripId")));

    const bookingInfoTax = tax(bookingInfo?.grandtotal);
    const journeyInfoTax = tax(journeyInfo?.grandtotal);

    localStorage.setItem("bookingInfoTax", JSON.stringify(bookingInfoTax));
    localStorage.setItem("journeyInfoTax", JSON.stringify(journeyInfoTax));

    if (taxApi?.tax_type === "exclusive") {
      if (journeyInfo?.isRoundTrip) {
        // Calcualtion for round trip
        const regularTotalAmmount = Number(journeyInfo?.grandtotal) + Number(journeyInfoTax);
        const returnTotalAmmount = Number(bookingInfo?.grandtotal) + Number(bookingInfoTax);

        localStorage.setItem("regular", JSON.stringify(regularTotalAmmount));
        localStorage.setItem("return", JSON.stringify(returnTotalAmmount));

        if (subTripid === journeyInfo?.subtripId && discount?.discount) {
          let newAmount = Number(regularTotalAmmount) - Number(discount?.discount);

          if (newAmount > Number(regularTotalAmmount)) {
            newAmount = regularTotalAmmount;
          }

          localStorage.setItem("regular", JSON.stringify(newAmount));
        }

        if (subTripid === bookingInfo?.subtripId && discount?.discount) {
          let newAmount = Number(returnTotalAmmount) - Number(discount?.discount);

          if (newAmount > Number(returnTotalAmmount)) {
            newAmount = returnTotalAmmount;
          }

          localStorage.setItem("return", JSON.stringify(newAmount));
        }
      }

      if (!journeyInfo?.isRoundTrip) {
        const returnTotalAmmount = Number(bookingInfo?.grandtotal) + Number(bookingInfoTax);
        localStorage.setItem("return", JSON.stringify(returnTotalAmmount));

        if (subTripid === bookingInfo?.subtripId && discount?.discount) {
          let newAmount = Number(returnTotalAmmount) - Number(discount?.discount);

          if (newAmount > Number(returnTotalAmmount)) {
            newAmount = returnTotalAmmount;
          }

          localStorage.setItem("return", JSON.stringify(newAmount));
        }
      }
    } else {
      if (journeyInfo?.isRoundTrip) {
        const regularTotalAmmount = Number(journeyInfo?.grandtotal);
        const returnTotalAmmount = Number(bookingInfo?.grandtotal);

        localStorage.setItem("regular", JSON.stringify(regularTotalAmmount));
        localStorage.setItem("return", JSON.stringify(returnTotalAmmount));

        if (subTripid === journeyInfo?.subtripId && discount?.discount) {
          let newAmount = Number(regularTotalAmmount) - Number(discount?.discount);

          if (newAmount > Number(regularTotalAmmount)) {
            newAmount = regularTotalAmmount;
          }

          localStorage.setItem("regular", JSON.stringify(newAmount));
        }
        if (subTripid === bookingInfo?.subtripId && discount?.discount) {
          let newAmount = Number(returnTotalAmmount) - Number(discount?.discount);

          if (newAmount > Number(returnTotalAmmount)) {
            newAmount = returnTotalAmmount;
          }

          localStorage.setItem("return", JSON.stringify(newAmount));
        }
      }

      if (!journeyInfo?.isRoundTrip) {
        const returnTotalAmmount = Number(bookingInfo?.grandtotal);

        localStorage.setItem("return", JSON.stringify(returnTotalAmmount));

        if (subTripid === bookingInfo?.subtripId && discount?.discount) {
          let newAmount = Number(returnTotalAmmount) - Number(discount?.discount);

          if (newAmount > Number(returnTotalAmmount)) {
            newAmount = returnTotalAmmount;
          }

          localStorage.setItem("return", JSON.stringify(newAmount));
        }
      }
    }
  }, [bookingInfo, journeyInfo, discountValue, subTripid, taxApi?.tax_type]);
  // test end

  const NewTotalAmount = (totalbl, discountbl) => {
    let NewBalance = totalbl - discountbl;

    // if (NewBalance < totalbl) {
    //   return Number(`00`);
    // } else {
    //   return NewBalance;
    // }
    return NewBalance;
  };

  return (
    <Summary>
      <FareSummaryWrapper>
        <FareSummaryHeader>
          {languageData?.side_bar_fare_summery_title[webSettingData?.language]}
        </FareSummaryHeader>
        <div>
          {bookingInfo?.aseat == "" ? "0" : `${bookingInfo?.aseat}`} Adult
        </div>
        <div>
          {bookingInfo?.cseat == "" ? "0" : `${bookingInfo?.cseat}`} Children
        </div>
        <div>
          {bookingInfo?.spseat == "" ? "0" : `${bookingInfo?.spseat}`} Special
        </div>
      </FareSummaryWrapper>
      {/* end fareSummary */}

      <Amount>
        <DepartureAmmount>
          <BaseFare>
            <div>
              {" "}
              {languageData?.side_bar_base_fare_title[webSettingData?.language]}
            </div>

            {taxApi?.tax_type === "exclusive" ? (
              <>
                {journeyInfo?.isRoundTrip ? (
                  <strong>
                    {`${webSettingData?.currency_code} `}
                    {journeyInfo && journeyInfo?.totalprice
                      ? Number(journeyInfo?.totalprice).toFixed(2)
                      : "0.00"}
                  </strong>
                ) : (
                  <strong>
                    {`${webSettingData?.currency_code} `}
                    {bookingInfo && bookingInfo?.totalprice
                      ? Number(bookingInfo?.totalprice).toFixed(2)
                      : "0.00"}
                  </strong>
                )}
              </>
            ) : (
              <>
                {journeyInfo?.isRoundTrip ? (
                  <strong>
                    {`${webSettingData?.currency_code} `}
                    {journeyInfo && journeyInfo?.totalprice
                      ? Number(
                        journeyInfo?.totalprice - tax(journeyInfo?.totalprice)
                      ).toFixed(2)
                      : "0.00"}
                  </strong>
                ) : (
                  <strong>
                    {`${webSettingData?.currency_code} `}
                    {bookingInfo && bookingInfo?.totalprice
                      ? Number(
                        bookingInfo?.totalprice - tax(bookingInfo?.totalprice)
                      ).toFixed(2)
                      : "0.00"}
                  </strong>
                )}
              </>
            )}
          </BaseFare>

          <BaseFare>
            <div>
              {languageData?.side_bar_tax_title[webSettingData?.language]}
            </div>
            {journeyInfo?.isRoundTrip ? (
              <strong>
                {" "}
                {`${webSettingData?.currency_code} `}
                {tax(journeyInfo?.totalprice).toFixed(2)}
              </strong>
            ) : (
              <strong>
                {" "}
                {`${webSettingData?.currency_code} `}
                {tax(bookingInfo?.totalprice).toFixed(2)}
              </strong>
            )}
          </BaseFare>
        </DepartureAmmount>

        {journeyInfo?.isRoundTrip && (
          <>
            <BaseFare>
              <div>
                {
                  languageData?.side_bar_return_ticket_fare_title[
                  webSettingData?.language
                  ]
                }
              </div>
              {taxApi?.tax_type === "exclusive" ? (
                <strong>
                  {`${webSettingData?.currency_code} `}
                  {bookingInfo && bookingInfo?.totalprice
                    ? Number(bookingInfo?.totalprice).toFixed(2)
                    : "0.00"}
                </strong>
              ) : (
                <strong>
                  {`${webSettingData?.currency_code} `}
                  {bookingInfo && bookingInfo?.totalprice
                    ? Number(
                      bookingInfo?.totalprice - tax(bookingInfo?.totalprice)
                    ).toFixed(2)
                    : "0.00"}
                </strong>
              )}
            </BaseFare>
          </>
        )}

        {journeyInfo?.isRoundTrip && (
          <BaseFare>
            <div>
              {
                languageData?.side_bar_return_ticket_tax_title[
                webSettingData?.language
                ]
              }
            </div>
            <strong>
              {" "}
              {`${webSettingData?.currency_code} `}
              {tax(bookingInfo?.totalprice).toFixed(2)}
            </strong>
          </BaseFare>
        )}
      </Amount>
      {/* end amount */}

      <SubTotalAmount>
        <div>
          {
            languageData?.side_bar_sub_total_ammount_title[
            webSettingData?.language
            ]
          }
        </div>
        <strong>
          {`${webSettingData?.currency_code} `}
          {getGrandTotalAmount().toFixed(2)}
        </strong>
      </SubTotalAmount>
      <Discount>
        <div>
          {languageData?.side_bar_total_discount[webSettingData?.language]}
        </div>
        <strong>
          {`${webSettingData?.currency_code} `}
          {discount?.discount ? Number(discount?.discount).toFixed(2) : "0.00"}
        </strong>
      </Discount>
      <TotalAmount>
        <div>
          {languageData?.side_bar_total_ammount[webSettingData?.language]}
        </div>
        <strong>
          {`${webSettingData?.currency_code} `}
          {NewTotalAmount(
            getGrandTotalAmount(),
            discount?.discount ? Number(discount?.discount).toFixed(2) : "0.00"
          ).toFixed(2)}
        </strong>
      </TotalAmount>
      {/* end TotalAmount */}
    </Summary>
  );
};

export default FareSummery;
