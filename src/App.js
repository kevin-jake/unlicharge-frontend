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
import { Box } from "@mui/material";
import Header from "./components/Header";
import Build from "./pages/Build";
import { AuthProvider } from "./context/auth-context";
import { createUploadLink } from "apollo-upload-client";
import { GlobalProvider } from "./context/global-context";
import { SummaryProvider } from "./context/summary-context";
import Requests from "./pages/Requests";

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
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <GlobalProvider>
          <SummaryProvider>
            <BrowserRouter>
              <Box>
                <Header />
                <Routes>
                  {/* <Route exact="true" path="/" element={<Home />} /> */}
                  <Route exact="true" path="/" element={<Build />} />
                  <Route exact="true" path="/build" element={<Build />} />
                  <Route exact="true" path="/requests" element={<Requests />} />
                </Routes>
              </Box>
            </BrowserRouter>
          </SummaryProvider>
        </GlobalProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
