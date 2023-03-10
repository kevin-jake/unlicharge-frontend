import { Box, Button, Typography } from "@mui/material";
import React from "react";
import UserImage from "../UserImage";
import FlexBetween from "../wrappers/FlexBetween";

const ProductCardFooter = ({ creatorName, lastUpdated, creatorImage }) => {
  return (
    <FlexBetween gap="0.3rem">
      <FlexBetween gap="0.5rem">
        <UserImage size="20px" image={creatorImage} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="body"> {creatorName}</Typography>
          <Typography variant="caption"> {lastUpdated}</Typography>
        </Box>
      </FlexBetween>
      <Button variant="contained">Select</Button>
    </FlexBetween>
  );
};

export default ProductCardFooter;
