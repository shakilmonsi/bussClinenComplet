import { useEffect, useState } from "react";
import {
  SocialImage,
  SocialMediaLink,
  SocialMediaUl,
} from "./SocialMedia.styles";

const SocialMedia = ({ ...style }) => {
  const [socialMedia, setSocialMedia] = useState(null);

  const getSocialMedia = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_MODULE_DOMAIN}/website/seetings/social/media`
      );
      const result = await response.json();

      if (result.status === "success") {
        setSocialMedia(result?.data);
      }
    } catch (error) {
      console.log("social media error", error);
    }
  };

  useEffect(() => {
    getSocialMedia();
    return () => {
      setSocialMedia({}); // This worked for me
    };
  }, []);

  const handleSocialLink = (e, link) => {
    e.preventDefault();

    if (!link.includes("http")) {
      window.open(`http://${link}`, "_blank");
    } else {
      window.open(`${link}`, "_blank");
    }
  };

  return (
    <SocialMediaUl {...style}>
      {socialMedia &&
        socialMedia?.map((item) => (
          <li key={item?.id}>
            <SocialMediaLink
              href={`${item?.link}`}
              onClick={(e) => handleSocialLink(e, item?.link)}
            >
              <SocialImage img={item?.image_path} alt="social media icon" />
            </SocialMediaLink>
          </li>
        ))}
    </SocialMediaUl>
  );
};

export default SocialMedia;
