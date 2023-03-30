import { Box, Divider, Grid, useTheme } from "@mui/material";
import React from "react";
import { numberWithCommas } from "../../util/numberFormats";
import ComputeDisplay from "./ComputeDisplay";

const PriceCompute = ({ computedSpecs, flexDirection }) => {
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
          flexDirection,
        }}
        alignItems="center"
        justifyContent="center"
        width="auto"
        height="fit-content"
        gap={flexDirection === "row" ? null : 1}
      >
        <ComputeDisplay
          title="Price"
          value={`${numberWithCommas(computedSpecs?.totalPrice)}`}
        />
        <Divider
          color={primary}
          orientation={flexDirection === "row" ? "vertical" : "horizontal"}
          variant="middle"
          flexItem
        />
        <ComputeDisplay
          title="Capacity"
          value={`${numberWithCommas(computedSpecs?.totalCapacity)} Ah`}
        />

        <Divider
          color={primary}
          orientation={flexDirection === "row" ? "vertical" : "horizontal"}
          variant="middle"
          flexItem
        />
        <ComputeDisplay
          title="Quantity"
          value={`${numberWithCommas(computedSpecs?.totalQty)}`}
        />
        {/* TODO: Add more values as list item text on C Rate implement a flipping value for C rate and current */}
      </Box>
    </Grid>
  );
};

export default PriceCompute;
