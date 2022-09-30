import React from "react";
import Header from "../components/Header";
import InitialForm from "../components/InitialForm";
import SideSummary from "../components/SideSummary";
import ItemLists from "../sections/ItemLists";
import Path from "../sections/Path";

const Home = () => {
  return (
    <>
      <div className="sticky top-0 z-10">
        <Header />
        <SideSummary />
        <InitialForm />
      </div>
      <Path />
      <ItemLists />
    </>
  );
};

export default Home;
