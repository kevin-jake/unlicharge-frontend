import React from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
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
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id={"form" + prop}
              label={format(prop)}
              defaultValue={formData[prop]}
              helperText={formData[prop]}
            />
          </Grid>
        );
      }
      case "type": {
        return (
          <Grid item xs={3}>
            <TextField
              id="outlined-select-currency"
              required
              select
              fullWidth
              label={format(prop)}
              defaultValue={formData[prop]}
            >
              <MenuItem value="LiFePo4">LiFePo4</MenuItem>
              <MenuItem value="Lead Acid">Lead Acid</MenuItem>
            </TextField>
          </Grid>
        );
      }
      case "model": {
        return (
          <Grid item xs={3}>
            <TextField
              required
              fullWidth
              id={"form" + prop}
              label={format(prop)}
              defaultValue={formData[prop]}
              helperText={formData[prop]}
            />
          </Grid>
        );
      }
      default: {
        if (prop.includes("voltage")) {
          return (
            <Grid item xs={3}>
              <TextField
                fullWidth
                required={prop === "nominal_voltage"}
                id={"form-volt" + prop}
                label={format(prop)}
                defaultValue={formData[prop]}
                helperText={formData[prop]}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">V</InputAdornment>
                  ),
                }}
              />
            </Grid>
          );
        } else if (prop.includes("capacity")) {
          return (
            <Grid item xs={3}>
              <TextField
                fullWidth
                required
                id={"form" + prop}
                label={format(prop)}
                defaultValue={formData[prop]}
                helperText={formData[prop]}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Ah</InputAdornment>
                  ),
                }}
              />
            </Grid>
          );
        } else if (prop.includes("price")) {
          return (
            <Grid item xs={3}>
              <TextField
                fullWidth
                required
                id={"form" + prop}
                label={format(prop)}
                defaultValue={formData[prop]}
                helperText={formData[prop]}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Php</InputAdornment>
                  ),
                }}
              />
            </Grid>
          );
        }
        return (
          <Grid item xs={3}>
            <TextField
              fullWidth
              id={"form" + prop}
              label={format(prop)}
              defaultValue={formData[prop]}
              helperText={formData[prop]}
            />
          </Grid>
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
      <Grid container sx={{ padding: 2 }} spacing={2}>
        {operation === "Delete" && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="delete-reason"
              label="Reason"
              placeholder="State your reason for removing here"
              multiline
            />
          </Grid>
        )}
        {operation !== "Delete" &&
          properties.map(
            (prop) => !formDisplay.includes(prop) && inputField(prop, formData)
          )}
      </Grid>
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
