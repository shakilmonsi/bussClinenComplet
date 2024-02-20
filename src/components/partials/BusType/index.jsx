import React from "react";
import {
  Card,
  CheckBoxUl,
  CommonLabel,
  CommonNavItem,
  Header,
  InnerCard,
  Input,
} from "./busType.styles.js";

const BusType = ({ fleet, handleBusTypeChange }) => {
  return (
    <Card>
      <InnerCard>
        <Header>bus types</Header>
        <CheckBoxUl>
          {fleet.length > 0 ? (
            fleet.map((item) => (
              <CommonNavItem key={item.id}>
                <Input
                  type="checkbox"
                  id={item.type}
                  name="vehicle1"
                  data-fleetid={item.id}
                  value={item.type}
                  onChange={(e) => handleBusTypeChange(e)}
                />
                <CommonLabel htmlFor={item.type}>{item.type}</CommonLabel>
              </CommonNavItem>
            ))
          ) : (
            <p>Sorry, no bus type found!</p>
          )}
        </CheckBoxUl>
      </InnerCard>
    </Card>
  );
};

export default BusType;
