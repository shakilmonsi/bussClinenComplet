import React from "react";
import {
  Card,
  CheckBoxUl,
  CommonLabel,
  CommonNavItem,
  Header,
  InnerCard,
  Input,
} from "./departureTime.styles";

const DepartureTime = ({ departureData, handleDeparture }) => {
  return (
    <Card>
      <InnerCard>
        <Header>Departure Time</Header>
        <CheckBoxUl>
          {departureData.length > 0 ? (
            departureData.map((item) => (
              <CommonNavItem key={item.id}>
                <Input
                  type="checkbox"
                  id={item.detail}
                  name="departure"
                  value={item.detail}
                  onChange={(e) => handleDeparture(e)}
                />
                <CommonLabel htmlFor={item.detail}>{item.detail}</CommonLabel>
              </CommonNavItem>
            ))
          ) : (
            <p>Sorry no departure schedule found!</p>
          )}
        </CheckBoxUl>
      </InnerCard>
    </Card>
  );
};

export default DepartureTime;
