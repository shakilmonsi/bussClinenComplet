import styled from "styled-components";

export const SingleButton = styled.button`
  cursor: pointer;
  background-color: ${({ props }) => props.color};
  color: ${({ theme }) => theme.textColor};
`;
