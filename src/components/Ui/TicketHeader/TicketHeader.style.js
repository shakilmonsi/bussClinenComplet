import styled from "styled-components";

export const UserInformation = styled.div`
  position: relative;
  content: "";
  left: 0;
  bottom: -160px;
  display: grid;
  grid-template-columns: 25% 75%;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 992px) {
    grid-template-columns: 100%;
    left: 0;
    bottom: 0;
    padding-top: 20px;
  }
`;
export const UserImgWrraper = styled.div`
  width: 150px;
  height: 150px;

  border: 5px solid white;
  border-radius: 50%;
  position: relative;
  @media (max-width: 992px) {
    margin: 0 auto;
    border: 5px solid #d9d9d9;
  }
`;
export const UserImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
export const EditIconWrapper = styled.label`
  position: absolute;
  content: "";
  right: 9px;
  bottom: 6px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  padding: 4px;
  cursor: pointer;
`;
export const EditIcon = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
export const ImageInput = styled.input`
  display: none;
`;
export const UserName = styled.h4`
  font-size: 30px;
  font-weight: 600;
  margin: 0;
  color: white;
  @media (max-width: 992px) {
    color: #000;
    text-align: center;
  }
`;
export const UserTag = styled.h5`
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  color: white;
  @media (max-width: 992px) {
    color: #000;
    text-align: center;
  }
`;
