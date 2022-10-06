import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "./Modal";
import { defaultDataIdFromObject } from "@apollo/client";

const FormModal = ({ showFormModal, setShowFormModal, formData }) => {
  const properties = Object.getOwnPropertyNames(formData);
  const formDisplay = ["id", "__typename", "createdAt", "publish_status"];

  const format = (string) => {
    var cleanString = string.replaceAll("_", " ");
    return cleanString.charAt(0).toUpperCase() + cleanString.slice(1);
  };

  const inputField = (prop, formData) => {
    switch (prop) {
      case "name": {
        return (
          <div>
            <TextField
              fullWidth
              id={"form" + prop}
              label={format(prop)}
              defaultValue={formData[prop]}
              helperText={formData[prop]}
            />
          </div>
        );
      }
      default: {
        return (
          <TextField
            id={"form" + prop}
            label={format(prop)}
            defaultValue={formData[prop]}
            helperText={formData[prop]}
          />
        );
      }
    }
  };

  return (
    <Modal
      showModal={showFormModal.open}
      title={
        showFormModal.operation +
        " " +
        formData.__typename +
        " " +
        formData.name
      }
      closeModal={() => setShowFormModal({ ...showFormModal, open: false })}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          {properties.map(
            (prop) => !formDisplay.includes(prop) && inputField(prop, formData)
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default FormModal;
