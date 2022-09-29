import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useState } from "react";
import "./App.css";
import CardsFilter from "./components/CardsFilter";
import Header from "./components/Header";
import InitialForm from "./components/InitialForm";
import ItemCard from "./components/ItemCard";
import Modal from "./components/Modal";
import PathCards from "./components/PathCards";
import SideSummary from "./components/SideSummary";
import ItemLists from "./sections/ItemLists";
import Path from "./sections/Path";

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
      <div className="sticky top-0 z-10">
        <Header />
        <SideSummary />
        <InitialForm />
      </div>
      <Path />
      <ItemLists setShowModal={setShowModal} />
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </ApolloProvider>
  );
}

export default App;
