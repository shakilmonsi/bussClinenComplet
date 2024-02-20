import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import TextField from "../../../bootstrap/TextField/index.jsx";
import {
  Address,
  CityAndZip,
  Country,
  FirstNameAndNid,
  FirstNameGender,
  FormWrapper,
  Nid,
  Passenger,
  Select,
  UpdatedButton,
  UserContactWrapper,
} from "./UserProfile.styles.js";

const UserProfile = ({ token }) => {
  const { webSettingData, languageData } = useSelector(
    (state) => state.busLists
  );
  const [countryName, setCountryName] = useState([]);
  const [values, setvalues] = useState({
    first_name: "",
    last_name: "",
    id_type: "",
    id_number: "",
    country_id: "",
    city: "",
    address: "",
    zip_code: "",
  });

  useEffect(() => {
    setvalues(JSON.parse(localStorage.getItem("userProfileInfo")));
  }, [token]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/countries`)
      .then((res) => res.json())
      .then((data) => setCountryName(data.data));
  }, []);

  const getCountry = () =>
    countryName.findIndex(
      (country) => String(country.id) === String(values?.country_id)
    );

  let countries = [];
  countryName.map((item) =>
    countries.push({
      value: item.nicename,
      label: item.nicename,
      id: item.id,
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("first_name", values?.first_name);
    formData.append("last_name", values?.last_name);
    formData.append("id_type", values?.id_type || "nid");
    formData.append("id_number", values?.id_number);
    formData.append("country_id", values?.country_id);
    formData.append("city", values?.city);
    formData.append("address", values?.address);
    formData.append("zip_code", values?.zip_code);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_MODULE_DOMAIN}/passangers/profileinfo`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (result?.status === "success") {
        toast.success("success");
        return;
      }
    } catch (error) {
      console.log("passenger info update error", error);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {token && (
        <>
          <Passenger>
            <label htmlFor="name">
              {languageData?.profile_passenger_label[webSettingData?.language]}
            </label>
            <UserContactWrapper>
              <FirstNameGender>
                {/* <Select name="gender" id="gender" onChange={(e) => setvalues({ ...values, gender: e.target.value })}>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
            </Select> */}
                <TextField
                  id="name"
                  name="first_name"
                  type="text"
                  placeholder="Given Name"
                  autoComplete="nope"
                  value={values?.first_name}
                  onChange={(e) =>
                    setvalues({ ...values, first_name: e.target.value })
                  }
                />
              </FirstNameGender>
              <TextField
                type="text"
                placeholder="Surname"
                name="last_name"
                value={values?.last_name}
                onChange={(e) =>
                  setvalues({ ...values, last_name: e.target.value })
                }
                autoComplete="nope"
              />
            </UserContactWrapper>
          </Passenger>
          {/* end passenger */}

          <Nid>
            <label htmlFor={`nid`}>{languageData?.profile_nid_label[webSettingData?.language]}</label>
            {/* start */}
            <FirstNameAndNid>
              <Select
                name="id_type"
                id="id_type"
                onChange={(e) =>
                  setvalues({ ...values, id_type: e.target.value })
                }
              >
                <option value="Nid">NID</option>
                <option value="Passport">PP</option>
              </Select>
              <TextField
                id="nid"
                name="passPort"
                type="text"
                placeholder="Document No"
                value={values?.id_number}
                onChange={(e) =>
                  setvalues({ ...values, id_number: e.target.value })
                }
              />
            </FirstNameAndNid>
          </Nid>

          <Address>
            <label htmlFor="zip">{languageData?.profile_zip_code_label[webSettingData?.language]}</label>
            <CityAndZip>
              <TextField
                id="zip"
                type="text"
                placeholder="Zip Code"
                name="zip_code"
                value={values?.zip_code}
                onChange={(e) =>
                  setvalues({ ...values, zip_code: e.target.value })
                }
              />
              <TextField
                type="text"
                placeholder="City"
                name="city"
                value={values?.city}
                onChange={(e) => setvalues({ ...values, city: e.target.value })}
              />
            </CityAndZip>
          </Address>

          <Address>
            <label htmlFor="address">{languageData?.profile_address_label[webSettingData?.language]}</label>
            <TextField
              id="address"
              type="text"
              placeholder="Address"
              name="address"
              value={values?.address}
              onChange={(e) =>
                setvalues({ ...values, address: e.target.value })
              }
            />
          </Address>
          {/* end Address */}
          <Country>
            <label htmlFor="countryName">{languageData?.profile_country_label[webSettingData?.language]}</label>

            <ReactSelect
              options={countries}
              name="country_id"
              value={countries[getCountry()]}
              onChange={(selectOption) =>
                setvalues({ ...values, country_id: selectOption.id })
              }
            />
          </Country>
          <UpdatedButton
            btnbgcolor={webSettingData?.buttoncolor}
            btnbghvcolor={webSettingData?.buttoncolorhover}
            btntextcolor={webSettingData?.buttontextcolor}
          >
            {languageData?.profile_update_button[webSettingData?.language]}
          </UpdatedButton>
        </>
      )}
    </FormWrapper>
  );
};

export default UserProfile;
