import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import Container from "../../../bootstrap/Container";
import {
  Answer,
  ContentWrapper,
  Description,
  FAQWrapper,
  HeroComponent,
  InnerWrapper,
} from "./PageContent.styles";

const PageContent = ({ content, faqQuestion }) => {
  const [contentDetails, setContentDetails] = useState(null);

  useEffect(() => {
    setContentDetails(content);
  }, [content]);

  return (
    <ContentWrapper>
      <HeroComponent
        header={contentDetails?.title}
        subHeader={contentDetails?.sub_title}
      />
      <Container>
        <InnerWrapper>
          <Description
            dangerouslySetInnerHTML={{ __html: contentDetails?.description }}
          />

          <FAQWrapper>
            {faqQuestion && (
              <Accordion>
                {faqQuestion.map((item, index) => (
                  <AccordionItem key={item?.id}>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        {Number(index) + 1}. {item?.question}
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Answer
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </FAQWrapper>
        </InnerWrapper>
      </Container>
    </ContentWrapper>
  );
};

export default PageContent;
