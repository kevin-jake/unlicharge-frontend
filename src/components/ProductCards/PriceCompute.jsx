import { Box, Divider, Grid, useTheme } from "@mui/material";
import React from "react";
import ComputeDisplay from "./ComputeDisplay";

const PriceCompute = () => {
  const { palette } = useTheme();
  const primary = palette.primary.main;
  return (
    <Grid item>
      <Box
        display="flex"
        sx={{
          "& hr": {
            mx: 1,
          },
          "& .css-1idn90j-MuiGrid-root": {
            display: "flex",
            justifyContent: "center",
          },
        }}
        alignItems="center"
        justifyContent="center"
        width="auto"
        height="fit-content"
      >
        <ComputeDisplay title="Price" value="test" />
        <Divider
          color={primary}
          orientation="vertical"
          variant="middle"
          flexItem
        />
        <ComputeDisplay title="Capacity" value="test" />

        <Divider
          color={primary}
          orientation="vertical"
          variant="middle"
          flexItem
        />
        <ComputeDisplay title="Quantity" value="test" />
      </Box>
    </Grid>
  );
};

export default PriceCompute;
