import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 10px;
  z-index: 1;
`;
export const Title = styled.div`
  padding: 0px;
  font-size: 16px;
  text-transform: capitalize;
`;

export const Label = styled.label`
  font-size: 12px;
  cursor: pointer;
  text-transform: capitalize;
`;

export const Form = styled.form`
  margin-top: 20px;
`;
export const InputInnerWrapper = styled.div`
  border: 1px solid #d9d9d9;
  margin-top: 10px;
  display: grid;
  grid-template-columns: 80% 20%;
  width: 100%;
  align-items: center;
`;
export const Input = styled.input`
  padding: 7px;
  border: none;
  outline: none;
  border-right: 1px solid #d9d9d9;
`;

export const SubmitButton = styled.button`
  text-transform: capitalize;

  ${(props) => ` 
height: 100%;
  background: ${props.btnbgcolor};
  color: ${props.btntextcolor};
  transition: 0.4s;
  &&:hover {
    background: ${props.btnbghvcolor};
  }
  border: none;
  cursor: pointer;
`}
`;
