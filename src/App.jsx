import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./scenes/HomePage/HomePage";
import ProfilePage from "./scenes/ProfilePage/ProfilePage";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import BuildPage from "./scenes/BuildPage/BuildPage";
import ProductPage from "./scenes/ProductPage/ProductPage";
import RequestsPage from "./scenes/RequestsPage/RequestsPage";
import {
  selectMode,
  selectUser,
  setLogout,
} from "./store/slices/auth/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let logoutTimer;

function App() {
  const mode = useSelector(selectMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();
  const isAuth = Boolean(useSelector(selectUser)?.token);

  const logout = useCallback(() => {
    dispatch(setLogout());
  }, []);

  useEffect(() => {
    const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    if (isAuth && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [isAuth]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer
            limit={3}
            hideProgressBar={true}
            autoClose={2000}
            position="top-center"
            theme={mode}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/build" element={<BuildPage />} />
            <Route path="/products" element={<ProductPage />} />
            {isAuth && (
              <>
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />{" "}
              </>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
