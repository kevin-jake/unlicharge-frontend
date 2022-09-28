import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import "./App.css";
import Header from "./components/Header";
import InitialForm from "./components/InitialForm";
import ItemCard from "./components/ItemCard";
import PathCards from "./components/PathCards";

const httpLink = createHttpLink({
  url: "http://localhost:5000",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <InitialForm />
      <div className="flex">
        <PathCards />
        <PathCards />
        <PathCards />
      </div>
      <div className="grid grid-cols-4">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </ApolloProvider>
  );
}

export default App;
