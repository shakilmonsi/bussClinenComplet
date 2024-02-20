import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import navigationBarPhoto from "../../../../assets/images/navBar.png";
import Container from "../../../../bootstrap/Container/";
import SinglePhoto from "../../SinglePhoto/";
import TrackOrder from "../../TrackOrder";
import {
  HeaderBottomWrapper,
  Logo,
  LogoLink,
  NavigationBar,
  NavigationBarIcon,
  NavigationUl,
  NavigationWithOutRes,
  NavigationWrapper,
  NavLink,
  SingleNavItem,
  Wrapper,
} from "./HeaderBottom.styles.js";

const HeaderBottom = ({ userProfileInfo }) => {
  const { webSettingData, languageData } = useSelector(
    (state) => state.busLists
  );
  const [showNavItem, setShowNavItem] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <Wrapper bg={webSettingData?.headercolor}>
      <Container>
        <HeaderBottomWrapper>
          <Logo>
            <LogoLink to="/">
              <SinglePhoto
                img={webSettingData?.headerlogo}
                alt="logo"
                style={{ height: "50px" }}
              />
            </LogoLink>
            <NavigationBar>
              <NavigationBarIcon
                src={navigationBarPhoto}
                alt="navigationIcon"
                onClick={() => setShowNavItem((prevState) => !prevState)}
              />
            </NavigationBar>
          </Logo>
          <NavigationWrapper>
            <NavigationWithOutRes>
              <SingleNavItem>
                <NavLink to="/">
                  {
                    languageData?.navigation_home_button[
                      webSettingData?.language
                    ]
                  }
                </NavLink>
              </SingleNavItem>
              <SingleNavItem>
                <NavLink to="/work">
                  {
                    languageData?.navigation_work_button[
                      webSettingData?.language
                    ]
                  }
                </NavLink>
              </SingleNavItem>
              <SingleNavItem>
                <NavLink to="/blog">
                  {
                    languageData?.navigation_blog_button[
                      webSettingData?.language
                    ]
                  }
                </NavLink>
              </SingleNavItem>

              <SingleNavItem>
                <Popup
                  trigger={
                    <NavLink to="#">
                      {
                        languageData?.navigation_track_button[
                          webSettingData?.language
                        ]
                      }
                    </NavLink>
                  }
                  position="bottom center"
                >
                  <TrackOrder />
                </Popup>
              </SingleNavItem>

              {token ? (
                <SingleNavItem>
                  <NavLink to="/tickets">{userProfileInfo?.first_name}</NavLink>
                </SingleNavItem>
              ) : (
                <SingleNavItem>
                  <NavLink to="/login">
                    {
                      languageData?.navigation_login_button[
                        webSettingData?.language
                      ]
                    }
                  </NavLink>
                </SingleNavItem>
              )}
            </NavigationWithOutRes>

            {showNavItem && (
              <NavigationUl>
                <SingleNavItem>
                  <NavLink to="/">
                    {" "}
                    {
                      languageData?.navigation_home_button[
                        webSettingData?.language
                      ]
                    }
                  </NavLink>
                </SingleNavItem>
                <SingleNavItem>
                  <NavLink to="/work">
                    {
                      languageData?.navigation_work_button[
                        webSettingData?.language
                      ]
                    }
                  </NavLink>
                </SingleNavItem>
                <SingleNavItem>
                  <NavLink to="/blog">
                    {" "}
                    {
                      languageData?.navigation_blog_button[
                        webSettingData?.language
                      ]
                    }
                  </NavLink>
                </SingleNavItem>

                <SingleNavItem>
                  <Popup
                    trigger={
                      <NavLink to="#">
                        {" "}
                        {
                          languageData?.navigation_track_button[
                            webSettingData?.language
                          ]
                        }{" "}
                      </NavLink>
                    }
                    position="bottom center"
                  >
                    <TrackOrder />
                  </Popup>
                </SingleNavItem>

                {token ? (
                  <SingleNavItem>
                    <NavLink to="/tickets">
                      {userProfileInfo?.first_name}
                    </NavLink>
                  </SingleNavItem>
                ) : (
                  <SingleNavItem>
                    <NavLink to="/login">
                      {
                        languageData?.navigation_login_button[
                          webSettingData?.language
                        ]
                      }
                    </NavLink>
                  </SingleNavItem>
                )}
              </NavigationUl>
            )}
          </NavigationWrapper>
        </HeaderBottomWrapper>
      </Container>
    </Wrapper>
  );
};

export default HeaderBottom;
