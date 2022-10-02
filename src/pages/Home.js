import React, { useState } from "react";
import InitialForm from "../components/InitialForm";
import Modal from "../components/Modal";
import SideSummary from "../components/SideSummary";
import ItemLists from "../sections/ItemLists";
import Path from "../sections/Path";

const Home = () => {
  // TODO: Make modal dynamic
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState();
  return (
    <>
      <div className="relative z-10">
        <SideSummary />
        <InitialForm />
      </div>
      <Path />
      <ItemLists
        setShowModal={setShowModal}
        setModalDetails={setModalDetails}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        data={modalDetails}
      />
    </>
  );
};

export default Home;
