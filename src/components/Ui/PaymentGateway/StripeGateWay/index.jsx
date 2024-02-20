import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCard from "../StripeCard/index";
const stripePromise = loadStripe(
  "pk_test_51Ie122BgoNPnJ9PsOBsvki1BkTcQVp6b39eTR7b3rvDMx3iYWAVreWIxJiXADDnILvmJPQ4Mn8YsN7HLm6H1aTcP00gLGZhD34"
);

const StripeGateWay = () => {
  
  return (
    <>
      <Elements stripe={stripePromise}>
        <StripeCard />
      </Elements>
    </>
  );
};

export default StripeGateWay;
