import { useEffect, useState } from "react";
import Container from "../../../bootstrap/Container";
import SectionHeader from "../SectionHeader/";
import { CardWrapper, InnerWrapper, SingleCard } from "./Work.styles.js";

const Work = () => {
  const [header, setHeader] = useState([]);
  const [articale, setArticale] = useState([]);

  const getWorkHeader = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/work`);
    const result = await response.json();
    setHeader(result?.data[0]);
  };

  const getWorkContent = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_DOMAIN}/work/articles`
    );
    const result = await response.json();
    setArticale(result?.data);
  };

  useEffect(() => {
    try {
      getWorkHeader();
      getWorkContent();
      return () => {
        setHeader({});
        setArticale({});
      };
    } catch (error) {
      console.log("work error", error);
    }
  }, []);

  const selectedArticale = articale.slice(0, 3);

  return (
    <Container>
      <InnerWrapper>
        <SectionHeader header={header?.title} subHeader={header?.sub_title} />
        <CardWrapper>
          {selectedArticale?.map((item) => (
            <SingleCard
              url={`/work/${item?.id}`}
              key={item?.id}
              item={item}
              headerLength="30"
              descriptaionLength="60"
            />
          ))}
        </CardWrapper>
      </InnerWrapper>
    </Container>
  );
};

export default Work;
