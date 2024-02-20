import { useEffect, useState } from "react";
import Container from "../../bootstrap/Container/";
import Layout from "../../bootstrap/Layout/";
import Spinner from "../../bootstrap/Spinner";
import SectionHeader from "../../components/Ui/SectionHeader/index.jsx";
import {
  BodyWrapper,
  CardWrapper,
  SingleCard,
  SpinnerWrapper,
} from "./AllWork.styles.js";
import { useSelector } from "react-redux";

const AllWork = () => {
  const [articale, setArticale] = useState([]);
  const [header, setHeader] = useState([]);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const { webSettingData, languageData } = useSelector(
    (state) => state.busLists
  );

  useEffect(() => {
    setUserProfileInfo(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/work`)
      .then((res) => res.json())
      .then((data) => setHeader(data.data[0]));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/work/articles`)
      .then((res) => res.json())
      .then((data) => setArticale(data.data));
  }, []);

  const selectedArticale = articale.slice(0, 3);

  return (
    <Layout
    title={languageData?.work_tab_title[webSettingData?.language]}
      userProfileInfo={userProfileInfo}
    >
      {selectedArticale?.length ? (
        <>
          <Container>
            <BodyWrapper>
              <SectionHeader
                header={header?.title}
                subHeader={header?.sub_title}
              />
              <CardWrapper>
                {selectedArticale?.map((item) => (
                  <SingleCard
                    key={item?.id}
                    url={`/work/${item?.id}`}
                    item={item}
                    headerLength="40"
                    descriptaionLength="60"
                  />
                ))}
              </CardWrapper>
            </BodyWrapper>
          </Container>
        </>
      ) : (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
    </Layout>
  );
};

export default AllWork;
