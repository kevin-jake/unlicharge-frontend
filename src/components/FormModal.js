import React from "react";
import { Box, Button, TextField } from "@mui/material";
import Modal from "./Modal";

const FormModal = ({ showFormModal, setShowFormModal, formData }) => {
  const properties = Object.getOwnPropertyNames(formData);
  console.log(properties);
  const formDisplay = ["id", "__typename", "createdAt", "publish_status"];
  const operation = showFormModal.operation;

  const format = (string) => {
    var cleanString = string.replaceAll("_", " ");
    return cleanString.charAt(0).toUpperCase() + cleanString.slice(1);
  };

  const inputField = (prop, formData) => {
    console.log(prop);
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
        operation === "Create"
          ? showFormModal.operation + " Battery"
          : showFormModal.operation +
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
          {operation === "Delete" && (
            <>
              <TextField
                fullWidth
                id="delete-reason"
                label="Reason"
                placeholder="State your reason for removing here"
                multiline
              />
            </>
          )}
          {operation !== "Delete" &&
            properties.map(
              (prop) =>
                !formDisplay.includes(prop) && inputField(prop, formData)
            )}
        </div>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button
          variant="contained"
          size="small"
          sx={{ color: "white", margin: 1, textTransform: "none" }}
        >
          {operation === "Delete" ? "Delete" : "Save"}
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{ color: "white", margin: 1, textTransform: "none" }}
          onClick={() => setShowFormModal({ ...showFormModal, open: false })}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default FormModal;
