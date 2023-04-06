import {
  Alert,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useMemo } from "react";
import CompleteSpecs from "./CompleteSpecs";
import ItemTabs from "../../../components/ItemTabs";
import PriceCompute from "../PriceCompute";
import {
  selectCategory,
  selectSelection,
  setSelectedProduct,
} from "../../../store/slices/buildpage/buildpageSlice";
import { useDispatch, useSelector } from "react-redux";
import QuickSpecsList from "../QuickSpecsList";
import { useGetIssues } from "../../../hooks/useGetIssues";

const ProductDialogContent = ({
  specs,
  setCrudModalState,
  selectedCategory,
}) => {
  const selectedItems = useSelector(selectSelection);
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const {
    _id,
    __v,
    id,
    productId,
    updatedAt,
    createdAt,
    computedSpecs,
    ...specsRest
  } = specs || {};

  const category = useMemo(() => {
    switch (selectedCategory) {
      case "Battery":
        return "battery";
      case "BMS":
        return "bms";
      case "ActiveBalancer":
        return "ab";
      default:
        return selectedCategory;
    }
  }, [selectedCategory]);
  const { errors, warnings } = useGetIssues(category);

  const tabArray = Boolean(computedSpecs)
    ? [
        {
          tabTitle: "Specifications",
          tabComp: <CompleteSpecs specs={specs} />,
        },
        {
          tabTitle: "Computation",
          tabComp: (
            <>
              <PriceCompute computedSpecs={computedSpecs} flexDirection="row" />
              <QuickSpecsList computedSpecs={computedSpecs} />
            </>
          ),
        },
      ]
    : [
        {
          tabTitle: "Specifications",
          tabComp: <CompleteSpecs specs={specs} />,
        },
      ];

  const isNotSelected = selectedItems[category]?.id !== id;

  const handleSelection = () => {
    if (isNotSelected) dispatch(setSelectedProduct({ specs, category }));
    else dispatch(setSelectedProduct({ specs: {}, category }));
  };

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
              alt={specs?.name}
              src={specs?.imagePath}
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
                my: 1,
              },
            }}
          >
            <Stack spacing={2}>
              {!isNotSelected &&
                errors.map((error, index) => (
                  <Alert
                    key={`err-${index}`}
                    sx={{
                      width: "100%",
                    }}
                    variant="filled"
                    severity="error"
                    width="100%"
                  >
                    {error.message}
                  </Alert>
                ))}
              {!isNotSelected &&
                warnings.map((warn, index) => (
                  <Alert
                    key={`warn-${index}`}
                    severity="warning"
                    variant="filled"
                    sx={{
                      width: "100%",
                    }}
                  >
                    {warn.message}
                  </Alert>
                ))}
            </Stack>
            <ItemTabs tabArray={tabArray} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Box>
          <Button autoFocus onClick={handleSelection} variant="contained">
            {isNotSelected ? "Select" : "Deselect"}
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
                category:
                  selectedCategory === "bms"
                    ? "BMS"
                    : selectedCategory === "battery"
                    ? "Battery"
                    : selectedCategory === "ab"
                    ? "Active Balancer"
                    : selectedCategory,
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
                category:
                  selectedCategory === "bms"
                    ? "BMS"
                    : selectedCategory === "battery"
                    ? "Battery"
                    : selectedCategory === "ab"
                    ? "Active Balancer"
                    : selectedCategory,
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
