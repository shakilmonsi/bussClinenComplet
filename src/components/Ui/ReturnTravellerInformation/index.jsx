import React from "react";
import TextField from "../../../bootstrap/TextField";
import {
  FirstNameAndNid,
  Passenger,
  Select,
  UserContactWrapper,
} from "../SingleTravellerInformation/singleTravellerInformation.styles";

const ReturnTravellerInformation = ({
  values,
  passengerIndex,
  handleChange,
  roundTrip,
}) => {
  return (
    <div>
      <>
        <Passenger>
          {roundTrip ? (
            <label htmlFor={`rname${passengerIndex ? passengerIndex : ""}`}>
              Passenger {passengerIndex}
            </label>
          ) : (
            <label htmlFor={`name${passengerIndex ? passengerIndex : ""}`}>
              Passenger {passengerIndex}
            </label>
          )}

          {roundTrip ? (
            <UserContactWrapper>
              <FirstNameAndNid>
                <Select
                  name={`gender${passengerIndex ? passengerIndex : ""}`}
                  id={`gender${passengerIndex ? passengerIndex : ""}`}
                  onChange={handleChange}
                >
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                </Select>
                <TextField
                  id={`first${passengerIndex}`}
                  name={`first${passengerIndex}`}
                  type="text"
                  placeholder="Given Name"
                  value={values[`first${passengerIndex}`]}
                  onChange={handleChange}
                  autoComplete="nope"
                />
              </FirstNameAndNid>
              <TextField
                type="text"
                placeholder="Surname"
                name={`second${passengerIndex}`}
                value={values[`second${passengerIndex}`]}
                onChange={handleChange}
                autoComplete="nope"
              />
            </UserContactWrapper>
          ) : (
            <UserContactWrapper>
              <FirstNameAndNid>
                <Select
                  name={`gender${passengerIndex ? passengerIndex : ""}`}
                  id={`gender${passengerIndex ? passengerIndex : ""}`}
                  onChange={handleChange}
                >
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                </Select>
                <TextField
                  id={`first${passengerIndex}`}
                  name={`first${passengerIndex}`}
                  type="text"
                  placeholder="Given Name"
                  value={values[`first${passengerIndex}`]}
                  onChange={handleChange}
                  autoComplete="nope"
                />
              </FirstNameAndNid>
              <TextField
                type="text"
                placeholder="Surname"
                name={`second${passengerIndex}`}
                value={values[`second${passengerIndex}`]}
                onChange={handleChange}
                autoComplete="nope"
              />
            </UserContactWrapper>
          )}
        </Passenger>
        {/* end passenger */}

        {roundTrip ? (
          <Passenger>
            <label htmlFor={`renid${passengerIndex ? passengerIndex : ""}`}>
              NID / Passport
            </label>
            <UserContactWrapper>
              {/* start */}
              <FirstNameAndNid>
                <TextField
                  id={`renid${passengerIndex ? passengerIndex : ""}`}
                  name={`renid${passengerIndex}`}
                  type="text"
                  placeholder="Document No"
                  value={values[`renid${passengerIndex}`]}
                  onChange={handleChange}
                />
              </FirstNameAndNid>

              <TextField
                type="number"
                placeholder="Contact No"
                name={`contactNo${passengerIndex}`}
                value={values[`contactNo${passengerIndex}`]}
                onChange={handleChange}
                autoComplete="nope"
              />
            </UserContactWrapper>
          </Passenger>
        ) : (
          <Passenger>
            <label htmlFor={`renid${passengerIndex ? passengerIndex : ""}`}>
              NID / Passport
            </label>
            <UserContactWrapper>
              {/* start */}
              <FirstNameAndNid>
                <TextField
                  id={`renid${passengerIndex ? passengerIndex : ""}`}
                  name={`renid${passengerIndex}`}
                  type="text"
                  placeholder="Document No"
                  value={values[`renid${passengerIndex}`]}
                  onChange={handleChange}
                />
              </FirstNameAndNid>

              <TextField
                type="number"
                placeholder="Contact No"
                name={`contactNo${passengerIndex}`}
                value={values[`contactNo${passengerIndex}`]}
                onChange={handleChange}
                autoComplete="nope"
              />
            </UserContactWrapper>
          </Passenger>
        )}
      </>
    </div>
  );
};

export default ReturnTravellerInformation;
