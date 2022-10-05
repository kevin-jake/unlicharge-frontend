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
import Tables from "./pages/Tables";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Build from "./pages/Build";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

console.log(client);

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Box>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/build" element={<Build />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
