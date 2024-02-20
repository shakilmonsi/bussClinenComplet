import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import logo from '../../assets/images/busLogo.png';
import emailPhoto from '../../assets/login/email.svg';
import Layout from '../../bootstrap/Layout';
import TextField from '../../bootstrap/TextField/index.jsx';
import {
  Container,
  FormHeader,
  FormLogo,
  FormWrapper,
  InnerFormArea,
  InnerFormPadding,
  InputField,
  SingupButton,
  SubHeader,
} from './ForgotPassword.styles.js';

export const ForgotPassword = () => {
  const { webSettingData,languageData} = useSelector((state) => state.busLists);
  const [values, setValues] = useState({
    email: '',
  });
  // const [languageData, setLanguageData] = useState();

  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setUserProfileInfo(
      JSON.parse(localStorage.getItem('userProfileInfo'))
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('email', values?.email);
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/website/emails/check/email/pass`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();

    if (result?.status === 'success') {
      localStorage.setItem('slug', JSON.stringify(result?.slug));
      setValues({
        email: '',
      });
      toast.success('success');
      history.push('/reset-password');
    }
  };

  return (
    <Layout title="ForgotPassword" userProfileInfo={userProfileInfo}>
      <Container>
        <FormWrapper>
          <InnerFormArea>
            <div
              style={{
                background: webSettingData?.headercolor,
                padding: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FormLogo src={webSettingData?.headerlogo} alt="logo" />
            </div>
            <InnerFormPadding>
              <form onSubmit={handleSubmit}>
                <FormHeader>
                  {
                    languageData?.forgot_page_title[
                      webSettingData?.language
                    ]
                  }
                </FormHeader>
                <SubHeader>
                  {
                    languageData?.forgot_page_sub_title[
                      webSettingData?.language
                    ]
                  }
                </SubHeader>
                <InputField>
                  <TextField
                    name="email"
                    img={emailPhoto}
                    alt="EmailIcon"
                    placeholder={
                      languageData?.forgot_page_email_input[
                        webSettingData?.language
                      ]
                    }
                    type="email"
                    onChange={handleChange}
                  />
                </InputField>
                <InputField>
                  <SingupButton
                    btnbgcolor={webSettingData?.buttoncolor}
                    btnbghvcolor={webSettingData?.buttoncolorhover}
                    btntextcolor={webSettingData?.buttontextcolor}
                  >
                    {
                      languageData?.forgot_page_submit_button[
                        webSettingData?.language
                      ]
                    }
                  </SingupButton>
                </InputField>
              </form>
            </InnerFormPadding>
            {/* end form area */}
          </InnerFormArea>
        </FormWrapper>
      </Container>
    </Layout>
  );
};
