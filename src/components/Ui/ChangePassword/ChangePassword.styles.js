import styled from "styled-components";
import Button from "../../../bootstrap/Button";

export const FormWrapper = styled.form`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 20px;
  margin-bottom: 50px;
`;
export const NewPassword = styled.div`
  text-align: left;
  display: grid;
  grid-template-columns: 18% 79%;
  grid-gap: 3%;
  margin-top: 20px;
  .input-group-text {
    padding: 0;
    border-right: 1px solid #eee;
  }
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 10px;
    margin-bottom: 30px;
  }
`;
export const UserPasswordWrapper = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  grid-gap: 4%;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  @media (max-width: 576px) {
    grid-template-columns: 100%;
    grid-gap: 10px;
  }
`;
export const NewPassord = styled.div`
  position: relative;
  svg {
    width: 20px;
    position: absolute;
    top: 29%;
    right: 4%;
    cursor: pointer;
    z-index: 1;
  }
`;
export const RePassord = styled.div`
  position: relative;
  svg {
    width: 20px;
    position: absolute;
    top: 29%;
    right: 4%;
    cursor: pointer;
    z-index: 1;
  }
`;
export const OldPassord = styled.div`
  position: relative;
  svg {
    width: 20px;
    position: absolute;
    top: 29%;
    right: 2%;
    cursor: pointer;
    z-index: 1;
  }
`;

export const OldPassword = styled.div`
  text-align: left;
  display: grid;
  grid-template-columns: 18% 79%;
  grid-gap: 3%;
  margin-top: 20px;
  .input-group-text {
    padding: 0;
    border-right: 1px solid #eee;
  }
  @media (max-width: 576px) {
    text-align: left;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 10px;
    margin-bottom: 30px;
  }
`;

export const UpdatedButton = styled(Button)`
  ${(props) => ` 
  background: ${props.btnbgcolor};
  color: ${props.btntextcolor};
  transition: 0.4s;
  &&:hover {
    background: ${props.btnbghvcolor};
  }
  margin-top: 20px;
 `}
`;
