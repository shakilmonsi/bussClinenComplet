import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./bootstrap/Spinner";
import PrivateRoute from "./components/Ui/PrivateRoute";
// import languageInfo from "./lib/lang.config.json";
import { AllBlog, ForgotPassword, Home, Login, Signup } from "./pages";
import About from "./pages/About";
import AllReview from "./pages/AllReview";
// import AllBlog from "./Pages/AllBlog";
import AllWork from "./pages/AllWork";
import Booking from "./pages/Booking";
import Checkout from "./pages/Checkout";
import CheckoutPayment from "./pages/Checkout/checkPayment";
import ContactUs from "./pages/ContactUs/index";
import Cookies from "./pages/Cookies";
import Faq from "./pages/Faq";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import ResetPassword from "./pages/ResetPassword";
import SingleBlog from "./pages/SingleBlog";
import SingleWork from "./pages/SingleWork";
import Terms from "./pages/Terms";
import Tickets from "./pages/Tickets";
import TicketTraking from "./pages/TicketTraking";

import {
  appDataAction,
  contactInfo,
  language,
  webSetting,
} from "./redux/action/busAction";
import SingleTestimonials from "./pages/SingleTestimonials";

function App() {
  const { webSettingData } = useSelector((state) => state.busLists);
  const [appData, setAppData] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const getContactInfo = async () => {
    const ac = new AbortController();

    const response = await fetch(
      `${process.env.REACT_APP_API_MODULE_DOMAIN}/website/seetings/footer/content`,
      { signal: ac.signal }
    );
    const result = await response.json();

    if (result.status === "success") {
      dispatch(contactInfo(result?.data[0]));
    }

    return () => ac.abort();
  };

  useEffect(() => {
    try {
      getContactInfo();
    } catch (error) {
      console.log("Footer address error", error);
    }

    fetch(`${process.env.REACT_APP_API_DOMAIN}/app`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setAppData(result?.data[0]);
          dispatch(appDataAction(result?.data[0]));
        }
      });

    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/website/seetings`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          dispatch(webSetting(result?.data));
        }
      });

    fetch(`${process.env.REACT_APP_API_MODULE_DOMAIN}/localize/strings`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result?.status);
        if (result.status === "success") {
          dispatch(language(result?.data));
          localStorage.setItem("language", JSON.stringify(result?.data));
        }
      });

    // dispatch(language(languageInfo));
  }, []);
  useEffect(() => {
    if (webSettingData?.fontfamely === undefined) {
      return;
    } else {
      document.querySelector(
        'link[rel="stylesheet"]'
      ).href = `https://fonts.googleapis.com/css?family=${webSettingData?.fontfamely}`;
    }

    document.querySelector("body").style.fontFamily =
      webSettingData?.fontfamely;

    document.querySelector('link[rel="icon"]').href = webSettingData?.favicon;
  }, [webSettingData]);

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userProfileInfo");
      history.push("/");
      window.location.reload();
    }, 30 * 60 * 1000);
  }, [history]);

  return (
    <>
      <ToastContainer />
      {webSettingData ? (
        <Switch>
          <Route exact path="/" component={() => <Home appData={appData} />} />
          <Route exact path="/blog" component={AllBlog} />
          <Route exact path="/work" component={AllWork} />
          <Route exact path="/blog/details/:id" component={SingleBlog} />
          <Route exact path="/work/:id" component={SingleWork} />
          <Route
            exact
            path="/single-testimonial/:id"
            component={SingleTestimonials}
          />
          
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/booking" component={Booking} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/check-payment/:id" component={CheckoutPayment} />

          <PrivateRoute path="/tickets">
            <Tickets></Tickets>
          </PrivateRoute>
          <Route exact path="/ticket-traking" component={TicketTraking} />
          <Route exact path="/about" component={About} />
          <Route exact path="/cookies" component={Cookies} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/terms-and-condition" component={Terms} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/contact-us" component={ContactUs} />
          <Route exact path="/all-review" component={AllReview} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route path="*" component={NotFound} />
        </Switch>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default App;
