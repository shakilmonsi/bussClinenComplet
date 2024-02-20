import styled from "styled-components";

export const FormCheck = styled.div`
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5em;
  margin-bottom: 0.125rem;
  input {
    cursor: pointer;
    float: left;
    margin-left: -1.5em;
    width: 1em;
    height: 1em;
    margin-top: 0.25em;
    vertical-align: top;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 1px solid rgba(0, 0, 0, 0.25);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }
  input[type="checkbox"] {
    border-radius: 0.25em;
  }
  input[type="radio"] {
    border-radius: 50%;
  }
  input:active {
    filter: brightness(90%);
  }
  input:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
  input:checked {
    background-color: #0d6efd;
    border-color: #0d6efd;
  }
  input:checked[type="checkbox"] {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
  }
  input:checked[type="radio"] {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
  }
  input[type="checkbox"]:indeterminate {
    background-color: #0d6efd;
    border-color: #0d6efd;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M6 10h8'/%3e%3c/svg%3e");
  }
  input:disabled {
    pointer-events: none;
    filter: none;
    opacity: 0.5;
  }
`;
export const Label = styled.label`
  cursor: pointer;
`;

// .form-switch .form-check-input {
//   width: 2em;
//   margin-left: -2.5em;
//   background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");
//   background-position: left center;
//   border-radius: 2em;
//   transition: background-position 0.15s ease-in-out;
// }
// @media (prefers-reduced-motion: reduce) {
//   .form-switch .form-check-input {
//     transition: none;
//   }
// }
// .form-switch .form-check-input:focus {
//   background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2386b7fe'/%3e%3c/svg%3e");
// }
// .form-switch .form-check-input:checked {
//   background-position: right center;
//   background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
// }

// .form-check-inline {
//   display: inline-block;
//   margin-right: 1rem;
// }
// .form-check-input[disabled] ~ .form-check-label, .form-check-input:disabled ~ .form-check-label {
//   opacity: 0.5;
// }
// .form-switch {
//   padding-left: 2.5em;
// }
