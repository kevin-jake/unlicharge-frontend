import {
  Box,
  Button,
  DialogContent,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
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
import WidgetWrapper from "../../../components/wrappers/WidgetWrapper";
import CreatorInfo from "./CreatorInfo";
import placeholderImg from "../../../../public/placeholder-image.jpg";

const RequestDialogContent = ({
  focusedRequest,
  isCreate,
  isEdit,
  isDelete,
  approve,
  reject,
}) => {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { userId, role } = useSelector(selectUser);
  let specs,
    currentValues,
    comments,
    creator,
    requestor,
    requestedProduct,
    status,
    deleteReason,
    replacedValues,
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
    currentValues = requestedProduct?.specs;
    replacedValues = focusedRequest?.specsToReplace;
  } else if (!isCreate && !isEdit) {
    specs = focusedRequest?.requestedProduct?.specs;
    deleteReason = focusedRequest?.deleteReason;
  }
  const { createdAt: requestCreated, updatedAt: requestUpdated } =
    focusedRequest;
  const isBtnShow =
    (role === "Admin" && status === "Request") ||
    (userId === creator?.id &&
      status === "Request" &&
      requestedProduct?.publishStatus === "Approved");

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

  const imageComponent = (
    <>
      {isDelete && (
        <WidgetWrapper
          m="1rem"
          flexBasis="50%"
          sx={{
            padding: "1rem !important",
            backgroundColor: `${palette.compliment.main} !important`,
          }}
        >
          <Typography variant="h5" color={palette.primary.main}>
            Delete Reason:
          </Typography>
          {deleteReason}
        </WidgetWrapper>
      )}
      <Box
        marginTop={!isNonMobileScreens ? "1rem" : 0}
        display="flex"
        justifyContent="center"
        gap="0.75rem"
      >
        {Boolean(replacedValues?.imagePath) &&
          replacedValues?.imagePath !== specs.imagePath && (
            <Box display="flex" flexDirection="column">
              <Typography variant="body2" marginBottom="0.75rem">
                Old photo:{" "}
              </Typography>
              <img
                style={{ objectFit: "cover", borderRadius: "0.75rem" }}
                width="100px"
                height="100px"
                alt={replacedValues?.name}
                src={replacedValues?.imagePath}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = placeholderImg;
                }}
              />
            </Box>
          )}
        {Boolean(specs.imagePath) && (
          <img
            style={{ objectFit: "cover", borderRadius: "0.75rem" }}
            width="200px"
            height="200px"
            alt={specs.name}
            src={specs.imagePath}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = placeholderImg;
            }}
          />
        )}
      </Box>
    </>
  );

  const tabArray = Boolean(comments?.length)
    ? [
        {
          tabTitle: "Specifications",
          tabComp: (
            <CompleteSpecs
              specs={specsRest}
              currentValues={currentValues}
              replacedValues={replacedValues}
              requestStatus={status}
              productStatus={requestedProduct?.publishStatus}
              processedBy={focusedRequest?.processedBy}
              imageComponent={imageComponent}
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
              currentValues={currentValues}
              replacedValues={replacedValues}
              requestStatus={status}
              productStatus={requestedProduct?.publishStatus}
              processedBy={focusedRequest?.processedBy}
              imageComponent={imageComponent}
            />
          ),
        },
      ];

  return (
    <>
      <DialogContent dividers>
        {Boolean(creator) && (
          <CreatorInfo
            creator={creator}
            productCreated={productCreated}
            productUpdated={productUpdated}
          />
        )}
        <Grid
          item
          xs
          container
          direction={isNonMobileScreens ? "row" : "column"}
          wrap="nowrap"
          zeroMinWidth
          sx={{
            "& > div": {
              my: 0.25,
            },
            alignItems: "center",
          }}
        >
          {/* TODO: Add comment tab create?? */}
          <ItemTabs tabArray={tabArray} />
        </Grid>
        <FlexBetween gap="0.5rem">
          <DialogFooter
            isRequest={true}
            userImage={requestor?.imagePath}
            userName={requestor?.username}
            createdAt={requestCreated}
            lastUpdated={requestUpdated}
          />
          {isBtnShow && (
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
          )}
        </FlexBetween>
      </DialogContent>
    </>
  );
};

export default RequestDialogContent;
