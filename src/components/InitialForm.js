import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const InitialForm = () => {
  return (
    <Box sx={{ borderRadius: "16px", border: 1, padding: 2, margin: 2 }}>
      <Typography variant="h5">Enter Desired Values</Typography>
      <Grid m={2} container spacing={2}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            select
            label="Battery Voltage"
            id="outlined-start-adornment"
            sx={{ m: 1 }}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment
            //       position="end"
            //       sx={{
            //         marginRight: 3,
            //       }}
            //     >
            //       V
            //     </InputAdornment>
            //   ),
            // }}
          >
            <MenuItem value="12">12 V</MenuItem>
            <MenuItem value="24">24 V</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Battery Capacity"
            id="outlined-start-adornment"
            sx={{ m: 1 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">Ah</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InitialForm;
