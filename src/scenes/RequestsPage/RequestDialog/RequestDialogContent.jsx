import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  useMediaQuery,
} from "@mui/material";
import React from "react";

import ItemTabs from "../../../components/ItemTabs";
import DialogFooter from "../../../components/DialogFooter";
import CompleteSpecs from "../../ProductCards/ProductDialog/CompleteSpecs";
import CommentTab from "./CommentTab";

const RequestDialogContent = ({ specs, oldValues, comments }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const {
    _id,
    __v,
    id,
    updatedAt,
    // createdAt,
    // specCreator,
    productId: prodID,
    ...specsRest
  } = specs;

  const tabArray = Boolean(comments?.length)
    ? [
        {
          tabTitle: "Specifications",
          tabComp: <CompleteSpecs specs={specs} oldValues={oldValues} />,
        },
        {
          tabTitle: "Comments",
          tabComp: <CommentTab comments={comments} />,
        },
      ]
    : [
        {
          tabTitle: "Specifications",
          tabComp: <CompleteSpecs specs={specs} oldValues={oldValues} />,
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
            {/* TODO: Add comment tab create?? */}
            <ItemTabs tabArray={tabArray} />
          </Grid>
        </Grid>
        <DialogFooter
          isRequest={true}
          userImage={specs?.specCreator?.imagePath}
          userName={specs?.specCreator?.username}
          createdAt={specs?.createdAt}
          lastUpdated={specs?.updatedAt}
        />
      </DialogContent>

      {/* <DialogActions sx={{ justifyContent: "space-between" }}>
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
                productId,
              })
            }
          >
            Delete
          </Button>
        </Box>
      </DialogActions> */}
    </>
  );
};

export default RequestDialogContent;
