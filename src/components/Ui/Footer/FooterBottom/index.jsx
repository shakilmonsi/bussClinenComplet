import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Container from "../../../../bootstrap/Container/";
import SocialMedia from "../../SocialMedia";
import {
  CopyRight,
  FollowTitle,
  FooterBottomLeft,
  FooterBottomRight,
  FooterLogo,
  InnerFooterBottom,
  Wrapper,
} from "./FooterBottom.styles.js";
import { useEffect, useState } from "react";

const FooterBottom = () => {
  // const [languageData, setLanguageData] = useState();

  const { webSettingData ,languageData} = useSelector((state) => state.busLists);
  const currentYear = new Date().getFullYear();
  const history = useHistory();

  const handelarClick = () => {
    history.push("/");
  };

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);

  return (
    <Wrapper bgColor={webSettingData?.bottomfootercolor}>
      <Container>
        <InnerFooterBottom>
          <FooterBottomLeft>
            <FooterLogo
              img={webSettingData?.footerlogo}
              alt="logo"
              onClick={handelarClick}
            />
            <CopyRight>
              &copy; {currentYear} {webSettingData?.copyright}
            </CopyRight>
          </FooterBottomLeft>

          {/* end footer left */}

          <FooterBottomRight>
            <FollowTitle>
              {languageData?.footer_bottom_title[webSettingData?.language]}
            </FollowTitle>
            <SocialMedia />
          </FooterBottomRight>
          {/* end footer right */}
        </InnerFooterBottom>
      </Container>
    </Wrapper>
  );
};

export default FooterBottom;
