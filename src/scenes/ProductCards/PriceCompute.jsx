import { Box, Divider, Grid, useTheme } from "@mui/material";
import React from "react";
import { numberWithCommas } from "../../util/numberFormats";
import ComputeDisplay from "./ComputeDisplay";

const PriceCompute = ({ computedSpecs, flexDirection, isSummary }) => {
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
          "& .MuiGrid-root": {
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
          isSummary={isSummary}
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
          isSummary={isSummary}
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
          isSummary={isSummary}
          value={`${numberWithCommas(computedSpecs?.totalQty)}`}
        />
      </Box>
    </Grid>
  );
};

export default PriceCompute;
