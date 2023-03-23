import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

import ItemTabs from "../../../components/ItemTabs";
import DialogFooter from "../../../components/DialogFooter";
import CompleteSpecs from "../../ProductCards/ProductDialog/CompleteSpecs";
import CommentTab from "./CommentTab";
import FlexBetween from "../../../components/wrappers/FlexBetween";
import UserImage from "../../../components/UserImage";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/auth/authSlice";

const RequestDialogContent = ({
  focusedRequest,
  isCreate,
  isEdit,
  approve,
  reject,
}) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { userId, role } = useSelector(selectUser);
  let specs,
    oldValues,
    comments,
    creator,
    requestor,
    requestedProduct,
    status,
    productCreated,
    productUpdated;
  if (isCreate) {
    specs = focusedRequest?.specs;
    requestor = focusedRequest?.creator;
    status = focusedRequest?.publishStatus;
  } else {
    requestedProduct = focusedRequest.requestedProduct;
    comments = focusedRequest?.comment;
    requestor = focusedRequest?.requestor;
    creator = focusedRequest?.requestedProduct?.creator;
    productCreated = focusedRequest?.requestedProduct?.createdAt;
    productUpdated = focusedRequest?.requestedProduct?.updatedAt;
    status = focusedRequest?.status;
  }
  if (isEdit) {
    specs = focusedRequest?.newSpecs;
    oldValues = requestedProduct?.specs;
  } else if (!isCreate && !isEdit) {
    specs = focusedRequest?.requestedProduct?.specs;
  }
  const { createdAt: requestCreated, updatedAt: requestUpdated } =
    focusedRequest;

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
          tabComp: (
            <CompleteSpecs
              specs={specsRest}
              oldValues={oldValues}
              requestStatus={status}
            />
          ),
        },
        {
          tabTitle: "Comments",
          tabComp: <CommentTab comments={comments} />,
        },
      ]
    : [
        {
          tabTitle: "Specifications",
          tabComp: (
            <CompleteSpecs
              specs={specsRest}
              oldValues={oldValues}
              requestStatus={status}
            />
          ),
        },
      ];

  return (
    <>
      <DialogContent dividers>
        {/* TODO: Move to another component */}
        {Boolean(creator) && (
          <FlexBetween gap="0.3rem" sx={{ justifyContent: "center" }}>
            <FlexBetween gap="0.5rem">
              <UserImage size="30px" image={creator?.imagePath} />
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
                <Box display="flex" flexDirection="column">
                  <Typography variant="caption">
                    This product is created by:
                  </Typography>
                  <Typography variant="body">{creator?.username}</Typography>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box display="flex" flexDirection="column">
                  <Typography variant="caption">
                    Created At: {moment(productCreated).format("lll")}
                  </Typography>
                  <Typography variant="caption">
                    Last Updated: {moment(productUpdated).fromNow()}
                  </Typography>
                </Box>
              </Box>
            </FlexBetween>
          </FlexBetween>
        )}
        <Grid
          item
          xs
          container
          direction={isNonMobileScreens ? "row" : "column"}
          sx={{ alignItems: "center" }}
        >
          <Box
            width="200px"
            height="200px"
            marginRight="0.75rem"
            marginTop={!isNonMobileScreens ? "1rem" : 0}
          >
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
        <FlexBetween gap="0.5rem">
          <DialogFooter
            isRequest={true}
            userImage={requestor?.imagePath}
            userName={requestor?.username}
            createdAt={requestCreated}
            lastUpdated={requestUpdated}
          />
          {role === "Admin" ||
            (userId === creator?.id && status === "Request" && (
              <Box sx={{ gap: 2 }}>
                <Button
                  variant="contained"
                  autoFocus
                  sx={{ marginX: "0.25rem" }}
                  onClick={() => approve()}
                >
                  Approve
                </Button>
                <Button variant="outlined" autoFocus onClick={() => reject()}>
                  Reject
                </Button>
              </Box>
            ))}
        </FlexBetween>
      </DialogContent>
    </>
  );
};

export default RequestDialogContent;
