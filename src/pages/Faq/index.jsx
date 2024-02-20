import React, { useEffect, useState } from "react";
import PageContent from "../../components/Ui/PageContent";
import Layout from "./../../bootstrap/Layout/index";

const Faq = () => {
  const [faqDetails, setFaqDetails] = useState(null);
  const [faqQuestion, setFaqQuestion] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);

  const getFAQHeading = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/pages/faqpage`
    );
    const result = await response.json();
    setFaqDetails(result?.data);
  };

  const getFAQQuestion = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/pages/question`
    );
    const result = await response.json();
    setFaqQuestion(result?.data);
  };

  useEffect(() => {
    try {
      getFAQHeading();
      getFAQQuestion();
    } catch (error) {
      console.log("FAQ error", error);
    }
  }, []);

  return (
    <Layout title="FAQ" userProfileInfo={userProfileInfo}>
      <PageContent content={faqDetails} faqQuestion={faqQuestion} />
    </Layout>
  );
};

export default Faq;
