import { useState } from "react";
import { toast } from "react-toastify";
import editIcon from "../../../assets/images/photoEditIcon.png";
import profilePic from "../../../assets/profile.jpge.webp";
import Container from "../../../bootstrap/Container";
import { FirstLetterUppercase } from "../../../helpers";
import { BackgroundImg } from "../../../pages/Tickets/Tickets.styles";
import {
  EditIcon,
  EditIconWrapper,
  ImageInput,
  UserImg,
  UserImgWrraper,
  UserInformation,
  UserName,
  UserTag,
} from "./TicketHeader.style";

const TicketHeader = ({ token, fullName, userProfileInfo }) => {
  const [profilePhoto, setProfilePhoto] = useState("");

  const handleImgUpload = async (e) => {
    const image = e.target.files[0];

    if (!image?.name?.match(/\.(jpg|jpeg|png|gif)$/) && image !== undefined) {
      toast.error("You can only upload .jpg, .jpeg, .png, .gif etc");
      return;
    }
    if (Number(image?.size) > 1000000) {
      toast.error("Image size must be less than 1000000 Byte");
      return;
    }
    const bookingData = new FormData();
    bookingData.append("image", e.target.files[0]);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_MODULE_DOMAIN}/passangers/picupload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: bookingData,
        }
      );

      const result = await response.json();
      if (image) {
        setProfilePhoto(URL.createObjectURL(image));
      }
    } catch (error) {
      console.log("Photo upload error", error);
    }
  };

  return (
    <div>
      <BackgroundImg>
        <Container>
          <UserInformation>
            <UserImgWrraper>
              {!userProfileInfo?.image && !profilePhoto ? (
                <>
                  <UserImg src={profilePic} alt="" />
                </>
              ) : (
                <>
                  {profilePhoto ? (
                    <UserImg src={profilePhoto} alt="Profile" />
                  ) : (
                    <UserImg src={userProfileInfo?.image} alt={fullName} />
                  )}
                </>
              )}

              <EditIconWrapper htmlFor="edit">
                <EditIcon src={editIcon} alt="editIcon" />
                <ImageInput
                  type="file"
                  id="edit"
                  onChange={(e) => handleImgUpload(e)}
                />
              </EditIconWrapper>
            </UserImgWrraper>
            <div>
              {!userProfileInfo?.first_name ? (
                <>
                  <UserName>Loading...</UserName>
                </>
              ) : (
                <UserName>
                  {userProfileInfo?.first_name} {userProfileInfo?.last_name}
                </UserName>
              )}

              <UserTag>
                {userProfileInfo?.tag
                  ? userProfileInfo?.tag
                  : `We are open 24/7`}
              </UserTag>
            </div>
          </UserInformation>
        </Container>
      </BackgroundImg>
    </div>
  );
};

export default TicketHeader;
