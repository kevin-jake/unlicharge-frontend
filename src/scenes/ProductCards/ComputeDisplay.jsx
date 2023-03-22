import { Grid, Typography } from "@mui/material";
import React from "react";

const ComputeDisplay = ({ title, value }) => {
  return (
    <Grid container item>
      <Grid item xs={12}>
        <Typography variant="body"> {title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4"> {value}</Typography>
      </Grid>
    </Grid>
  );
};

export default ComputeDisplay;
