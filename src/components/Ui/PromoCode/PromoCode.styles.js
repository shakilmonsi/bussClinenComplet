import styled from "styled-components";
import Button from "../../../bootstrap/Button";

export const Container = styled.div``;
export const Apply = styled.div`
  text-align: left;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 10px;
  margin-top: 20px;
`;

export const ApplyHeader = styled.h4`
  font-size: 16px;
  text-transform: capitalize;
`;
export const ApplySubHeader = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: 14px;
`;
export const ApplyWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 70% 30%;
`;
export const ApplyButton = styled(Button)`
  text-transform: capitalize;
  ${(props) => ` 
 background: ${props.btnbgcolor};
  color: ${props.btntextcolor};
  transition: 0.4s;
  &&:hover {
    background: ${props.btnbghvcolor};
  }
`}
`;
