import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState();
  const [username, setName] = useState();

  const login = useCallback((uid, token, email, username, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setEmail(email);
    setName(username);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        email: email,
        username: username,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    // eslint-disable-next-line
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setEmail(null);
    setName(null);
    localStorage.removeItem("userData");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
    // eslint-disable-next-line
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.email,
        storedData.username,
        new Date(storedData.expiration)
      );
    }
    // eslint-disable-next-line
  }, [login]);

  return { token, login, logout, userId, username, email };
};
