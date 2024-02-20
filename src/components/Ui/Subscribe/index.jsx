import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Container from "../../../bootstrap/Container/";
import {
  Form,
  FormArea,
  Header,
  Input,
  SubHeader,
  SubmitButton,
  SubscribeWrapper,
  Wrapper,
} from "./Subscribe.styles.js";

const Subscribe = () => {
  const { webSettingData ,languageData} = useSelector((state) => state.busLists);
  const [header, setHeader] = useState([]);
  const [values, setValues] = useState({
    email: "",
  });
  // const [languageData, setLanguageData] = useState();

  const getSubscirbeHeader = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_DOMAIN}/subscribe`
    );
    const result = await response.json();
    setHeader(result?.data[0]);
  };
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);
  
  useEffect(() => {
    try {
      getSubscirbeHeader();
      return () => {
        setHeader({}); // This worked for me
      };
    } catch (error) {
      console.log("subscribe error", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", values?.email);
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/website/emails/subscrib`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result?.status === "success") {
      setValues({
        email: "",
      });
      toast.success("success");
    }
  };

  return (
    <Wrapper>
      <SubscribeWrapper img={header.image}>
        <Container>
          <Header>{header.title}</Header>
          <SubHeader>{header.sub_title}</SubHeader>
          <FormArea>
            <Form onSubmit={handleSubmit}>
              <Input
                placeholder={
                  languageData?.subscribe_component_input[
                    webSettingData?.language
                  ]
                }
                type="email"
                name="email"
                value={values?.email}
                onChange={handleChange}
              />
              <SubmitButton
                type="submit"
                btnbgcolor={webSettingData?.buttoncolor}
                btnbghvcolor={webSettingData?.buttoncolorhover}
                btntextcolor={webSettingData?.buttontextcolor}
              >
                {
                  languageData?.subscribe_component_bnt[
                    webSettingData?.language
                  ]
                }
              </SubmitButton>
            </Form>
          </FormArea>
        </Container>
      </SubscribeWrapper>
    </Wrapper>
  );
};

export default Subscribe;
