import styled from "styled-components";

export const CenterIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ProgressBtn = styled.button`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  outline: none;
  cursor: pointer;
  border: 0;
  background-color: #fff;
`;

export const CircleProgress = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
`;
