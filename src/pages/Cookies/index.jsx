import React, { useEffect, useState } from "react";
import PageContent from "../../components/Ui/PageContent";
import Layout from "./../../bootstrap/Layout/index";

const Cookies = () => {
  const [cookiesDetails, setCookiesDetails] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);

  const getCokiesContent = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/pages/cookepage`
    );
    const result = await response.json();
    setCookiesDetails(result?.data);
  };

  useEffect(() => {
    try {
      getCokiesContent();
    } catch (error) {
      console.log("Cookies page error", error);
    }
  }, []);

  return (
    <Layout title="Cookies" userProfileInfo={userProfileInfo}>
      <PageContent content={cookiesDetails} />
    </Layout>
  );
};

export default Cookies;
