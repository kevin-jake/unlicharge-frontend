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
import { resetSortPageFilters } from "./store/slices/buildpage/buildpageSlice";
import Footer from "./scenes/Footer/Footer";
import AboutPage from "./scenes/AboutPage/AboutPage";
import ContactPage from "./scenes/ContactPage/ContactPage";

let logoutTimer;

function App() {
  const mode = useSelector(selectMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();
  const { token, timeToLogout } = useSelector(selectUser) || {};
  const isAuth = Boolean(token);
  const tokenExpirationDate = new Date(timeToLogout);
  const logout = useCallback(() => {
    dispatch(setLogout());
    dispatch(resetSortPageFilters());
  }, []);

  useEffect(() => {
    if (isAuth && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      if (remainingTime <= 0) {
        logout();
      } else logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [isAuth]);

  useEffect(() => {
    document.title =
      import.meta.env.DEV || import.meta.env.MODE == "dev"
        ? "[DEV] - Unlicharge"
        : "Unlicharge";
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer
            limit={3}
            hideProgressBar={true}
            autoClose={3000}
            position="top-center"
            theme={mode}
          />
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<BuildPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* <Route path="/build" element={<BuildPage />} /> */}
            {/* <Route path="/products" element={<ProductPage />} /> */}
            {isAuth && (
              <>
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
