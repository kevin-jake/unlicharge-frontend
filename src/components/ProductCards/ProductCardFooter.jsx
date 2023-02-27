import { ShareOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import UserImage from "../UserImage";
import FlexBetween from "../wrappers/FlexBetween";

const ProductCardFooter = () => {
  return (
    <FlexBetween gap="0.3rem">
      <FlexBetween gap="0.5rem">
        <UserImage size="20px" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="body"> test</Typography>
          <Typography variant="caption"> test</Typography>
        </Box>
      </FlexBetween>
      <IconButton>
        <ShareOutlined />
      </IconButton>
    </FlexBetween>
  );
};

export default ProductCardFooter;
