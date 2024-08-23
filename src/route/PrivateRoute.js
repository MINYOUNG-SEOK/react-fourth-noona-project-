import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticate }) => {
  const location = useLocation();

  return authenticate === true ? (
    <Component />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
