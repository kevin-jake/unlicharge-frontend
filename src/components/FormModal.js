import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "./Modal";
import { AuthContext } from "../context/auth-context";
import { useForm } from "../hooks/useForm";
import { CREATE_BATT } from "../util/graphql/Mutation";
import { FETCH_BATTERY } from "../util/graphql/Query";
import { useMutation } from "@apollo/client";

const FormModal = ({ showFormModal, setShowFormModal, formData, title }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const properties = Object.getOwnPropertyNames(formData);
  const formDisplay = ["id", "__typename", "createdAt", "publish_status"];
  const operation = showFormModal.operation;
  const [values, setValues] = useState({
    name: "",
    type: "",
    model: "",
    nominal_voltage: "",
    capacity: "",
    price_per_pc: "",
    min_voltage: "",
    max_voltage: "",
    supplier: "",
    image_url: "",
  });

  const onChange = (event) => {
    var prop;
    event.target.id ? (prop = event.target.id) : (prop = event.target.name);
    setValues({ ...values, [prop]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    createPostCallback();
  };

  useEffect(() => {
    setValues({
      name: "",
      type: "",
      model: "",
      nominal_voltage: "",
      capacity: "",
      price_per_pc: "",
      min_voltage: "",
      max_voltage: "",
      supplier: "",
      image_url: "",
    });
  }, [showFormModal.open]);

  const [createBatt, { error }] = useMutation(CREATE_BATT, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_BATTERY,
      });
      proxy.writeQuery({
        query: FETCH_BATTERY,
        data: {
          getBatteries: [result.data.createBatt, ...data.getBatteries],
        },
      });
      setValues({
        name: "",
        type: "",
        model: "",
        nominal_voltage: "",
        capacity: "",
        price_per_pc: "",
        min_voltage: "",
        max_voltage: "",
        supplier: "",
        image_url: "",
      });
    },
  });

  function createPostCallback() {
    createBatt();
  }

  const format = (string) => {
    var cleanString = string.replaceAll("_", " ");
    return cleanString.charAt(0).toUpperCase() + cleanString.slice(1);
  };

  const inputField = (prop, formData) => {
    switch (prop) {
      case "name": {
        return (
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id={prop}
              label={format(prop)}
              helperText={formData[prop]}
              value={
                formData[prop] && !values[prop] ? formData[prop] : values[prop]
              }
              onChange={onChange}
            />
          </Grid>
        );
      }
      case "type": {
        return (
          <Grid item xs={3}>
            <TextField
              name="type"
              required
              select
              fullWidth
              label={format(prop)}
              value={
                formData[prop] && !values[prop] ? formData[prop] : values[prop]
              }
              onChange={onChange}
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
              id={prop}
              label={format(prop)}
              helperText={formData[prop]}
              value={
                formData[prop] && !values[prop] ? formData[prop] : values[prop]
              }
              onChange={onChange}
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
                id={prop}
                label={format(prop)}
                helperText={formData[prop]}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">V</InputAdornment>
                  ),
                }}
                value={
                  formData[prop] && !values[prop]
                    ? formData[prop]
                    : values[prop]
                }
                onChange={onChange}
              />
            </Grid>
          );
        } else if (prop.includes("capacity")) {
          return (
            <Grid item xs={3}>
              <TextField
                fullWidth
                required
                id={prop}
                label={format(prop)}
                helperText={formData[prop]}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Ah</InputAdornment>
                  ),
                }}
                value={
                  formData[prop] && !values[prop]
                    ? formData[prop]
                    : values[prop]
                }
                onChange={onChange}
              />
            </Grid>
          );
        } else if (prop.includes("price")) {
          return (
            <Grid item xs={3}>
              <TextField
                fullWidth
                required
                id={prop}
                label={format(prop)}
                helperText={formData[prop]}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Php</InputAdornment>
                  ),
                }}
                value={
                  formData[prop] && !values[prop]
                    ? formData[prop]
                    : values[prop]
                }
                onChange={onChange}
              />
            </Grid>
          );
        } else if (prop.includes("current")) {
          return (
            <Grid item xs={3}>
              <TextField
                fullWidth
                id={prop}
                label={format(prop)}
                helperText={formData[prop]}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">A</InputAdornment>
                  ),
                }}
                value={
                  formData[prop] && !values[prop]
                    ? formData[prop]
                    : values[prop]
                }
                onChange={onChange}
              />
            </Grid>
          );
        }
        return (
          <Grid item xs={3}>
            <TextField
              fullWidth
              id={prop}
              label={format(prop)}
              helperText={formData[prop]}
              value={
                formData[prop] && !values[prop] ? formData[prop] : values[prop]
              }
              onChange={onChange}
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
          ? showFormModal.operation + " " + title
          : showFormModal.operation + " " + title + " " + formData.name
      }
      closeModal={() => setShowFormModal({ ...showFormModal, open: false })}
    >
      <Grid container sx={{ padding: 2 }} spacing={2}>
        {operation === "Delete" && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="reason"
              label="Reason"
              placeholder="State your reason for removing here"
              multiline
              value={values.reason}
              onChange={onChange}
            />
          </Grid>
        )}
        {operation !== "Delete" &&
          properties.map(
            (prop) => !formDisplay.includes(prop) && inputField(prop, formData)
          )}
      </Grid>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        {isLoggedIn ? (
          <Button
            variant="contained"
            size="small"
            sx={{ color: "white", margin: 1, textTransform: "none" }}
            onClick={onSubmit}
          >
            {operation === "Delete" ? "Delete" : "Save"}
          </Button>
        ) : (
          <Typography variant="body2">Sign In to Save</Typography>
        )}
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
