import React from 'react';
import ProductDetail from '../page/ProductDetail';
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ authenticate }) => {
  const location = useLocation(); // 현재 경로를 가져옵니다.
  
  return authenticate === true ? (
    <ProductDetail />
  ) : (
    <Navigate to="/login" state={{ from: location }} /> // 접근하려던 경로를 state로 전달
  );
};

export default PrivateRoute;
