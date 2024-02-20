import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 15% 80%;
  gap: 5%;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
  border: 1px solid #d9d9d9;
  padding: 10px;
  background: white;
  border-radius: 5px;
`;

export const LeftSide = styled.div``;
export const RightSide = styled.div`
  h4 {
    margin: 0;
  }
`;
export const ImgWrapper = styled.div`
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
export const Date = styled.p`
  margin: 0;
`;
export const Comments = styled.p`
  color: #716c80;
  font-size: 12px;
  word-break: break-all;
`;
