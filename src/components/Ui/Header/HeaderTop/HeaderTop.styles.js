import styled from "styled-components";

export const Container = styled.div`
  padding: 7px 50px;
  background: #172839;
  @media (max-width: 992px) {
    padding: 7px 20px;
  }
  @media (max-width: 576px) {
    display: none;
  }
`;
export const HeaderTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 12px;
  font-weight: 200;
`;
export const HeaderTopLeft = styled.div`
  display: flex;
  align-items: center;
`;
export const HeaderTopRight = styled.div``;
export const ContactNumber = styled.a`
  color: white;
  text-decoration: none;
  margin-left: 15px;
`;
