import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import InitialForm from "./components/InitialForm";
import ItemCard from "./components/ItemCard";
import Modal from "./components/Modal";
import PathCards from "./components/PathCards";
import SideSummary from "./components/SideSummary";

const httpLink = createHttpLink({
  url: "http://localhost:5000",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Header />
      <SideSummary />
      <InitialForm />
      <div className="flex">
        <PathCards />
        <PathCards />
        <PathCards />
      </div>
      <div className="grid grid-cols-4">
        <ItemCard setShowModal={setShowModal} />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </ApolloProvider>
  );
}

export default App;
