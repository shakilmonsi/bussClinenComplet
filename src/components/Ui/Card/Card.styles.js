import { Link } from "react-router-dom";
import styled from "styled-components";
import Truncate from "./../../../bootstrap/Truncate";

export const CardWrapper = styled.div`
  width: 100%;
  padding-bottom: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px 10px 0px 0px;
`;
export const SingleImg = styled.img`
  width: 100%;
  height: 214px;
  object-fit: cover;
`;
export const TextWrapper = styled.div`
  padding: 10px 20px 20px 20px;
`;
export const RelatedCalendar = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 5px 0px 10px 0px;
`;
export const RelatedCalenderImg = styled.img`
  margin-right: 10px;
`;
export const RelatedDate = styled.p`
  margin: 0;
`;
export const Title = styled(Truncate)`
  transition: 0.3s;
  &:hover {
    color: ${(props) => props.hvColor};
  }
`;
export const ReadMoreBtn = styled(Link)`
  ${(props) => ` 
border: none;
  padding: 8px 20px;
  background: ${props.btnbgcolor};
  color: ${props.btntextcolor};
  transition: 0.4s;
  border-radius: 3px;
  font-size: 14px;
  &&:hover {
    background: ${props.btnbghvcolor};
  }
`}
`;
