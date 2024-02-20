import React, { useEffect, useState } from "react";
import PageContent from "../../components/Ui/PageContent";
import Layout from "./../../bootstrap/Layout/index";

const Terms = () => {
  const [termsDetails, setTermsDetails] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);

  const getTermsAndContionContent = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/pages/termspage`
    );
    const result = await response.json();
    setTermsDetails(result?.data);
  };

  useEffect(() => {
    try {
      getTermsAndContionContent();
    } catch (error) {
      console.log("Terms and condition error", error);
    }
  }, []);

  return (
    <Layout title="Terms and Condition" userProfileInfo={userProfileInfo}>
      <PageContent content={termsDetails} />
    </Layout>
  );
};

export default Terms;
