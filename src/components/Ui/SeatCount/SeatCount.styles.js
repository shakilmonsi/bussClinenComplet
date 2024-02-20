import styled from "styled-components";
import TextField from "../../../bootstrap/TextField";

export const InputArea = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 30%;
  grid-gap: 5%;
  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: 46% 46%;
    grid-gap: 8%;
  }
`;
export const Children = styled.div``;
export const Adult = styled.div``;
export const Special = styled.div``;
export const InputHeader = styled.label`
  text-transform: capitalize;
  font-size: 16px;
  margin-bottom: 10px;

  font-weight: 500;
  color: #172839;
`;
export const SingleInput = styled(TextField)`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  padding: 9px 0px 9px 8%;
  width: 92%;
  border: 1px solid #eaeaea;
  font-size: 14px;
`;
