import styled from "styled-components";

export const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 18% 79%;
  grid-gap: 3%;
  align-items: flex-start;
  border-bottom: 1px solid #eaeaea;
  text-align: left;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 10px;
  }
  label {
    text-transform: capitalize;
  }
`;
export const ContactInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  grid-gap: 4%;
  align-items: center;
  .input-group-text {
    padding: 0;
    border-right: 1px solid #eee;
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 4%;
    align-items: center;
  }
`;
export const Select = styled.select`
  padding: 0.575rem 0.75rem;
  border: none;
  border: 1px solid #eaeaea;
  border-right: 0px solid transparent;
  outline: none;
  &&:focus-visible {
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }
`;
export const ContactText = styled.div`
  padding: 20px 0px;
  font-size: 12px;
  text-align: left;
`;

export const UserContactWrapper = styled.div`
  display: flex;
  Select {
    width: 40%;
  }
`;
export const LoginWrapper = styled.div`
  text-transform: capitalize;
  display: flex;
  margin-bottom: 20px;
`;
export const LoginText = styled.div`
  ${(props) => ` 
 color: ${props.textcolor};
  transition: 0.4s;
  &&:hover {
    color: ${props.texthvcolor};
  }
  cursor: pointer;
  margin-left: 10px;
`}
`;
