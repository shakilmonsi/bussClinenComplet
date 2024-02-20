import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Ul from "../../../bootstrap/Ul";
import Advertisment from "./../Advertisment/index";
import {
  AdvertismentWrapper,
  SideBar,
  SideBarNavItemWrapper,
  SingleNavItem,
} from "./TicketSidebar.style";


const TicketSidebar = ({
  setTicket,
  setProfile,
  setChangePassword,
  setLaggues,
  ticket,
  changePassword,
  profile,
  profileAdvertisement,
}) => {
  const { webSettingData,languageData } = useSelector((state) => state.busLists);
  const history = useHistory();
  // const [languageData, setLanguageData] = useState();

  const handleProfileUpdate = () => {
    setProfile(true);
    setTicket(false);
    setChangePassword(false);
    setLaggues(false);
  };

  const handleTicket = () => {
    setTicket(true);
    setProfile(false);
    setChangePassword(false);
    setLaggues(false);
  };

  // const handleLaggues = () => {
  //   setLaggues(true);
  //   setProfile(false);
  //   setTicket(false);
  //   setChangePassword(false);
  // };

  const handleChangePassword = () => {
    setChangePassword(true);
    setProfile(false);
    setTicket(false);
    setLaggues(false);
  };

  const handleLougout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfileInfo");
    history.push("/");
  };
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
  //     .then((res) => res.json())
  //     .then((data) => setLanguageData(data.data));
  // }, []);

  return (
    <div>
      <SideBar>
        <SideBarNavItemWrapper>
          <Ul style={{ flexDirection: "column" }}>
            <SingleNavItem
              onClick={handleTicket}
              textcolor={ticket && webSettingData?.buttoncolor}
              hvcolor={webSettingData?.buttoncolor}
            >
              {
                languageData?.tickets_page_navigation_tickets_btn[
                  webSettingData?.language
                ]
              }
            </SingleNavItem>

            <SingleNavItem
              onClick={handleProfileUpdate}
              textcolor={profile && webSettingData?.buttoncolor}
              hvcolor={webSettingData?.buttoncolor}
            >
              {
                languageData?.tickets_page_navigation_profile_btn[
                  webSettingData?.language
                ]
              }
            </SingleNavItem>
            <SingleNavItem
              onClick={handleChangePassword}
              textcolor={changePassword && webSettingData?.buttoncolor}
              hvcolor={webSettingData?.buttoncolor}
            >
              {
                languageData?.tickets_page_navigation_change_password_btn[
                  webSettingData?.language
                ]
              }
            </SingleNavItem>
            <SingleNavItem
              onClick={handleLougout}
              hvcolor={webSettingData?.buttoncolor}
            >
              {
                languageData?.tickets_page_navigation_logout_btn[
                  webSettingData?.language
                ]
              }
            </SingleNavItem>
          </Ul>
        </SideBarNavItemWrapper>

        <AdvertismentWrapper>
          <Advertisment advertisement={profileAdvertisement} />
        </AdvertismentWrapper>
      </SideBar>
    </div>
  );
};

export default TicketSidebar;
