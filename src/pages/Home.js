import React, { useState } from "react";
import Header from "../components/Header";
import InitialForm from "../components/InitialForm";
import Modal from "../components/Modal";
import SideSummary from "../components/SideSummary";
import ItemLists from "../sections/ItemLists";
import Path from "../sections/Path";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-10">
        <Header />
        <SideSummary />
        <InitialForm />
      </div>
      <Path />
      <ItemLists setShowModal={setShowModal} />
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Home;
