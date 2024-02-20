import styled from "styled-components";

export const SelectWrapper = styled.select`
  display: block;
  width: 100%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
  &:disabled {
    background-color: #e9ecef;
  }
`;

// @media (prefers-reduced-motion: reduce) {
//   .form-select {
//     transition: none;
//   }
// }
// .form-select:focus {
//   border-color: #86b7fe;
//   outline: 0;
//   box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
// }
// .form-select[multiple], .form-select[size]:not([size="1"]) {
//   padding-right: 0.75rem;
//   background-image: none;
// }
// .form-select:disabled {
//   background-color: #e9ecef;
// }
// .form-select:-moz-focusring {
//   color: transparent;
//   text-shadow: 0 0 0 #212529;
// }
