import React from "react";
import {
  Card,
  CheckBoxUl,
  CommonLabel,
  CommonNavItem,
  Header,
  Input,
} from "./arrivalTime.styles";

const ArrivalTime = ({ arrivalData, handleArrival }) => {
  return (
    <Card>
      <Header>arrival time</Header>
      <CheckBoxUl>
        {arrivalData.length > 0 ? (
          arrivalData.map((item) => (
            <CommonNavItem key={item.id}>
              <Input
                type="checkbox"
                id={item.detail}
                name="arrival"
                value={item.detail}
                onChange={(e) => handleArrival(e)}
              />
              <CommonLabel htmlFor={item.detail}>{item.detail}</CommonLabel>
            </CommonNavItem>
          ))
        ) : (
          <p>Sorry, no arrival schedule found!</p>
        )}
      </CheckBoxUl>
    </Card>
  );
};

export default ArrivalTime;
