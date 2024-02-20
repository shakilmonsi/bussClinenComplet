import { useEffect, useState } from "react";
import { Route } from "react-router";

const PrivateRoute = ({ children, ...rest }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const getToken = localStorage.getItem("token")?.split(".")[1];
      setToken(JSON.parse(atob(getToken)));
    } else {
      setToken(null);
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <>
        <Route
          {...rest}
          render={({ location }) =>
            token !== null && token.exp ? children : <></>
          }
        />
      </>
    </div>
  );
};

export default PrivateRoute;
