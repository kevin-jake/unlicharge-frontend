import { Box, Grid } from "@mui/material";
import React from "react";
import PriceCompute from "./ProductCards/PriceCompute";
import ProductName from "./ProductCards/ProductName";
import QuickSpecs from "./ProductCards/QuickSpecs";
import FlexBetween from "./wrappers/FlexBetween";

const ProductDialogContent = () => {
  return (
    <FlexBetween marginY="0.25rem" sx={{ justifyContent: "flex-start" }}>
      <Box width="200px" height="200px">
        <img
          style={{ objectFit: "cover", borderRadius: "0.75rem" }}
          width="200px"
          height="200px"
          alt="user"
          src="/test.jpg"
        />
      </Box>
      <Grid
        item
        xs
        container
        direction="column"
        marginX="1rem"
        wrap="nowrap"
        zeroMinWidth
        sx={{
          "& > div": {
            my: 0.25,
          },
        }}
      >
        <PriceCompute />
        <QuickSpecs />
      </Grid>
    </FlexBetween>
  );
};

export default ProductDialogContent;
