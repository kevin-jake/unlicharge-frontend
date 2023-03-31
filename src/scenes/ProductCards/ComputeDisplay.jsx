import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";

const ComputeDisplay = ({ title, value, isSummary }) => {
  const { palette } = useTheme();
  return (
    <Grid container item>
      <Grid item xs={12}>
        <Typography variant={isSummary ? "body2" : "body"}> {title}</Typography>
      </Grid>
      <Grid item xs={12}>
        {title === "Price" && (
          <Typography
            variant="caption"
            color={palette.neutral.main}
            marginRight="0.25rem"
          >
            Php
          </Typography>
        )}
        <Typography
          variant={isSummary ? "body1" : "h5"}
          color={palette.primary.main}
        >
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ComputeDisplay;
