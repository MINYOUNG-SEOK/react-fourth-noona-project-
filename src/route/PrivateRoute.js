import React from "react";
import ProductDetail from "../page/ProductDetail";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ authenticate }) => {
  const location = useLocation();

  return authenticate === true ? (
    <ProductDetail />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
