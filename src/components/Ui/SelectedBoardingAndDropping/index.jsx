import { useSelector } from "react-redux";
import {
  BorddingAndDroppingPoint,
  CommonHeader,
  Container,
  LocationFrom,
  LocationFromName,
  LocationName,
  LocationRoadName,
  LocationTo,
  Time,
} from "./SelectedBoardingAndDropping.styles.js";
import { useState } from "react";
import { useEffect } from "react";

const SelectedBoardingAndDropping = ({
  boardingInfromation,
  droppingInformation,
}) => {
  const { webSettingData,languageData } = useSelector((state) => state.busLists);
  // const [languageData, setLanguageData] = useState();

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);

  return (
    <Container>
      <BorddingAndDroppingPoint>
        <div>
          <CommonHeader>
            {languageData?.selected_boarding_title[webSettingData?.language]}
          </CommonHeader>
          <LocationFrom>
            <LocationFromName>
              <LocationName>{boardingInfromation.standName}</LocationName>
              <LocationRoadName>{boardingInfromation.detail}</LocationRoadName>
            </LocationFromName>
            <Time>{boardingInfromation.time}</Time>
          </LocationFrom>
        </div>

        <div>
          <CommonHeader>
            {languageData?.selected_dropping_title[webSettingData?.language]}
          </CommonHeader>
          <LocationTo>
            <LocationFromName>
              <LocationName>{droppingInformation.standName}</LocationName>
              <LocationRoadName>{droppingInformation.detail}</LocationRoadName>
            </LocationFromName>
            <Time>{droppingInformation.time}</Time>
          </LocationTo>
        </div>
      </BorddingAndDroppingPoint>
    </Container>
  );
};

export default SelectedBoardingAndDropping;
