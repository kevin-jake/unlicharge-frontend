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

const httpLink = createUploadLink({
  uri: "http://localhost:5000",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      // TODO: Make this headers more secure
      "apollo-require-preflight": "test",
      "x-apollo-operation-name": "test",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Box>
            <Header />
            <Routes>
              <Route exact="true" path="/" element={<Home />} />
              <Route exact="true" path="/build" element={<Build />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
