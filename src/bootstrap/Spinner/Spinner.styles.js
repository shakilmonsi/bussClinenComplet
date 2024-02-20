import styled from "styled-components";
import { Color } from "../../color";

export const SpinnerWrapper = styled.div`
  text-align: center;
`;
export const SingleSpinner = styled.div`
  @-webkit-keyframes spinner-border {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes spinner-border {
    to {
      transform: rotate(360deg);
    }
  }
  color: ${Color};
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: -0.125em;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: 0.75s linear infinite spinner-border;
  animation: 0.75s linear infinite spinner-border;
`;
