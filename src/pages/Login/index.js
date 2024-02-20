import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import emailPhoto from "../../assets/login/email.svg";

import passwordPhoto from "../../assets/login/privacy.svg";
import Container from "../../bootstrap/Container";
import Layout from "../../bootstrap/Layout";
import TextField from "../../bootstrap/TextField/index.jsx";
import {
  CheckBox,
  Extra,
  ForgetPasswordLink,
  Form,
  FormArea,
  FormHeader,
  InnerFormArea,
  InputField,
  RememberMe,
  SingupLink,
  SubmitButton,
} from "./Login.styles.js";

export const Login = () => {
  const { webSettingData,languageData } = useSelector((state) => state.busLists);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [passwordType, setPasswordType] = useState(true);

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);

  const history = useHistory();
  const location = useLocation();

  const [values, setValues] = useState({
    userid: "",
    password: "",
    facebookToken: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const formData = new FormData();
    formData.append("userid", values?.userid);
    formData.append("password", values?.password);

    if (validateEmail(values?.userid)) {
      formData.append("type", "email");
    } else {
      formData.append("type", "mobile");
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/passangers/login`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result?.status === "success") {
      localStorage.setItem("token", result?.data);

      // console.log('result :- ', result);


      if (location.state?.update === true) {
        history.goBack();
      } else {
        history.push("/tickets");
        window.location.reload();
      }
    } else {
      toast.error(result?.message);
    }
  };

  const handlePassord = () => {
    setPasswordType((prevState) => !prevState);
  };

  return (
    <Layout title="Login" userProfileInfo={userProfileInfo}>
      <Container>
        <FormArea>
          <InnerFormArea>
            <Form onSubmit={handleSubmit}>
              <FormHeader>
                {languageData?.login_page_title[webSettingData?.language]}
              </FormHeader>
              <InputField>
                <TextField
                  img={emailPhoto}
                  type="text"
                  placeholder={
                    languageData?.login_page_email_input[
                    webSettingData?.language
                    ]
                  }
                  alt="Email icon"
                  onChange={handleChange}
                  name="userid"
                />
              </InputField>
              <InputField>
                <TextField
                  name="password"
                  img={passwordPhoto}
                  type={passwordType ? "password" : "text"}
                  placeholder={
                    languageData?.login_page_password_input[
                    webSettingData?.language
                    ]
                  }
                  alt="passwordIcon"
                  onChange={handleChange}
                />
                <svg
                  onClick={handlePassord}
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
              <Extra>
                <CheckBox>
                  <input type="checkbox" id="scales" name="scales" />
                  <RememberMe htmlFor="scales">
                    {
                      languageData?.login_page_checkbox_text[
                      webSettingData?.language
                      ]
                    }
                  </RememberMe>
                </CheckBox>
                <div>
                  <ForgetPasswordLink
                    to="/forgotpassword"
                    textcolor={webSettingData?.buttoncolor}
                  >
                    {
                      languageData?.login_page_forgot_password_link_text[
                      webSettingData?.language
                      ]
                    }
                  </ForgetPasswordLink>
                </div>
              </Extra>
              <InputField>
                <SubmitButton
                  type="submit"
                  btnbgcolor={webSettingData?.buttoncolor}
                  btnbghvcolor={webSettingData?.buttoncolorhover}
                  btntextcolor={webSettingData?.buttontextcolor}
                >
                  {
                    languageData?.login_page_submit_button[
                    webSettingData?.language
                    ]
                  }
                </SubmitButton>
              </InputField>
            </Form>
            {/* end form area */}

            <div>
              {languageData?.login_page_question_text[webSettingData?.language]}
              <strong>
                <SingupLink
                  to="/signup"
                  textcolor={webSettingData?.buttoncolor}
                >
                  {
                    languageData?.login_page_sign_up_link_text[
                    webSettingData?.language
                    ]
                  }
                </SingupLink>
              </strong>
            </div>
          </InnerFormArea>
        </FormArea>
      </Container>

      {/* <Footer /> */}
    </Layout>
  );
};
export default Login;
