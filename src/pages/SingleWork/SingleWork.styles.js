import styled from "styled-components";

export const WorkWrapper = styled.div`
  padding: 50px 0px;
  @media (max-width: 992px) {
    padding: 50px 20px;
  }
`;
export const WorkTitle = styled.h4`
  font-size: 22px;
  line-height: 1.5;
  margin: 0;
  font-weight: 600;
  padding-bottom: 15px;
  padding-top: 15px;
`;
export const WorkDescription = styled.p`
  color: #716c80;
  margin: 0;
  font-size: 14px;
  line-height: 2;
  padding-bottom: 40px;
`;
export const WorkImage = styled.img`
  border-radius: 5px;
  width: 100%;
  max-height: 400px;
  height: 100%;
  object-fit: cover;
`;
