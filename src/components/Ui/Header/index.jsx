import HeaderBottom from "./HeaderBottom";

const Header = ({ userProfileInfo }) => {
  return (
    <>
      {/* <HeaderTop  /> */}
      <HeaderBottom userProfileInfo={userProfileInfo} />
    </>
  );
};

export default Header;
