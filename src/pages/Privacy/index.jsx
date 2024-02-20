import React, { useEffect, useState } from "react";
import PageContent from "../../components/Ui/PageContent";
import Layout from "./../../bootstrap/Layout/index";

function Privacy() {
  const [privacyDetails, setPrivacyDetails] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);

  const getPrivcyContent = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/pages/privacypage`
    );
    const result = await response.json();
    setPrivacyDetails(result?.data);
  };

  useEffect(() => {
    try {
      getPrivcyContent();
    } catch (error) {
      console.log("Privcy page error", error);
    }
  }, []);

  return (
    <Layout title="Privacy" userProfileInfo={userProfileInfo}>
      <PageContent content={privacyDetails} />
    </Layout>
  );
}

export default Privacy;
