import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Modal from "./Modal";

const FormModal = ({ showFormModal, setShowFormModal, formData }) => {
  return (
    <Modal
      showModal={showFormModal.open}
      title={formData.name}
      closeModal={() => setShowFormModal({ ...showFormModal, open: false })}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5">
          {showFormModal.operation + " " + formData.__typename}
        </Typography>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue="Hello World"
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            id="outlined-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField id="outlined-search" label="Search field" type="search" />
          <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
            helperText="Some important text"
          />
        </div>
      </Box>
    </Modal>
  );
};

export default FormModal;
