import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-accessible-accordion/dist/fancy-example.css";
import ReactPaginate from "react-paginate";
import Container from "../../bootstrap/Container";
import Layout from "../../bootstrap/Layout";
import ChangePassword from "../../components/Ui/ChangePassword";
import Laggues from "../../components/Ui/Laggues";
import SingleTicket from "../../components/Ui/SingleTicket";
import TicketHeader from "../../components/Ui/TicketHeader";
import TicketSidebar from "../../components/Ui/TicketSidebar";
import UserProfile from "../../components/Ui/UserProfile";
import {
  Accordions,
  PageBody,
  PaginationWrapper,
  TicketList,
} from "./Tickets.styles";
const Tickets = () => {
  const { webSettingData, languageData } = useSelector(
    (state) => state.busLists
  );
  const [userProfileInfo, setUserProfileInfo] = useState([]);
  const [token, setToken] = useState("");
  const [fullName, setFullName] = useState("");
  const [passengerTicket, setPassengerTicket] = useState([]);
  const [profile, setProfile] = useState(false);
  const [ticket, setTicket] = useState(true);
  const [laggues, setLaggues] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [advertisment, setAdvertisment] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [reload, setReload] = useState(false);
  const ticketsPerPage = 6;
  const pageVisited = pageNumber * ticketsPerPage;
  const displayTickets = passengerTicket.slice(
    pageVisited,
    pageVisited + ticketsPerPage
  );

  const pageCount = Math.ceil(passengerTicket.length / ticketsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/adds`)
      .then((res) => res.json())
      .then((result) => setAdvertisment(result?.data));
  }, []);

  const profileAdvertisement = advertisment?.find(
    (item) => item?.pagename === "customer"
  );

  useEffect(() => {
    setFullName(`${userProfileInfo?.first_name} ${userProfileInfo?.last_name}`);
    setToken(localStorage.getItem("token"));
  }, [token, userProfileInfo]);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        getPassengerTikects();
        fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/passangers/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result?.status === "success") {
              setUserProfileInfo(result?.data);
              localStorage.setItem(
                "userProfileInfo",
                JSON.stringify(result?.data)
              );
            }
          });
      }, 500);
    }
  }, [token, reload]);

  async function getPassengerTikects() {
    try {
      if (token) {
        const response = await fetch(
          `${process.env.REACT_APP_API_MODULE_DOMAIN}/passangers/tickets`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (result?.status === "success") {
          setPassengerTicket(result?.data.reverse());
        }
      }
    } catch (error) {
      console.log("Passenger ticket error", error);
    }
  }

  return (
    <Layout
      title={languageData?.account_tab_title[webSettingData?.language]}
      userProfileInfo={userProfileInfo}
    >
      {token && userProfileInfo && (
        <>
          <TicketHeader
            token={token}
            fullName={fullName}
            userProfileInfo={userProfileInfo}
          />
          <Container>
            <PageBody>
              <TicketSidebar
                setTicket={setTicket}
                setProfile={setProfile}
                setChangePassword={setChangePassword}
                setLaggues={setLaggues}
                ticket={ticket}
                laggues={laggues}
                changePassword={changePassword}
                profile={profile}
                profileAdvertisement={profileAdvertisement}
              />

              <div>
                {profile && <UserProfile token={token} />}
                {laggues && <Laggues />}
                {changePassword && <ChangePassword token={token} />}

                {ticket && token && (
                  <>
                    <TicketList>
                      {displayTickets.length ? (
                        <>
                          <Accordions>
                            {displayTickets.map((item) => (
                              <SingleTicket
                                item={item}
                                key={item?.id}
                                userProfileInfo={userProfileInfo}
                                setReload={setReload}
                              />
                            ))}
                          </Accordions>
                          <PaginationWrapper
                            btnAndBorderColor={webSettingData?.buttoncolor}
                            btnColor={webSettingData?.buttontextcolor}
                          >
                            <ReactPaginate
                              previousLabel={"<"}
                              nextLabel={">"}
                              pageCount={pageCount}
                              onPageChange={changePage}
                              containerClassName={"paginationBttn"}
                              previousLinkClassName={"previousBttn"}
                              nextLinkClassName={"nextBttn"}
                              disabledClassName={"paginationDisabled"}
                              activeClassName="active"
                            />
                          </PaginationWrapper>
                        </>
                      ) : (
                        <h1 style={{ textAlign: "center" }}>No Ticket Found</h1>
                      )}
                    </TicketList>
                  </>
                )}
              </div>
            </PageBody>
          </Container>
        </>
      )}
    </Layout>
  );
};

export default Tickets;
