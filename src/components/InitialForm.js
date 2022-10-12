import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { SummaryContext } from "../context/summary-context";
import CustomizedAccordions from "./CustomizedAccordions";

const InitialForm = () => {
  const { initialForm, setInitForm } = useContext(SummaryContext);
  return (
    <Box sx={{ borderRadius: "16px", border: 1, padding: 2, margin: 2 }}>
      <Typography variant="h5">Enter Desired Values</Typography>
      <Grid m={2} container spacing={2}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            select
            label="Battery Voltage"
            id="battvolt"
            value={initialForm.batteryVoltage}
            onChange={(e) =>
              setInitForm({ ...initialForm, batteryVoltage: e.target.value })
            }
          >
            <MenuItem value="12">12 V</MenuItem>
            <MenuItem value="24">24 V</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Battery Capacity"
            id="battcap"
            value={
              initialForm.batteryCapacity > 0 ? initialForm.batteryCapacity : ""
            }
            onChange={(e) =>
              setInitForm({ ...initialForm, batteryCapacity: e.target.value })
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">Ah</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={11}>
          <CustomizedAccordions caption="Advanced Parameters">
            <Grid m={2} container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Max Voltage"
                  id="max-volt"
                  size="small"
                  value={
                    initialForm.maxBattVoltage > 0
                      ? initialForm.maxBattVoltage
                      : ""
                  }
                  onChange={(e) =>
                    setInitForm({
                      ...initialForm,
                      maxBattVoltage: e.target.value,
                    })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">V</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Min Voltage"
                  id="min-volt"
                  size="small"
                  value={
                    initialForm.minBattVoltage > 0
                      ? initialForm.minBattVoltage
                      : ""
                  }
                  onChange={(e) =>
                    setInitForm({
                      ...initialForm,
                      minBattVoltage: e.target.value,
                    })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">V</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="DOD"
                  id="dod-param"
                  size="small"
                  value={initialForm.dod > 0 ? initialForm.dod : ""}
                  onChange={(e) =>
                    setInitForm({ ...initialForm, dod: e.target.value })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </CustomizedAccordions>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InitialForm;
