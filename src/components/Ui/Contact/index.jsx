import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import TextField from "../../../bootstrap/TextField/index.jsx";
import {
  ContactInputWrapper,
  ContactText,
  ContactWrapper,
  LoginText,
  LoginWrapper,
  Select,
  UserContactWrapper,
} from "./Contact.styles.js";

const Contact = ({
  setPassengerInformation,
  passengerInformation,
  values,
  setValues,
  handleChange,
  setRegesteredUser,
  token,
  paymentStutas,
  setPaymentStutas,
}) => {
  const { webSettingData,languageData } = useSelector((state) => state.busLists);
  const [isDisabled, setIsDisabled] = useState(false);
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const [countryName, setCountryName] = useState([]);
  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  // const [languageData, setLanguageData] = useState();

  const history = useHistory();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/countries`)
      .then((res) => res.json())
      .then((data) => setCountryName(data.data));
  }, []);

  useEffect(() => {
    setIsDisabled((prevState) => !prevState);
  }, [userProfileInfo]);

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, [passengerInformation, token]);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);

  const handleLogin = async () => {
    history.push({
      pathname: "/login",
      state: {
        update: true,
      },
    });
  };

  useEffect(() => {
    countryName?.find((item, index) => {
      if (item?.id == webSettingData?.country) {
        setValues({ ...values, mobile_country_code: item?.phonecode });
      }
    });
  }, [countryName]);

  return (
    <>
      {!userProfileInfo && (
        <LoginWrapper>
          <strong>
            {languageData?.checkout_page_question[webSettingData?.language]}
          </strong>
          <LoginText
            onClick={handleLogin}
            textcolor={webSettingData?.buttoncolor}
            texthvcolor={webSettingData?.buttoncolorhover}
          >
            {
              languageData?.checkout_page_login_page_link[
                webSettingData?.language
              ]
            }
          </LoginText>
        </LoginWrapper>
      )}
      <ContactWrapper>
        <label htmlFor="email">
          {
            languageData?.checkout_page_contact_details_text[
              webSettingData?.language
            ]
          }
          <samp style={{ color: "red" }}>
            {" "}
            <b>*</b>
          </samp>
        </label>
        <div>
          <ContactInputWrapper>
            <TextField
              id="email"
              disabled={isDisabled}
              name="login_email"
              type="email"
              placeholder={
                languageData?.checkout_page_contact_details_input_email[
                  webSettingData?.language
                ]
              }
              value={passengerInformation?.login_email}
              onChange={(e) =>
                setPassengerInformation({
                  ...passengerInformation,
                  login_email: e.target.value,
                })
              }
            />

            <UserContactWrapper>
              {!token && (
                <Select
                  name="mobile_country_code"
                  id="CountryCode"
                  onChange={handleChange}
                >
                  {countryName.map((item, index) => (
                    <option
                      value={item.phonecode}
                      key={index}
                      selected={item?.id == webSettingData?.country && true}
                    >
                      +{item?.phonecode}
                    </option>
                  ))}
                </Select>
              )}

              <TextField
                disabled={isDisabled}
                name="login_mobile"
                type="number"
                onKeyDown={(e) =>
                  exceptThisSymbols.includes(e.key) && e.preventDefault()
                }
                placeholder={
                  languageData?.checkout_page_contact_details_input_phone[
                    webSettingData?.language
                  ]
                }
                value={passengerInformation?.login_mobile}
                onChange={(e) =>
                  setPassengerInformation({
                    ...passengerInformation,
                    login_mobile: e.target.value,
                  })
                }
                style={{ border: "0px solid #eaeaea" }}
              />
            </UserContactWrapper>
          </ContactInputWrapper>
          <p id="email-error" style={{ color: "red" }}></p>
          <ContactText>
            {languageData?.checkout_page_text[webSettingData?.language]}
          </ContactText>
        </div>
      </ContactWrapper>
    </>
  );
};

export default Contact;
