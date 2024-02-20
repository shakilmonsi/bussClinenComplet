import { useEffect, useState } from 'react';
import {
  CheckListHeader,
  CheckListWrapper,
} from './PassengersCheckList.styles';

const PassengersCheckList = ({ shadow }) => {
  const [termsDetails, setTermsDetails] = useState(null);

  const getTermsAndContionContent = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/pages/termspage`
    );
    const result = await response.json();
    setTermsDetails(result?.data);
  };

  useEffect(() => {
    try {
      getTermsAndContionContent();
    } catch (error) {
      console.error('Terms and condition error', error);
    }
  }, []);
  return (
    <CheckListWrapper shadow={shadow}>
      {/* <CheckListHeader>
        Mandatory check-list for passengers:
      </CheckListHeader> */}
      <p
        dangerouslySetInnerHTML={{
          __html: termsDetails?.description,
        }}
      ></p>
    </CheckListWrapper>
  );
};

export default PassengersCheckList;
