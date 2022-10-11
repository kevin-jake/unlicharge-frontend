import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const Modal = ({ title, children, showModal, closeModal }) => {
  return (
    <Dialog
      open={showModal ? showModal : false}
      onClose={closeModal}
      maxWidth="lg"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
