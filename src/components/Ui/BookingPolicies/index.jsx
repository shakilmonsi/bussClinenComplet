import React, { useEffect, useState } from 'react';
import { Container } from './BookingPolicies.styles.js';

const BookingPolicies = () => {
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
    <Container>
      <p
        dangerouslySetInnerHTML={{
          __html: termsDetails?.description,
        }}
      ></p>
    </Container>
  );
};

export default BookingPolicies;
