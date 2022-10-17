import { Grid, InputAdornment, MenuItem, TextField } from "@mui/material";
import React from "react";

const format = (string) => {
  var cleanString = string.replaceAll("_", " ");
  return cleanString.charAt(0).toUpperCase() + cleanString.slice(1);
};

const FormFields = ({ prop, formData, values, onChange, onSubmit }) => {
  const toRender = (prop, formData) => {
    if (prop === "image_url") return null;
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
              <MenuItem value="Li-on">Li-on</MenuItem>
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

  return toRender(prop, formData);
};

export default FormFields;
