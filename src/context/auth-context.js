import React, { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  email: null,
  name: null,
  role: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = (props) => {
  const { token, login, logout, userId, email, name, role } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        email: email,
        name: name,
        role: role,
        login: login,
        logout: logout,
      }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
