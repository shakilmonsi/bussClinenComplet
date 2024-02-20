import React, { useEffect, useState } from "react";
import android from "../../../assets/images/android.png";
import apple from "../../../assets/images/ios-1.png";
import Container from "../../../bootstrap/Container/";
import {
  Details,
  Header,
  LeftSide,
  MobileWrapper,
  Photo,
  RightSide,
  SocialMedia,
  SocialMediaImage,
  Wrapper,
} from "./MobileApp.styles.js";

const MobileApp = () => {
  const [appData, setAppData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/app`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setAppData(result?.data[0]);
        }
      });
  }, []);



  return (
    <Wrapper>
      <Container>
        <MobileWrapper>
          <LeftSide>
            <Photo img={appData?.image} alt="Mobile App" />
          </LeftSide>
          <RightSide>
            <Header>{appData?.title}</Header>
            <Details>{appData?.sub_title}</Details>
            <SocialMedia>
              {appData?.button_one_status == 0 ? (
                <></>
              ) : (
                <>
                  <a
                    href={appData?.button_one_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SocialMediaImage img={apple} alt="apple" />
                  </a>
                </>
              )}
              {appData?.button_two_status == 0 ? (
                <></>
              ) : (
                <>
                  <a
                    href={appData?.button_two_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SocialMediaImage img={android} alt="android" />
                  </a>
                </>
              )}
            </SocialMedia>
          </RightSide>
        </MobileWrapper>
      </Container>
    </Wrapper>
  );
};

export default MobileApp;
