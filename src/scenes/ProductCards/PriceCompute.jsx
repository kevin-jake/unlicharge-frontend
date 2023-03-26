import { Box, Divider, Grid, useTheme } from "@mui/material";
import React from "react";
import { numberWithCommas } from "../../util/numberFormats";
import ComputeDisplay from "./ComputeDisplay";

const PriceCompute = ({ computedSpecs }) => {
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
        <ComputeDisplay
          title="Price"
          value={`${numberWithCommas(computedSpecs?.totalPrice)}`}
        />
        <Divider
          color={primary}
          orientation="vertical"
          variant="middle"
          flexItem
        />
        <ComputeDisplay
          title="Capacity"
          value={`${numberWithCommas(computedSpecs?.totalCapacity)} Ah`}
        />

        <Divider
          color={primary}
          orientation="vertical"
          variant="middle"
          flexItem
        />
        <ComputeDisplay
          title="Quantity"
          value={`${numberWithCommas(computedSpecs?.totalQty)}`}
        />
      </Box>
    </Grid>
  );
};

export default PriceCompute;
