import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import emailPhoto from "../../assets/login/email.svg";
import Layout from "../../bootstrap/Layout";
import TextField from "../../bootstrap/TextField/index.jsx";
import Input from "../../components/Ui/Input/index.jsx";
import {
  Account,
  CheckBox,
  ConditionLink,
  Container,
  CountrySelect,
  ErrrorMsg,
  Extra,
  FirstNameAndNid,
  Form,
  FormHeader,
  FormLogo,
  FormWrapper,
  InnerFormWrapper,
  InputField,
  LogoArea,
  NameWrapper,
  PasswordWrapper,
  PhoneWrapper,
  Select,
  SignupButton,
  SingupLink,
  SubHeader,
} from "./Signup.styles.js";

export const Signup = () => {
  const { webSettingData,languageData } = useSelector((state) => state.busLists);
  const [values, setValues] = useState({
    email: "",
    phone: "",
    password: "",
    rePassword: "",
    firstName: "",
    lastName: "",
    id_type: "Nid",
    id_number: "",
    country_id: "",
    mobile_country_code: "",
    terms_and_condition: false,
  });
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [passworType, setPasswordType] = useState(true);
  const [rePassworType, setRePasswordType] = useState(true);
  const [countryName, setCountryName] = useState([]);
  const [phoneStatus, setPhoneStatus] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);
  const [idNumberStatus, setIdNumberStatus] = useState(null);
  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  const history = useHistory();

  useEffect(() => {
    countryName?.find((item, index) => {
      if (item?.id == webSettingData?.country) {
        setValues({
          ...values,
          country_id: item?.id,
          mobile_country_code: item?.phonecode,
        });
      }
    });
  }, [countryName]);

  const getCountry = () =>
    countryName.findIndex(
      (country) => String(country.id) === String(values?.country_id)
    );

  let countries = [];
  countryName.map((item) =>
    countries.push({
      value: item.nicename,
      label: item.nicename,
      id: item.id,
    })
  );

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));

    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/countries`)
      .then((res) => res.json())
      .then((data) => setCountryName(data.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const updateTerms = (e) => {
    if (e.target.checked) {
      setValues({ ...values, terms_and_condition: true });
    } else {
      setValues({ ...values, terms_and_condition: false });
    }

    console.log('target', e.target.checked)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values?.firstName === "") {
      toast.error("First name field is required");
      return;
    } else if (values?.lastName === "") {
      toast.error("Last name field is required");
      return;
    } else if (values?.id_type === "") {
      toast.error("Document type is required ");
      return;
    } else if (values?.email === "") {
      toast.error("Email field is required");
      return;
    } else if (values?.phone === "") {
      toast.error("Phone number field is required");
      return;
    } else if (values?.password === "") {
      toast.error("Password field is required");
      return;
    } else if (values?.rePassword === "") {
      toast.error("Re-Password field is required");
      return;
    } else if (values?.country_id === "") {
      toast.error("Country id field is required");
      return;
    } else if (values?.terms_and_condition === false) {
      toast.error("Please checked terms and condition");
      return;
    }

    const formData = new FormData();
    formData.append("login_email", values?.email);
    formData.append(
      "login_mobile",
      values?.mobile_country_code?.concat(values?.phone)
    );
    formData.append("password", values?.password);
    formData.append("repassword", values?.rePassword);
    formData.append("first_name", values?.firstName);
    formData.append("last_name", values?.lastName);
    formData.append("id_type", values?.id_type);
    formData.append("id_number", values?.id_number);
    formData.append("country_id", values?.country_id);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_MODULE_DOMAIN}/passangers/signup`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result?.status === "success") {
        toast.success(result?.status);
        setValues({
          email: "",
          phone: "",
          password: "",
          rePassword: "",
          firstName: "",
          lastName: "",
          id_type: "Nid",
          id_number: "",
          country_id: "",
        });
        history.push("/login");
      } else {
        toast.error(result?.error?.login_email);
        toast.error(result?.error?.login_mobile);
        toast.error(result?.error?.password);
        toast.error(result?.error?.repassword);
        toast.error(result?.error?.id_number);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlePhoneBlur = async () => {
    const formData = new FormData();

    formData.append(
      "login_mobile",
      values?.mobile_country_code?.concat(values?.phone)
    );

    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/passangers/mobile`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    setPhoneStatus(result?.status);
  };

  const handleEmailBlur = async () => {
    const formData = new FormData();

    formData.append("login_email", values?.email);

    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/passangers/email`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    setEmailStatus(result?.status);
  };

  const handleIdNumberBlur = async () => {
    const formData = new FormData();

    formData.append("id_number", values?.id_number);

    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/passangers/nid`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    setIdNumberStatus(result?.status);
  };

  const handlePasswordTypeChange = () => {
    setPasswordType((prevState) => !prevState);
  };

  const handleRePasswordTypeChange = () => {
    setRePasswordType((prevState) => !prevState);
  };

  return (
    <Layout title="Signup" userProfileInfo={userProfileInfo}>
      <Container>
        <FormWrapper>
          <InnerFormWrapper>
            <LogoArea>
              <FormLogo src={webSettingData?.headerlogo} alt="logo" />
            </LogoArea>

            <Form onSubmit={handleSubmit}>
              <FormHeader>
                {languageData?.sign_up_page_title[webSettingData?.language]}
              </FormHeader>
              <SubHeader>
                {languageData?.sign_up_page_sub_title[webSettingData?.language]}
              </SubHeader>

              {/* start test */}
              <NameWrapper>
                <InputField>
                  <TextField
                    name="firstName"
                    type="text"
                    placeholder={
                      languageData?.sign_up_page_input_name[
                      webSettingData?.language
                      ]
                    }
                    onChange={handleChange}
                  />
                </InputField>

                <InputField>
                  <TextField
                    name="lastName"
                    type="text"
                    placeholder={
                      languageData?.sign_up_page_input_last_name[
                      webSettingData?.language
                      ]
                    }
                    onChange={handleChange}
                  />
                </InputField>
              </NameWrapper>

              <FirstNameAndNid>
                <Select
                  name="id_type"
                  id="id_type"
                  onChange={(e) =>
                    setValues({ ...values, id_type: e.target.value })
                  }
                >
                  <option value="Nid">NID</option>
                  <option value="Passport">PP</option>
                </Select>

                <TextField
                  id="nid"
                  name="passPort"
                  type="text"
                  placeholder="Document No"
                  value={values?.id_number}
                  onChange={(e) =>
                    setValues({ ...values, id_number: e.target.value })
                  }
                  onBlur={handleIdNumberBlur}
                />
              </FirstNameAndNid>
              {idNumberStatus === "success" && (
                <ErrrorMsg>id Number is taken</ErrrorMsg>
              )}

              {/* end test */}

              <InputField>
                <TextField
                  name="email"
                  img={emailPhoto}
                  type="email"
                  placeholder={
                    languageData?.sign_up_page_input_email[
                    webSettingData?.language
                    ]
                  }
                  alt="emaildIcon"
                  onChange={handleChange}
                  onBlur={handleEmailBlur}
                />
                {emailStatus === "success" && (
                  <ErrrorMsg>email is taken</ErrrorMsg>
                )}
              </InputField>

              <InputField>
                <PhoneWrapper>
                  <Select
                    name="mobile_country_code"
                    id="CountryCode"
                    onChange={handleChange}
                    defaultValue="2"
                  >
                    {countryName?.map((item, index) => (
                      <option
                        value={item.phonecode}
                        key={index}
                        selected={item?.id == webSettingData?.country && true}
                      >
                        +{item.phonecode}
                      </option>
                    ))}
                  </Select>
                  <TextField
                    name="phone"
                    // img={contactPhoto}
                    type="number"
                    onKeyDown={(e) =>
                      exceptThisSymbols.includes(e.key) && e.preventDefault()
                    }
                    placeholder={
                      languageData?.sign_up_page_input_phone[
                      webSettingData?.language
                      ]
                    }
                    alt="ContactIcon"
                    onChange={handleChange}
                    onBlur={handlePhoneBlur}
                  />
                </PhoneWrapper>
                {phoneStatus === "success" && (
                  <ErrrorMsg>phone is taken</ErrrorMsg>
                )}
              </InputField>

              <PasswordWrapper>
                <InputField>
                  <TextField
                    name="password"
                    type={passworType ? "password" : "text"}
                    placeholder={
                      languageData?.sign_up_page_input_password[
                      webSettingData?.language
                      ]
                    }
                    onChange={handleChange}
                  />
                  <svg
                    onClick={handlePasswordTypeChange}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </InputField>

                {/* start test */}
                <InputField>
                  <TextField
                    name="rePassword"
                    type={rePassworType ? "password" : "text"}
                    placeholder={
                      languageData?.sign_up_page_input_re_password[
                      webSettingData?.language
                      ]
                    }
                    onChange={handleChange}
                  />
                  <svg
                    onClick={handleRePasswordTypeChange}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </InputField>
                {/* end test */}
              </PasswordWrapper>

              <CountrySelect
                name="country_id"
                id="country_id"
                onChange={handleChange}
              // defaultValue="2"
              >
                {countryName?.map((item, index) => (
                  <option
                    value={item.id}
                    key={index}
                    selected={item?.id == webSettingData?.country && true}
                  >
                    {item.name}
                  </option>
                ))}
              </CountrySelect>

              <Extra>
                <CheckBox>
                  <Input type="checkbox" name="terms_and_condition"
                    onChange={updateTerms} />
                  <Account>
                    {
                      languageData?.sign_up_page_checkbox_text[
                      webSettingData?.language
                      ]
                    }
                    <ConditionLink
                      to="/terms-and-condition"
                      textcolor={webSettingData?.buttoncolor}
                    >
                      {
                        languageData?.sign_up_page_terms_link_text[
                        webSettingData?.language
                        ]
                      }
                    </ConditionLink>
                  </Account>
                </CheckBox>
              </Extra>

              <InputField>
                <SignupButton
                  btnbgcolor={webSettingData?.buttoncolor}
                  btnbghvcolor={webSettingData?.buttoncolorhover}
                  btntextcolor={webSettingData?.buttontextcolor}
                >
                  {
                    languageData?.sign_up_page_submit_button[
                    webSettingData?.language
                    ]
                  }
                </SignupButton>
              </InputField>

              <div>
                {
                  languageData?.sign_up_page_qustion_text[
                  webSettingData?.language
                  ]
                }
                <SingupLink to="/login" textcolor={webSettingData?.buttoncolor}>
                  {
                    languageData?.sign_up_page_sign_in_link_text[
                    webSettingData?.language
                    ]
                  }
                </SingupLink>
              </div>
            </Form>
            {/* end form area */}
          </InnerFormWrapper>
        </FormWrapper>
      </Container>
    </Layout>
  );
};
