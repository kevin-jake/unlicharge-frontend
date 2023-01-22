import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { setContext } from "apollo-link-context";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./components/Header";
import Build from "./pages/Build";
import { AuthProvider } from "./context/auth-context";
import { createUploadLink } from "apollo-upload-client";
import Requests from "./pages/Requests";
import Navbar from "./components/Navbar";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";

const httpLink = createUploadLink({
  // FIXME: make an env variable
  uri: "http://localhost:5000",
});

const authLink = setContext(() => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return {
    headers: {
      Authorization: userData ? `Bearer ${userData.token}` : "",
      // FIXME: Make this headers more secure
      "apollo-require-preflight": "test",
      "x-apollo-operation-name": "test",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  connectToDevTools: true,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Box>
              <Navbar />
              <Routes>
                {/* <Route exact="true" path="/" element={<Home />} /> */}
                {/* <Route exact="true" path="/" element={<Build />} />
                <Route exact="true" path="/build" element={<Build />} />
                <Route exact="true" path="/requests" element={<Requests />} /> */}
              </Routes>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
