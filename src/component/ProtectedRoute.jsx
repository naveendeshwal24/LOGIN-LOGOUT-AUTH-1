import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../component/AuthProvider";

const ProtectedRoute = () => {
  //getting token to authenticate the pages based on use
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/LandingPage " />;
  }

  return <Outlet />; //return the child component from the router defined into the CustomRoute file
};

export default ProtectedRoute;
