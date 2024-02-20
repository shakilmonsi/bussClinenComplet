import React from "react";
import TextField from "../../../bootstrap/TextField";
import {
  FirstNameAndNid,
  Passenger,
  Select,
  UserContactWrapper,
} from "./singleTravellerInformation.styles";

const SingleTravellerInformation = ({
  values,
  passengerIndex,
  handleChange,
  roundTrip,
}) => {
  return (
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
              name={`rsurName${passengerIndex}`}
              value={values[`rsurName${passengerIndex}`]}
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
          <label htmlFor={`rnid${passengerIndex ? passengerIndex : ""}`}>
            NID / Passport
          </label>
          <UserContactWrapper>
            {/* start */}
            <FirstNameAndNid>
              <TextField
                id={`rnid${passengerIndex ? passengerIndex : ""}`}
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
          <label htmlFor={`nid${passengerIndex ? passengerIndex : ""}`}>
            NID / Passport
          </label>
          <UserContactWrapper>
            {/* start */}
            <FirstNameAndNid>
              <TextField
                id={`nid${passengerIndex ? passengerIndex : ""}`}
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
  );
};

export default SingleTravellerInformation;
