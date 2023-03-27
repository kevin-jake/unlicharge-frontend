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
import ItemTabs from "../../../components/ItemTabs";
import PriceCompute from "../PriceCompute";
import { toast } from "react-toastify";

const ProductDialogContent = ({
  specs,
  productId,
  setCrudModalState,
  category,
}) => {
  console.log("🚀 ~ file: ProductDialogContent.jsx:23 ~ specs:", specs);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, __v, id, updatedAt, createdAt, computedSpecs, ...specsRest } =
    specs;
  console.log("🚀 ~ file: ProductDialogContent.jsx:34 ~ specsRest:", specsRest);

  const tabArray = Boolean(specs.computedSpecs)
    ? [
        {
          tabTitle: "Specifications",
          tabComp: <CompleteSpecs specs={specs} />,
        },
        {
          tabTitle: "Computation",
          tabComp: <PriceCompute computedSpecs={specs.computedSpecs} />,
        },
      ]
    : [
        {
          tabTitle: "Specifications",
          tabComp: <CompleteSpecs specs={specs} />,
        },
      ];
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
              alt={specs.name}
              src={specs.imagePath}
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
            <ItemTabs tabArray={tabArray} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Box>
          <Button variant="contained" autoFocus>
            Select
          </Button>
        </Box>
        <Box sx={{ gap: 2 }}>
          <Button
            variant="contained"
            autoFocus
            sx={{ marginX: "0.25rem" }}
            onClick={() =>
              setCrudModalState({
                operation: "Edit",
                category: category,
                isOpen: true,
                oldValues: specsRest,
                productId,
              })
            }
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            autoFocus
            onClick={() =>
              setCrudModalState({
                operation: "Delete",
                category: category,
                isOpen: true,
                oldValues: specsRest,
                productId,
              })
            }
          >
            Delete
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

export default ProductDialogContent;
