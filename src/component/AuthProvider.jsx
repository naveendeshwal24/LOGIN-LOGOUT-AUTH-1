import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    // Check if token is present in localStorage on component mount
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);

    if (storedToken) {
      setToken(storedToken);
      setIsLoggedin(true);
    }
  }, []);

  const contextValue = {
    token,
    isLoggedin,
    setToken,
    setIsLoggedin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default AuthProvider;
