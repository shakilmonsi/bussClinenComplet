import styled from "styled-components";

export const Wrapper = styled.div`
  background: #f8f8f8;
  min-height: calc(100vh - 362px);
`;

export const InnerBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 80px 0px;

  @media (max-width: 768px) {
    padding: 40px 0px;
  }
`;
export const LeftSide = styled.div`
  flex: 1;
  padding: 30px;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
  @media (max-width: 768px) {
    padding: 20px;
    flex: 100%;
  }
`;
export const RightSide = styled.div`
  flex: 1;
  padding-left: 50px;

  @media (max-width: 768px) {
    margin-top: 40px;
    padding-left: 10px;
    flex: 100%;
  }
`;
export const Form = styled.form`
  width: 100%;
`;
export const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  grid-gap: 4%;
  @media (max-width: 1024px) {
    grid-template-columns: 100%;
  }
`;
export const SingleInput = styled.input`
  margin-bottom: 10px;
  width: 90%;
  padding: 15px 5%;
  border: 1px solid #eaeaea;
`;

export const Message = styled.textarea`
  resize: vertical;
  width: 90%;
  padding: 10px 5%;
  margin-bottom: 30px;
  border: 1px solid #eaeaea;
`;
export const SubmitBtn = styled.input`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background: ${(props) => props.btnBgColor};
  color: ${(props) => props.btnTextColor};
  transition: 0.4s;
  border-radius: 3px;
  font-size: 14px;
  &&:hover {
    background: ${(props) => props.btnBgHvColor};
  }
`;
export const Details = styled.div`
  line-height: 1;
  color: #716c80;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
export const RightSideTitle = styled.h2`
  margin: 0px;
  font-size: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
export const RightSideSubTitle = styled.h4`
  margin: 0px;
  font-size: 18px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
export const Email = styled.a`
  color: ${(props) => props.textColor};
`;
