import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import UserImage from "./UserImage";
import FlexBetween from "./wrappers/FlexBetween";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  selectSelection,
  setSelectedProduct,
} from "../store/slices/buildpage/buildpageSlice";

const DialogFooter = ({
  userName,
  createdAt,
  userImage,
  isProduct,
  isRequest,
  specs,
}) => {
  const selectedCategory = useSelector(selectCategory);
  const selectedItems = useSelector(selectSelection);
  const dispatch = useDispatch();
  const isSelected = selectedItems[selectedCategory].id !== specs?.id;

  const handleSelection = () => {
    if (isSelected)
      dispatch(setSelectedProduct({ specs, category: selectedCategory }));
    else
      dispatch(setSelectedProduct({ specs: {}, category: selectedCategory }));
  };

  return (
    <FlexBetween gap="0.3rem">
      <FlexBetween gap="0.5rem">
        <UserImage size={isRequest ? "30px" : "20px"} image={userImage} />

        {isProduct && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="body"> {userName}</Typography>
            <Typography variant="caption">
              {" "}
              {moment(specs?.updatedAt).fromNow()}
            </Typography>
          </Box>
        )}
        {isRequest && (
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
              <Typography variant="caption">Request by:</Typography>
              <Typography variant="body"> {userName}</Typography>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box display="flex" flexDirection="column">
              <Typography variant="caption">
                Request Created: {moment(createdAt).format("lll")}
              </Typography>
              <Typography variant="caption">
                Udated: {moment(specs?.updatedAt).fromNow()}
              </Typography>
            </Box>
          </Box>
        )}
      </FlexBetween>
      {isProduct && (
        <Button onClick={handleSelection} variant="contained">
          {isSelected ? "Select" : "Deselect"}
        </Button>
      )}
    </FlexBetween>
  );
};

export default DialogFooter;
