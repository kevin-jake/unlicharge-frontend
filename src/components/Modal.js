import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const Modal = ({ title, children, showModal, closeModal }) => {
  return (
    <Dialog open={showModal} onClose={closeModal} maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
