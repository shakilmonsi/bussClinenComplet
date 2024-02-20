import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import checkboxIcon from "../../../assets/checkbox.svg";

import {
  CheckboxIcon,
  Facilities,
  FacilitiesHeader,
  FacilitiesText,
  FacilitiesUl,
  SingleFacilities,
} from "./BusFacilities.styles.js";

const BusFacilities = ({ facility }) => {
  const { webSettingData,languageData } = useSelector((state) => state.busLists);
  const [facilityList, setFacilityList] = useState([]);
  const [singleFacilityList, setSingleFacilityList] = useState([]);
  // const [languageData, setLanguageData] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/facilities`)
      .then((res) => res.json())
      .then((data) => setFacilityList(data.data));

    const facilityNumber = facility.split(",");
    setSingleFacilityList(facilityNumber);
  }, []);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);

  const facilityName = (id) => {
    const slectedItem = facilityList.find((item) => item.id === id);
    return slectedItem?.name;
  };

  return (
    <Facilities>
      <FacilitiesHeader>
        {languageData?.booking_page_bus_facilities[webSettingData?.language]}
      </FacilitiesHeader>
      <FacilitiesUl>
        {singleFacilityList.length &&
          singleFacilityList.map((item, index) => (
            <SingleFacilities key={index}>
              <CheckboxIcon src={checkboxIcon} alt="checkboxIcon" />
              <FacilitiesText>{facilityName(item)}</FacilitiesText>
            </SingleFacilities>
          ))}
      </FacilitiesUl>
    </Facilities>
  );
};

export default BusFacilities;
