import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import ItemTabs from "./ItemTabs";
import PriceCompute from "./ProductCards/PriceCompute";
import QuickSpecs from "./ProductCards/QuickSpecs";
import FlexBetween from "./wrappers/FlexBetween";

const ProductDialogContent = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <>
      <DialogContent dividers>
        {/* <FlexBetween marginY="0.25rem" sx={{ justifyContent: "flex-start" }}> */}
        <Grid
          item
          xs
          container
          direction={isNonMobileScreens ? "row" : "column"}
          sx={{ alignItems: "center" }}
        >
          <Box width="200px" height="200px" marginRight="0.75rem">
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
            wrap="nowrap"
            zeroMinWidth
            sx={{
              "& > div": {
                my: 0.25,
              },
            }}
          >
            <ItemTabs tab1={<QuickSpecs />} tab2={<PriceCompute />} />
          </Grid>
          {/* </FlexBetween> */}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus>Save changes</Button>
      </DialogActions>
    </>
  );
};

export default ProductDialogContent;
