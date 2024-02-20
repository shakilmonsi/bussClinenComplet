import styled from 'styled-components';
import Button from '../../bootstrap/Button';

export const Container = styled.div`
  font-size: 14px;
`;
export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`;
export const FormWrapper = styled.div`
  padding: 100px 50px;
  @media (max-width: 576px) {
    padding: 50px 0px;
  }
`;
export const FormLogo = styled.img`
  width: 145px;
  height: 66px;
  @media (max-width: 576px) {
    width: 110px;
    height: 50px;
  }
`;
export const InnerFormArea = styled.div`
  width: 400px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin: 0 auto;
  @media (max-width: 576px) {
    width: 300px;
  }
  @media (max-width: 420px) {
    width: 250px;
  }
`;
export const InnerFormPadding = styled.div`
  padding: 40px;
  @media (max-width: 576px) {
    padding: 20px;
  }
  @media (max-width: 420px) {
    padding: 20px;
  }
`;
export const FormHeader = styled.h5`
  text-transform: capitalize;
  text-align: left;
  color: #363636;
  font-size: 18px;
  padding-top: 15px;
  margin: 0;
`;
export const SubHeader = styled.p`
  text-align: left;
  padding: 10px 0px;
  font-size: 14px;
`;
export const InputField = styled.div`
  width: 100%;
  margin-bottom: 15px;
  background: #f7fafc;
  position: relative;
`;
export const SingupButton = styled(Button)`
  text-transform: capitalize;
  ${(props) => ` 
 border: none;
  padding: 12px 0px;
  background: ${props.btnbgcolor};
  color: ${props.btntextcolor};
  transition: 0.4s;
  &&:hover {
    background: ${props.btnbghvcolor};
  }
  width: 100%;
  fontsize: 18px;
`}
`;
