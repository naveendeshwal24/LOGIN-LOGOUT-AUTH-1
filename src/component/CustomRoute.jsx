// CustomRoutes.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import RegistrationForm from "./RegistrationForm";
import MasterList from "./MasterList";
import EditList from "./EditList";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import LandingPage from "./LandingPage";
import ResetPassword from "./ResetPassword";
import ThreeDComponent from "./ThreeDComponent";

const CustomRoutes = () => {
  const { token } = useAuth();
  console.log("token on custom-route Page", token);

  const routesForAuthenticatedOnly = [
    {
      path: "/EditList",
      element: <EditList />,
    },
    {
      path: "/MasterList",
      element: <MasterList />,
    },
    {
      path: "/LogIn",
      element: <LogIn />,
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/LogIn",
      element: <LogIn />,
    },
    {
      path: "/ThreeDComponent",
      element: <ThreeDComponent />,
    },
    {
      path: "/reset_password",
      element: <ResetPassword />,
    },
    {
      path: "/ResetPassword",
      element: <ResetPassword />,
    },
    {
      path: "/SignUp",
      element: <SignUp />,
    },
    {
      path: "/RegistrationForm",
      element: <RegistrationForm />,
    },
    {
      path: "/ForgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/LandingPage",
      element: <LandingPage />,
    },
  ];

  const routes = token
    ? routesForAuthenticatedOnly
    : routesForNotAuthenticatedOnly;
  console.log(routes);
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
};

export default CustomRoutes;
