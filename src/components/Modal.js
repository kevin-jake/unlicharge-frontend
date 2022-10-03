import React from "react";
import Form from "./Form";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ showModal, setShowModal, data }) => {
  if (!showModal) return null;
  const properties = Object.getOwnPropertyNames(data);
  console.log(data);
  const handleOnClose = (e) => {
    if (e.target.id === "modal-container") setShowModal(false);
  };

  return (
    <div
      id="modal-container"
      onClick={handleOnClose}
      className="fixed inset-0 z-20 flex justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm "
    >
      <div className="w-[600px]">
        <AiOutlineCloseCircle
          className="cursor-pointer float-right "
          size={23}
          onClick={() => setShowModal(false)}
        />
        {/* <div className="bg-white p-2 rounded">
          <h1 className="text-lg font-bold p-4">{data.__typename}</h1>
          <div className="grid grid-flow-row">
            <div>
              <ul>
                {properties.map((prop) => (
                  <li key={prop}>
                    <div className="grid grid-cols-2">
                      <p className="font-bold text-sm">{prop}</p>
                      <p className="text-sm">{data[prop]}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div> */}
        <Form />
      </div>
    </div>
  );
};

export default Modal;
