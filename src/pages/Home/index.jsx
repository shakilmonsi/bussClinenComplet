import React, { useEffect, useRef, useState } from "react";
import Layout from "../../bootstrap/Layout";
import Blog from "../../components/Ui/Blog";
import Hero from "../../components/Ui/Hero";
import Journy from "../../components/Ui/Journy";
import MobileApp from "../../components/Ui/MobileApp";
import SearchForm from "../../components/Ui/SearchFrom";
import Subscribe from "../../components/Ui/Subscribe";
import Testimonial from "../../components/Ui/Testimonial";
import Work from "../../components/Ui/Work";
import { HeroArea, SearchFromArea } from "./Home.styles.js";
import { useSelector } from "react-redux";

export const Home = () => {
  const locationRef = useRef(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [filterBus, setFilterBus] = useState([]);
  const { webSettingData, languageData } = useSelector(
    (state) => state.busLists
  );

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);

  return (
    <Layout
      title={languageData?.home_tab_title[webSettingData?.language]}
      userProfileInfo={userProfileInfo}
    >
      <HeroArea>
        <Hero locationRef={locationRef} />
        <SearchFromArea>
          <SearchForm locationRef={locationRef} setFilterBus={setFilterBus} />
        </SearchFromArea>
      </HeroArea>

      <Work />
      <Journy />
      <Testimonial />
      <MobileApp />
      <Blog />
      <Subscribe />
    </Layout>
  );
};
