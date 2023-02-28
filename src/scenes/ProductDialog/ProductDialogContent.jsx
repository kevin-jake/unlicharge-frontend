import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import CompleteSpecs from "./CompleteSpecs";
import ItemTabs from "../../components/ItemTabs";
import PriceCompute from "../../components/ProductCards/PriceCompute";
import DialogWrapper from "../../components/wrappers/DialogWrapper";
import CRUDDialogContent from "../FormDialog/CRUDDialogContent";

const ProductDialogContent = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <>
      <DialogContent dividers>
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
            <ItemTabs tab1={<CompleteSpecs />} tab2={<PriceCompute />} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus>Save changes</Button>
      </DialogActions>
      <DialogWrapper isOpen={false} title="Edit Battery">
        <CRUDDialogContent />
      </DialogWrapper>
    </>
  );
};

export default ProductDialogContent;
