import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 10px;
  background: #f1f1f1;
`;
export const ReveiwRow = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;

  @media (max-width: 576px) {
    grid-template-columns: auto;
  }
`;
export const ViewMoreButtonWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 576px) {
    margin-top: 100px;
  }
`;
export const ViewMoreButton = styled(Link)`
  border-radius: 3px;
  cursor: pointer;
  text-transform: capitalize;

  @media (max-width: 576px) {
    margin-top: 50px;
  }
  ${(props) => ` 
  color: ${props.btntextcolor};
  padding: 7px 12px;
  border: none;
  background: ${props.btnbgcolor};
  transition: 0.4s;
  &&:hover {
    background: ${props.btnbghvcolor};
  }
`}
`;
