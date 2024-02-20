import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import android from "../../../../assets/images/android.png";
import apple from "../../../../assets/images/ios-1.png";
import Container from "../../../../bootstrap/Container/";
import ScrollUp from "../../ScrollUP";
import {
  About,
  Address,
  CommonNavItem,
  Download,
  DownloadHeader,
  FooterBottomWrapper,
  FooterIcon,
  InnerAbout,
  InnerPrivacy,
  Privacy,
  SocialImage,
  Wrapper,
} from "./FooterBottom.styles.js";
import { useState } from "react";
import { useEffect } from "react";
import { SocialMediaImage } from "../../MobileApp/MobileApp.styles";

const FooterTop = () => {
  // const [languageData, setLanguageData] = useState();

  const { webSettingData, contactInfoData, appDataAction,languageData } = useSelector(
    (state) => state.busLists
  );

  return (
    <Wrapper bgColor={webSettingData?.footercolor}>
      <Container>
        <FooterBottomWrapper>
          <Address>
            Phone: {contactInfoData?.contact} <br />
            {contactInfoData?.opentime} <br /> {contactInfoData?.address}
          </Address>

          <About>
            <InnerAbout>
              <CommonNavItem hvcolor={webSettingData?.headercolor}>
                <Link to="/about">
                  {
                    languageData?.footer_top_about_button[
                      webSettingData?.language
                    ]
                  }
                </Link>
              </CommonNavItem>
              <CommonNavItem hvcolor={webSettingData?.headercolor}>
                <Link to="/blog">
                  {
                    languageData?.footer_top_blog_button[
                      webSettingData?.language
                    ]
                  }
                </Link>
              </CommonNavItem>
              <CommonNavItem hvcolor={webSettingData?.headercolor}>
                <Link to="/faq">
                  {
                    languageData?.footer_top_FAQ_button[
                      webSettingData?.language
                    ]
                  }
                </Link>
              </CommonNavItem>
              <CommonNavItem hvcolor={webSettingData?.headercolor}>
                <Link to="/contact-us">
                  {
                    languageData?.footer_top_contact_button[
                      webSettingData?.language
                    ]
                  }
                </Link>
              </CommonNavItem>
            </InnerAbout>
          </About>

          <Privacy>
            <InnerPrivacy>
              <CommonNavItem hvcolor={webSettingData?.headercolor}>
                <Link to="/privacy">
                  {
                    languageData?.footer_top_privacy_button[
                      webSettingData?.language
                    ]
                  }
                </Link>
              </CommonNavItem>
              <CommonNavItem hvcolor={webSettingData?.headercolor}>
                <Link to="/cookies">
                  {
                    languageData?.footer_top_cookies_button[
                      webSettingData?.language
                    ]
                  }
                </Link>
              </CommonNavItem>
              <CommonNavItem hvcolor={webSettingData?.headercolor}>
                <Link to="/terms-and-condition">
                  {
                    languageData?.footer_top_terms_button[
                      webSettingData?.language
                    ]
                  }
                </Link>
              </CommonNavItem>
            </InnerPrivacy>
          </Privacy>

          <Download>
            <FooterIcon>
              {appDataAction?.button_one_status == 0 ? (
                <></>
              ) : (
                <>
                  <DownloadHeader>
                    {
                      languageData?.footer_top_download_app[
                        webSettingData?.language
                      ]
                    }
                  </DownloadHeader>
                  <a
                    href={appDataAction?.button_one_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SocialMediaImage img={apple} alt="apple" />
                  </a>
                </>
              )}
              {appDataAction?.button_two_status == 0 ? (
                <></>
              ) : (
                <>
                  <a
                    href={appDataAction?.button_two_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SocialMediaImage img={android} alt="android" />
                  </a>
                </>
              )}
            </FooterIcon>
            <ScrollUp />
          </Download>
        </FooterBottomWrapper>
      </Container>
    </Wrapper>
  );
};

export default FooterTop;
