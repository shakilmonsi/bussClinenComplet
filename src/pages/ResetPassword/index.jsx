import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import logo from "../../assets/images/busLogo.png";
import Layout from "../../bootstrap/Layout";
import TextField from "../../bootstrap/TextField";
import {
  Container,
  FormHeader,
  FormLogo,
  FormWrapper,
  InnerFormArea,
  InputField,
  PasswordWrapper,
  SingupButton,
} from "./ResetPassword.styles.js";

const ResetPassword = () => {
  const { webSettingData } = useSelector((state) => state.busLists);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [passworType, setPasswordType] = useState(true);
  const [rePassworType, setRePasswordType] = useState(true);
  const [slug, setSlug] = useState(null);
  const [values, setValues] = useState({
    code: "",
    password: "",
    rePassword: "",
  });
  const history = useHistory();

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
    setSlug(JSON.parse(localStorage.getItem("slug")));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("recovery_code", values?.code);
    formData.append("password", values?.password);
    formData.append("repassword", values?.rePassword);
    formData.append("slug", slug);

    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/website/emails/reset/pass`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result?.status === "success") {
      localStorage.setItem("slug", JSON.stringify(result?.slug));
      setValues({
        code: "",
        password: "",
        rePassword: "",
      });
      localStorage.removeItem("slug");
      toast.success("success");
      history.push("/login");
    } else {
      toast.error(result?.message);
    }
  };

  const handlePasswordTypeChange = () => {
    setPasswordType((prevState) => !prevState);
  };

  const handleRePasswordTypeChange = () => {
    setRePasswordType((prevState) => !prevState);
  };

  return (
    <Layout title="ForgotPassword" userProfileInfo={userProfileInfo}>
      <Container>
        <FormWrapper>
          <InnerFormArea>
            <FormLogo src={logo} alt="logo" />
            <form onSubmit={handleSubmit}>
              <FormHeader>Reset-Password</FormHeader>
              <InputField>
                <TextField
                  name="code"
                  alt="EmailIcon"
                  placeholder="code"
                  type="text"
                  onChange={handleChange}
                />
              </InputField>
              <PasswordWrapper>
                <InputField>
                  <TextField
                    name="password"
                    type={passworType ? "password" : "text"}
                    placeholder="password"
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
                    placeholder="re-password"
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
              <InputField>
                <SingupButton
                  btnbgcolor={webSettingData?.buttoncolor}
                  btnbghvcolor={webSettingData?.buttoncolorhover}
                  btntextcolor={webSettingData?.buttontextcolor}
                >
                  Submit
                </SingupButton>
              </InputField>
            </form>
            {/* end form area */}
          </InnerFormArea>
        </FormWrapper>
      </Container>
    </Layout>
  );
};

export default ResetPassword;
