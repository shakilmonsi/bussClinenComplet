import React, { useEffect, useState } from "react";
import PageContent from "../../components/Ui/PageContent";
import Layout from "./../../bootstrap/Layout/index";
import { useSelector } from "react-redux";

const About = () => {
  const [aboutDetails, setAboutDetails] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
 

  const getAboutContent = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/pages/aboutpage`
    );
    const result = await response.json();
    setAboutDetails(result?.data);
  };

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);

  useEffect(() => {
    try {
      getAboutContent();
    } catch (error) {
      console.log("About page error", error);
    }
  }, []);

  return (
    <Layout
      title="About"
      userProfileInfo={userProfileInfo}
    >
      <PageContent content={aboutDetails} />
    </Layout>
  );
};

export default About;
