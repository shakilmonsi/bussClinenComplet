import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import TextField from "../../../bootstrap/TextField";
import {
  FormWrapper,
  NewPassord,
  NewPassword,
  OldPassord,
  OldPassword,
  RePassord,
  UpdatedButton,
  UserPasswordWrapper,
} from "./ChangePassword.styles";

const ChangePassword = ({ token }) => {
  const { webSettingData, languageData } = useSelector(
    (state) => state.busLists
  );
  const [newPasswordType, setNewPasswordType] = useState(true);
  const [rePasswordType, setRePasswordType] = useState(true);
  const [oldPasswordType, setOldPasswordType] = useState(true);
  const [values, setValues] = useState({
    password: "",
    repassword: "",
    oldpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values?.password !== values?.repassword) {
      toast.error("error");
      return;
    }
    const formData = new FormData();
    formData.append("password", values?.password);
    formData.append("repassword", values?.repassword);
    formData.append("oldpassword", values?.oldpassword);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_MODULE_DOMAIN}/passangers/password`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (result?.status === "success") {
        toast.success("success");
        setValues({
          password: "",
          repassword: "",
          oldpassword: "",
        });
        return;
      }
    } catch (error) {
      console.log("passenger password change error", error);
    }
  };

  const handleNewPassord = () => {
    setNewPasswordType((prevState) => !prevState);
  };

  const handleRePassord = () => {
    setRePasswordType((prevState) => !prevState);
  };

  const handleOldPassord = () => {
    setOldPasswordType((prevState) => !prevState);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {token && (
        <>
          <NewPassword>
            <label htmlFor="new_password">
              {languageData.profile_new_password_label[webSettingData.language]}
            </label>
            <UserPasswordWrapper>
              <NewPassord>
                <TextField
                  id="new_password"
                  name="new_password"
                  type={newPasswordType ? "password" : "text"}
                  placeholder={
                    languageData.profile_new_password_placeholder[
                      webSettingData.language
                    ]
                  }
                  autoComplete="nope"
                  value={values?.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
                <svg
                  onClick={handleNewPassord}
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
              </NewPassord>

              <RePassord>
                <TextField
                  type={rePasswordType ? "password" : "text"}
                  placeholder={
                    languageData.profile_re_password_placeholder[
                      webSettingData.language
                    ]
                  }
                  name="last_name"
                  autoComplete="nope"
                  value={values?.repassword}
                  onChange={(e) =>
                    setValues({ ...values, repassword: e.target.value })
                  }
                />
                <svg
                  onClick={handleRePassord}
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
              </RePassord>
            </UserPasswordWrapper>
          </NewPassword>

          <OldPassword>
            <label htmlFor="old_password">
              {languageData.profile_old_password_label[webSettingData.language]}
            </label>
            <OldPassord>
              <TextField
                id="old_password"
                name="old_password"
                type={oldPasswordType ? "password" : "text"}
                placeholder={
                  languageData.profile_old_password_placeholder[
                    webSettingData.language
                  ]
                }
                value={values?.oldpassword}
                onChange={(e) =>
                  setValues({ ...values, oldpassword: e.target.value })
                }
              />
              <svg
                onClick={handleOldPassord}
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
            </OldPassord>
          </OldPassword>

          <UpdatedButton
            btnbgcolor={webSettingData?.buttoncolor}
            btnbghvcolor={webSettingData?.buttoncolorhover}
            btntextcolor={webSettingData?.buttontextcolor}
          >
            {
              languageData.profile_change_password_button[
                webSettingData.language
              ]
            }
          </UpdatedButton>
        </>
      )}
    </FormWrapper>
  );
};

export default ChangePassword;
