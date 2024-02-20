import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Container from "../../bootstrap/Container";
import Layout from "../../bootstrap/Layout";
import Row from "../../bootstrap/Row";
import Spinner from "../../bootstrap/Spinner";
import Contact from "../../components/Ui/Contact";
import PassengersCheckList from "../../components/Ui/PassengersCheckList";
import SideBar from "../../components/Ui/SideBar";
import TravellerInformation from "../../components/Ui/TravellerInformation";
import checkoutLogo from "../../photo/bus-pav.jpg";
import {
  CheckoutBody,
  LeftSide,
  LeftSideHeader,
  LeftSideWrapper,
  RightSide,
  SpinnerWrapper,
} from "./Checkout.styles.js";

const Checkout = () => {
  const { webSettingData, languageData } = useSelector(
    (state) => state.busLists
  );
  const [width, setWidth] = useState();
  const [discountValue, setDiscountValue] = useState(null);
  const [subTripid, setSubtripid] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [languageData, setLanguageData] = useState();

  const [rangeValue, setRangeValue] = useState({
    min: 300,
    max: 3000,
  });
  const [paymentStutas, setPaymentStutas] = useState("");
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

  const [isRegesteredUser, setRegesteredUser] = useState(false);
  const [token, setToken] = useState("");
  const [returnAmmount, setReturnAmmount] = useState(null);
  const [regularAmmount, setRegularAmmount] = useState(null);

  const [values, setValues] = useState({
    id_type: "nid",
    mobile_country_code: "",
  });
  const innerWidth = window.innerWidth;

  useEffect(() => {
    setWidth(innerWidth);
  }, [width]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/passangers/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result?.status === "success") {
              setPassengerInformation(result?.data);
              localStorage.setItem(
                "userProfileInfo",
                JSON.stringify(result?.data)
              );
            }
          });
      }, 1000);
    }
  }, [token]);

  useEffect(() => {
    setReturnAmmount(JSON.parse(localStorage.getItem("return")));
    setRegularAmmount(JSON.parse(localStorage.getItem("regular")));
  }, [discountValue, passengerInformation, subTripid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    var ele = document.querySelectorAll("input[type='radio']:checked");
    for (let index = 0; index < ele.length; index++) {
      ele[index].checked = false;
    }
    setPaymentStutas("");

    // console.log(" e.target :- ", e.target);
  };

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
        <>
          <Container>
            <CheckoutBody>
              <Row>
                <LeftSide lg="9" md="12">
                  <LeftSideWrapper>
                    <LeftSideHeader>
                      <img src={checkoutLogo} alt="Checkout Logo" />
                      <div>
                        {
                          languageData?.checkout_page_sub_title[
                          webSettingData?.language
                          ]
                        }
                      </div>
                    </LeftSideHeader>

                    <Contact
                      passengerInformation={passengerInformation}
                      setPassengerInformation={setPassengerInformation}
                      values={values}
                      setValues={setValues}
                      handleChange={handleChange}
                      setRegesteredUser={setRegesteredUser}
                      token={token}
                      paymentStutas={paymentStutas}
                      setPaymentStutas={setPaymentStutas}
                    />
                    {/* end contact */}

                    <TravellerInformation
                      isRegesteredUser={isRegesteredUser}
                      setPassengerInformation={setPassengerInformation}
                      passengerInformation={passengerInformation}
                      values={values}
                      setValues={setValues}
                      handleChange={handleChange}
                      discountValue={discountValue}
                      setDiscountValue={setDiscountValue}
                      returnAmmount={returnAmmount}
                      regularAmmount={regularAmmount}
                      subTripid={subTripid}
                      token={token}
                      setLoading={setLoading}
                      paymentStutas={paymentStutas}
                      setPaymentStutas={setPaymentStutas}
                    />
                    {/* end travellerInformation */}
                  </LeftSideWrapper>
                  {/* end formArea */}

                  {width < 922 && (
                    <SideBar
                      discountValue={discountValue}
                      setDiscountValue={setDiscountValue}
                      subTripid={subTripid}
                      setSubtripid={setSubtripid}
                    />
                  )}

                  <PassengersCheckList />
                  {/* end checkList */}
                </LeftSide>
                <RightSide lg="3" md="12">
                  {width > 922 && (
                    <SideBar
                      setRangeValue={setRangeValue}
                      discountValue={discountValue}
                      setDiscountValue={setDiscountValue}
                      subTripid={subTripid}
                      setSubtripid={setSubtripid}
                    />
                  )}
                </RightSide>
              </Row>
            </CheckoutBody>
          </Container>
        </>
      )}
    </Layout>
  );
};

export default Checkout;
