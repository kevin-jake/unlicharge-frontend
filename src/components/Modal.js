import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const Modal = ({ title, children, showModal, closeModal }) => {
  return (
    <Dialog open={showModal} onClose={closeModal}>
      <DialogTitle>test</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
