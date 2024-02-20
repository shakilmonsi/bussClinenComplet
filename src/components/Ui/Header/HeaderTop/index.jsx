import React from "react";
import contactPhoto from "../../../../assets/images/phone-call.svg";
import SinglePhoto from "../../SinglePhoto";
import {
  ContactNumber,
  Container,
  HeaderTopLeft,
  HeaderTopRight,
  HeaderTopWrapper,
} from "./HeaderTop.styles.js";

const HeaderTop = () => {
  return (
    <Container>
      <HeaderTopWrapper>
        <HeaderTopLeft>
          <SinglePhoto
            img={contactPhoto}
            alt="contactPhoto"
            style={{ marginRight: "10px", width: "16px" }}
          />
          <span>Available 24/7. </span>
          <ContactNumber
            href="tel:+88010000000"
            className="ms-3 text-decoration-none"
          >
            at (+880) 10000000
          </ContactNumber>
        </HeaderTopLeft>

        {/* end left */}

        <HeaderTopRight>
          <span>contact</span>
        </HeaderTopRight>
      </HeaderTopWrapper>
    </Container>
  );
};

export default HeaderTop;
