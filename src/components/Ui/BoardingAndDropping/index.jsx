import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Col from "../../../bootstrap/Col/index.jsx";
import Row from "../../../bootstrap/Row/index.jsx";

import {
  BoardingAndDroppingPointUl,
  CommonHeader,
  CommonNavItem,
  Input,
  LocationName,
  LocationRoadName,
  Point,
  PointLabel,
  Select,
  Time,
} from "./BoardingAndDropping.styles.js";

const BoardingAndDropping = ({
  id,
  tripId,
  setBoardingInfromation,
  setDroppingInformation,
}) => {
  const { webSettingData,languageData } = useSelector((state) => state.busLists);
  const [width, setWidth] = useState();
  const [boardingPoint, setBoardingPoint] = useState([]);
  const [droppingPoint, setDroppingPoint] = useState([]);
  const [standList, setStandList] = useState([]);
  // const [languageData, setLanguageData] = useState();
  const innerWidth = window.innerWidth;

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/triplist/boardings/${tripId}`
    )
      .then((res) => res.json())
      .then((data) => setBoardingPoint(data.data));

    fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/triplist/droppings/${tripId}`
    )
      .then((res) => res.json())
      .then((data) => setDroppingPoint(data.data));

    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/stands`)
      .then((res) => res.json())
      .then((data) => setStandList(data.data));
  }, [tripId]);
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);

  const getStandName = (id) => {
    const standName = standList.find((item) => item.id === id);
    return standName?.name;
  };

  const handleBoardingClick = (e, boardingItem) => {
    const item = boardingPoint.find((item) => {
      const value = `${item.time}-${item.detail}-${getStandName(
        item.stand_id
      )}`;
      return value === e.target.value;
    });

    const values = e.target.value.split("-");
    setBoardingInfromation({
      time: values[0],
      detail: values[1],
      standName: values[2],
      stand_id: item?.id || boardingItem?.id,
    });
  };

  const handleDroppingClick = (e, droppingItem) => {
    const item = droppingPoint.find((item) => {
      const value = `${item.time}-${item.detail}-${getStandName(
        item.stand_id
      )}`;
      return value === e.target.value;
    });

    const values = e.target.value.split("-");
    setDroppingInformation({
      time: values[0],
      detail: values[1],
      standName: values[2],
      stand_id: item?.id || droppingItem?.id,
    });
  };

  useEffect(() => {
    setWidth(innerWidth);
  }, [width]);

  // console.log("boardingPoint", boardingPoint);

  return (
    <Point>
      <Row style={{ alignItems: "flex-start" }}>
        <Col md="6" sm="12">
          {width < 768 ? (
            <Select
              name="boardingPoint"
              id="boardingPoint"
              onChange={(e) => handleBoardingClick(e)}
            >
              <option value="">
                {
                  languageData?.booking_page_boarding_title[
                    webSettingData?.language
                  ]
                }
              </option>
              {boardingPoint?.map((item) => (
                <option
                  key={item.id}
                  id="boardingPoint"
                  name="boardingPoint"
                  value={`${item.time}-${item.detail}-${getStandName(
                    item.stand_id
                  )}`}
                >
                  {`${item.time}-${item.detail}-${getStandName(item.stand_id)}`}
                </option>
              ))}
            </Select>
          ) : (
            <div>
              <CommonHeader>
                {
                  languageData?.booking_page_boarding_title[
                    webSettingData?.language
                  ]
                }
                <span>
                  {" "}
                  <b style={{ color: "red" }}>*</b>
                </span>
              </CommonHeader>
              <BoardingAndDroppingPointUl>
                {boardingPoint?.map((item) => (
                  <CommonNavItem key={item.id}>
                    <Input
                      type="radio"
                      id={`${id}${item.id}`}
                      name="boardingPoint"
                      value={`${item.time}-${item.detail}-${getStandName(
                        item.stand_id
                      )}`}
                      onClick={(e) => handleBoardingClick(e, item)}
                    />
                    <PointLabel htmlFor={`${id}${item.id}`}>
                      <Time>{item.time}</Time>
                      <div>
                        <LocationName>
                          {getStandName(item.stand_id)}
                        </LocationName>
                        <LocationRoadName>{item.detail}</LocationRoadName>
                      </div>
                    </PointLabel>
                  </CommonNavItem>
                ))}
              </BoardingAndDroppingPointUl>
            </div>
          )}
        </Col>
        {/* end BordingPoint */}

        <Col md="6" sm="12">
          {width < 768 ? (
            <Select
              name="droppingPoint"
              id="droppingPoint"
              onChange={(e) => handleDroppingClick(e)}
            >
              <option value="">
                {
                  languageData?.booking_page_dropping_title[
                    webSettingData?.language
                  ]
                }
              </option>
              {droppingPoint?.map((item) => (
                <option
                  key={item.id}
                  id="droppingPoint"
                  name="droppingPoint"
                  value={`${item.time}-${item.detail}-${getStandName(
                    item.stand_id
                  )}`}
                >
                  {`${item.time}-${item.detail}-${getStandName(item.stand_id)}`}
                </option>
              ))}
            </Select>
          ) : (
            <div>
              <CommonHeader>
                {
                  languageData?.booking_page_dropping_title[
                    webSettingData?.language
                  ]
                }
                <span>
                  {" "}
                  <b style={{ color: "red" }}>*</b>
                </span>
              </CommonHeader>
              <BoardingAndDroppingPointUl>
                {droppingPoint?.map((item) => (
                  <CommonNavItem key={item.id}>
                    <Input
                      type="radio"
                      id={`${id}${item.id}`}
                      name="droppingPoint"
                      value={`${item.time}-${item.detail}-${getStandName(
                        item.stand_id
                      )}`}
                      onClick={(e) => handleDroppingClick(e, item)}
                    />
                    <PointLabel htmlFor={`${id}${item.id}`}>
                      <Time>{item.time}</Time>
                      <div>
                        <LocationName>
                          {getStandName(item.stand_id)}
                        </LocationName>
                        <LocationRoadName>{item.detail}</LocationRoadName>
                      </div>
                    </PointLabel>
                  </CommonNavItem>
                ))}
              </BoardingAndDroppingPointUl>
            </div>
          )}
        </Col>
      </Row>
    </Point>
  );
};

export default BoardingAndDropping;
