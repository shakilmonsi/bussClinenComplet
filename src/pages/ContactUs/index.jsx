import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Container from "../../bootstrap/Container";
import SocialMedia from "../../components/Ui/SocialMedia";
import Layout from "./../../bootstrap/Layout/index";
import {
  Details,
  Email,
  Form,
  InnerBody,
  InputWrapper,
  LeftSide,
  Message,
  RightSide,
  RightSideSubTitle,
  RightSideTitle,
  SingleInput,
  SubmitBtn,
  Wrapper,
} from "./ContactUs.styles";

const ContactUs = () => {
  const { webSettingData, contactInfoData, languageData } = useSelector(
    (state) => state.busLists
  );
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    mobile: "",
  });
  // const [languageData, setLanguageData] = useState();

  const [nameError, setNameError] = useState(true);
  const [subjectError, setSubjectError] = useState(true);

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);

  // const handleNameBlur = (e) => {
  //   const { value } = e.target;
  //   var regex = /^[a-zA-Z\s]+$/;

  //   if (!value.match(regex)) {
  //     toast.error("Please enter your name as text.");
  //     setNameError(false);
  //     return;
  //   }
  //   setNameError(true);
  // };

  // const handleSubjectBlur = (e) => {
  //   const { value } = e.target;
  //   var regex = /^[a-zA-Z\s]+$/;

  //   if (!value.match(regex)) {
  //     toast.error("Please enter your subject as text.");
  //     setSubjectError(false);
  //     return;
  //   }
  //   setSubjectError(true);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nameError && subjectError) {
      const formData = new FormData();

      let mobile = values?.mobile.split(" ").join("");
      let result = mobile.split("-").join("");

      // if (isNaN(result)) {
      //   toast.error(
      //     "Please provide your phone number as a whole number without any decimal or special characters."
      //   );
      //   return;
      // }

      formData.append("name", values?.name);
      formData.append("email", values?.email);
      formData.append("subject", values?.subject);
      formData.append("message", values?.message);
      formData.append("mobile", result);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_MODULE_DOMAIN}/inquiries/create`,
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        if (result?.status === "success") {
          toast.success("Success");
          setValues({
            name: "",
            email: "",
            subject: "",
            message: "",
            mobile: "",
          });
        } else {
          toast.error(result?.status);
        }
      } catch (error) {
        console.log("contact page", error);
      }
    }
  };

  return (
    <Layout title="Contact-Us" userProfileInfo={userProfileInfo}>
      <Wrapper>
        <Container>
          <InnerBody>
            <LeftSide>
              <Form onSubmit={handleSubmit}>
                <InputWrapper>
                  <SingleInput
                    type="text"
                    placeholder="Full Name *"
                    value={values?.name}
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                    // onBlur={(e) => handleNameBlur(e)}
                    required
                  />
                  <SingleInput
                    type="email"
                    placeholder="Email *"
                    value={values?.email}
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                    required
                  />
                </InputWrapper>
                <InputWrapper>
                  <SingleInput
                    type="text"
                    placeholder="Subjet *"
                    value={values?.subject}
                    onChange={(e) =>
                      setValues({ ...values, subject: e.target.value })
                    }
                    required
                    // onBlur={(e) => handleSubjectBlur(e)}
                  />
                  <SingleInput
                    type="tel"
                    placeholder="Mobile *"
                    value={values?.mobile}
                    onChange={(e) =>
                      setValues({ ...values, mobile: e.target.value })
                    }
                    required
                  />
                </InputWrapper>

                <Message
                  rows="5"
                  cols="50"
                  placeholder="Message *"
                  value={values?.message}
                  onChange={(e) =>
                    setValues({ ...values, message: e.target.value })
                  }
                />
                <SubmitBtn
                  type="submit"
                  value="Send Message"
                  btnBgColor={webSettingData?.buttoncolor}
                  btnBgHvColor={webSettingData?.buttoncolorhover}
                  btnTextColor={webSettingData?.buttontextcolor}
                ></SubmitBtn>
              </Form>
            </LeftSide>

            <RightSide>
              <RightSideTitle>
                {languageData?.conact_us_page_title[webSettingData?.language]}
              </RightSideTitle>

              <Details>
                <p>{contactInfoData?.address}</p>
                <p>
                  <b>
                    {
                      languageData?.conact_us_page_email_title[
                        webSettingData?.language
                      ]
                    }
                  </b>
                  <Email
                    href={`mailto:${contactInfoData?.email}`}
                    textColor={webSettingData?.buttoncolor}
                  >
                    &nbsp;{contactInfoData?.email}
                  </Email>
                </p>
                <p>
                  <b>
                    {
                      languageData?.conact_us_page_phone_title[
                        webSettingData?.language
                      ]
                    }
                  </b>
                  {contactInfoData?.contact}
                </p>
              </Details>

              <RightSideSubTitle>
                {
                  languageData?.conact_us_page_followon_title[
                    webSettingData?.language
                  ]
                }
              </RightSideSubTitle>

              <SocialMedia style={{ justifyContent: "flex-start" }} />
            </RightSide>
          </InnerBody>
        </Container>
      </Wrapper>
    </Layout>
  );
};

export default ContactUs;
