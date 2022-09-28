import React from "react";
import Form from "./Form";

const Modal = ({ showModal, setShowModal }) => {
  if (!showModal) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "modal-container") setShowModal(false);
  };

  return (
    <div
      id="modal-container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="w-[600px]">
        <div className="bg-white p-2 rounded">
          <h1 className="text-lg">Battery</h1>
          <div className="grid grid-flow-row">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
